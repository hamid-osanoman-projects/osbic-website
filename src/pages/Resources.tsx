import { motion } from 'framer-motion';
import { FileText, Download, BookOpen, Video, CheckCircle, ExternalLink } from 'lucide-react';

export default function Resources() {
  const guides = [
    {
      id: 1,
      title: 'Complete Guide to Company Registration in Oman',
      description: 'Step-by-step guide covering all aspects of registering a business in Oman, including legal requirements, documentation, and timelines.',
      category: 'Business Setup',
      pages: 24,
      format: 'PDF',
      icon: BookOpen,
      downloadSize: '2.4 MB',
      lastUpdated: 'September 2024'
    },
    {
      id: 2,
      title: 'Oman Visa & Work Permit Requirements 2024',
      description: 'Comprehensive overview of visa categories, requirements, application processes, and common pitfalls to avoid when sponsoring employees.',
      category: 'Immigration',
      pages: 18,
      format: 'PDF',
      icon: FileText,
      downloadSize: '1.8 MB',
      lastUpdated: 'August 2024'
    },
    {
      id: 3,
      title: 'PRO Services Checklist for Businesses',
      description: 'Essential checklist for maintaining compliance with government regulations, license renewals, and ongoing administrative requirements.',
      category: 'Compliance',
      pages: 12,
      format: 'PDF',
      icon: CheckCircle,
      downloadSize: '980 KB',
      lastUpdated: 'July 2024'
    },
    {
      id: 4,
      title: 'Understanding Oman Business Licensing',
      description: 'Detailed guide on different types of business licenses, sector-specific requirements, and the approval process for each category.',
      category: 'Licensing',
      pages: 20,
      format: 'PDF',
      icon: BookOpen,
      downloadSize: '2.1 MB',
      lastUpdated: 'September 2024'
    },
    {
      id: 5,
      title: 'Document Attestation Guide',
      description: 'Complete walkthrough of the document attestation process in Oman, including ministry requirements and embassy procedures.',
      category: 'Documentation',
      pages: 14,
      format: 'PDF',
      icon: FileText,
      downloadSize: '1.5 MB',
      lastUpdated: 'August 2024'
    },
    {
      id: 6,
      title: 'Foreign Investment Opportunities in Oman',
      description: 'Explore investment sectors, free zones, incentives, and regulations for foreign investors looking to establish business in Oman.',
      category: 'Investment',
      pages: 28,
      format: 'PDF',
      icon: BookOpen,
      downloadSize: '3.2 MB',
      lastUpdated: 'September 2024'
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'How to Register a Company in Oman',
      duration: '12:45',
      description: 'Watch our step-by-step video tutorial on the company registration process',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      views: '15.2K'
    },
    {
      id: 2,
      title: 'Understanding Visa Categories',
      duration: '8:30',
      description: 'Learn about different visa types and which one suits your needs',
      thumbnail: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=600',
      views: '12.8K'
    },
    {
      id: 3,
      title: 'PRO Services Explained',
      duration: '10:15',
      description: 'Discover how PRO services can simplify your business operations',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      views: '9.5K'
    }
  ];

  const checklists = [
    {
      title: 'Company Registration Checklist',
      items: [
        'Passport copies of all shareholders',
        'Business plan and activity description',
        'Proof of office address (lease agreement)',
        'No objection certificate (if applicable)',
        'Board resolution (for companies)',
        'Bank reference letter',
        'Educational certificates (for consultancy)',
        'Previous experience documents'
      ]
    },
    {
      title: 'Employment Visa Requirements',
      items: [
        'Valid passport (minimum 6 months validity)',
        'Passport-size photographs',
        'Educational certificates (attested)',
        'Experience certificates (attested)',
        'Medical fitness certificate',
        'Police clearance certificate',
        'Employment contract',
        'Company authorization letter'
      ]
    },
    {
      title: 'License Renewal Checklist',
      items: [
        'Current commercial registration',
        'Memorandum of Association',
        'Office lease agreement renewal',
        'Municipality approval',
        'Chamber of Commerce membership',
        'Tax clearance certificate',
        'Previous year financial statements',
        'Updated business activity details'
      ]
    }
  ];

  const faqs = [
    {
      question: 'How long does company registration take in Oman?',
      answer: 'The typical timeline is 7-14 working days for a standard LLC registration, depending on the business activity and completeness of documentation. Some activities requiring special approvals may take longer.'
    },
    {
      question: 'Can foreigners own 100% of a company in Oman?',
      answer: 'Yes, 100% foreign ownership is permitted in certain sectors and within designated free zones. For activities outside free zones, requirements vary by sector. We can advise on the best structure for your business.'
    },
    {
      question: 'What is the minimum capital requirement?',
      answer: 'The minimum capital varies by company type and business activity. For most LLCs, it ranges from OMR 20,000 to OMR 150,000. Some sectors have specific requirements that we can help you understand.'
    },
    {
      question: 'How long does visa processing take?',
      answer: 'Employment visa processing typically takes 2-3 weeks once all documents are submitted. Express processing is available for urgent cases, which can reduce the timeline to 7-10 working days.'
    },
    {
      question: 'What documents need attestation?',
      answer: 'Educational certificates, experience letters, marriage certificates, and birth certificates typically require attestation. The process involves attestation from your home country, embassy, and Oman Ministry of Foreign Affairs.'
    },
    {
      question: 'Do you provide ongoing support after registration?',
      answer: 'Yes, we offer comprehensive ongoing support including license renewals, visa processing, PRO services, and compliance management. Many clients opt for our annual maintenance packages for peace of mind.'
    }
  ];

  const usefulLinks = [
    { name: 'Ministry of Commerce and Industry', url: '#' },
    { name: 'Royal Oman Police', url: '#' },
    { name: 'Ministry of Manpower', url: '#' },
    { name: 'Oman Chamber of Commerce', url: '#' },
    { name: 'Public Authority for SME Development', url: '#' },
    { name: 'Invest in Oman (Ithraa)', url: '#' }
  ];

  return (
    <div className="min-h-screen pt-28">
      <section className="py-20 bg-gradient-to-br from-[#1a2332] to-[#0f1520] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl font-light mb-6">Resources</h1>
            <p className="text-xl text-gray-300">
              Guides, checklists, and tools to help you navigate business in Oman
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-light text-[#1a2332] mb-4">Free Downloadable Guides</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive guides written by our experts to help you understand business processes in Oman
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition group"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-200 transition">
                  <guide.icon className="text-amber-600" size={24} />
                </div>
                <div className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
                  {guide.category}
                </div>
                <h3 className="text-xl font-semibold text-[#1a2332] mb-2">{guide.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{guide.pages} pages</span>
                  <span>{guide.downloadSize}</span>
                  <span>{guide.format}</span>
                </div>
                <div className="text-xs text-gray-500 mb-4">Updated: {guide.lastUpdated}</div>
                <button className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition flex items-center justify-center gap-2 font-medium">
                  <Download size={18} />
                  Download Guide
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-light text-[#1a2332] mb-4">Video Tutorials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch our expert-led video guides to better understand business processes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group cursor-pointer"
              >
                <div className="relative">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Video className="text-amber-600 ml-1" size={32} />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#1a2332] mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{video.description}</p>
                  <div className="text-xs text-gray-500">{video.views} views</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-light text-[#1a2332] mb-4">Essential Checklists</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Use these checklists to ensure you have everything needed for your applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {checklists.map((checklist, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-[#1a2332] mb-6">{checklist.title}</h3>
                <ul className="space-y-3">
                  {checklist.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="text-amber-500 flex-shrink-0 mt-0.5" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 border-2 border-amber-500 text-amber-600 py-2 rounded-lg hover:bg-amber-50 transition flex items-center justify-center gap-2 font-medium text-sm">
                  <Download size={16} />
                  Download Checklist
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-light text-[#1a2332] mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about doing business in Oman
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-[#1a2332] mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-light text-[#1a2332] mb-4">Useful Links</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Important government websites and resources
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
            {usefulLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-amber-50 transition group"
              >
                <span className="text-gray-700 group-hover:text-amber-600 transition">{link.name}</span>
                <ExternalLink className="text-gray-400 group-hover:text-amber-500 transition" size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#1a2332] to-[#0f1520] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-4">Need Personalized Guidance?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our experts are ready to answer your specific questions and provide tailored solutions
          </p>
          <a
            href="/contact"
            className="inline-block bg-amber-500 text-white px-12 py-4 rounded-lg hover:bg-amber-600 transition text-lg font-medium"
          >
            Schedule a Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
