const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const TARGET_DIRS = [
  path.join(__dirname, 'public', 'images'),
  path.join(__dirname, 'public', 'images', 'TEAM')
];
const SKIP_DIRS = [
  path.join(__dirname, 'public', 'images', 'power') // Skip government logos
];
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 80;
const BACKUP_DIR = path.join(__dirname, 'image_backups');
const SIZE_THRESHOLD_BYTES = 100 * 1024; // 100 KB

// Create backup directory
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Stats tracking
let totalOriginalSize = 0;
let totalNewSize = 0;
let processedCount = 0;

// Helper to check if dir is skipped
function isSkipped(dirPath) {
  return SKIP_DIRS.some(skipDir => dirPath.startsWith(skipDir));
}

// Recursive file scanner
function scanDirectory(dir, fileList = []) {
  if (isSkipped(dir)) return fileList;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      scanDirectory(filePath, fileList);
    } else {
      const ext = path.extname(filePath).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext) && stat.size > SIZE_THRESHOLD_BYTES) {
        fileList.push({
          path: filePath,
          size: stat.size,
          dir: dir,
          name: file,
          ext: ext
        });
      }
    }
  });
  
  return fileList;
}

async function optimizeImage(imgInfo) {
  const originalPath = imgInfo.path;
  const dirName = imgInfo.dir;
  const baseName = path.basename(imgInfo.name, imgInfo.ext);
  const newFileName = `${baseName}.webp`;
  const newPath = path.join(dirName, newFileName);
  
  // Make a backup key based on folder structure to avoid collisions in backup folder
  const relativeFromRoot = path.relative(path.join(__dirname, 'public'), originalPath);
  const backupPath = path.join(BACKUP_DIR, relativeFromRoot);
  const backupDir = path.dirname(backupPath);
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  // Copy original to backup
  fs.copyFileSync(originalPath, backupPath);
  
  try {
    const pipeline = sharp(originalPath);
    const metadata = await pipeline.metadata();
    
    let transformer = pipeline;
    if (metadata.width && metadata.width > MAX_WIDTH) {
      transformer = transformer.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      console.log(`Resize required: ${imgInfo.name} (${metadata.width}px -> ${MAX_WIDTH}px)`);
    }
    
    await transformer
      .webp({ quality: WEBP_QUALITY })
      .toFile(newPath);
      
    const newStat = fs.statSync(newPath);
    
    totalOriginalSize += imgInfo.size;
    totalNewSize += newStat.size;
    processedCount++;
    
    const savingPercent = ((imgInfo.size - newStat.size) / imgInfo.size * 100).toFixed(1);
    console.log(`✓ Optimized: ${imgInfo.name}`);
    console.log(`  Size: ${(imgInfo.size / (1024 * 1024)).toFixed(2)} MB -> ${(newStat.size / (1024 * 1024)).toFixed(2)} MB (-${savingPercent}%)`);
    
    // Delete the original file after successful conversion
    fs.unlinkSync(originalPath);
  } catch (error) {
    console.error(`✗ Error processing ${imgInfo.name}:`, error);
    // If conversion failed, keep original and remove partially converted webp if exists
    if (fs.existsSync(newPath)) {
      fs.unlinkSync(newPath);
    }
  }
}

async function main() {
  console.log('Scanning directories for images...');
  const filesToProcess = [];
  
  // We scan the base images directory (which will find files in root and recursively in subfolders, skipping "power")
  scanDirectory(path.join(__dirname, 'public', 'images'), filesToProcess);
  
  console.log(`Found ${filesToProcess.length} images above threshold to optimize.`);
  
  for (const img of filesToProcess) {
    await optimizeImage(img);
  }
  
  const savedSize = totalOriginalSize - totalNewSize;
  console.log('\n=========================================');
  console.log('Optimization Complete!');
  console.log(`Total Files Processed: ${processedCount}`);
  console.log(`Original Assets Size: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Optimized Assets Size: ${(totalNewSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Saved: ${(savedSize / (1024 * 1024)).toFixed(2)} MB (-${(savedSize / totalOriginalSize * 100).toFixed(1)}%)`);
  console.log(`Originals backed up to: ${BACKUP_DIR}`);
  console.log('=========================================');
}

main().catch(err => console.error('Fatal execution error:', err));
