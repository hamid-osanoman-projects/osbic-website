const fs = require('fs');
const path = require('path');

const TARGET_DIRS = [
  path.join(__dirname, 'public', 'images'),
  path.join(__dirname, 'public', 'images', 'TEAM')
];

function scanAndFix(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      scanAndFix(filePath);
    } else {
      // Check if file ends with double extension like .JPG.webp or .png.webp
      // Match something like "filename.JPG.webp" or "filename.jpg.webp"
      const match = file.match(/\.(jpe?g|png)\.webp$/i);
      if (match) {
        const extToRemove = match[0]; // e.g. ".JPG.webp" or ".jpg.webp"
        const baseName = file.substring(0, file.length - extToRemove.length);
        const newFileName = `${baseName}.webp`;
        const newPath = path.join(dir, newFileName);
        
        fs.renameSync(filePath, newPath);
        console.log(`Renamed: ${file} -> ${newFileName}`);
      }
    }
  });
}

console.log('Scanning directories to fix double extensions...');
TARGET_DIRS.forEach(dir => {
  if (fs.existsSync(dir)) {
    scanAndFix(dir);
  }
});
console.log('Double extensions cleanup complete!');
