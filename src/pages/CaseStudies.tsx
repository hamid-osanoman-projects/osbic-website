import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Users, Globe, TrendingUp } from 'lucide-react';

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      category: 'Company Registration',
      icon: Building2,
      client: 'TechVision Solutions',
      industry: 'Technology & Software',
      challenge: 'A Dubai-based tech company wanted to expand operations into Oman but was unfamiliar with local business registration requirements and needed to establish a legal entity within 30 days to meet project deadlines.',
      solution: 'We provided comprehensive company registration services including LLC setup, trade name approval, office space coordination, and expedited processing through our government connections.',
      results: [
        'Company registered in 12 days (18 days ahead of schedule)',
        'Obtained 3 business licenses for multiple activities',
        'Secured commercial registration certificate',
        'Assisted with opening corporate bank account',
        'Provided ongoing PRO support for 2 years'
      ],
      metrics: {
        time: '12 Days',
        licenses: '3 Licenses',
        satisfaction: '100%'
      },
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      testimonial: 'OSBIC made our Oman expansion seamless. Their expertise and speed were exceptional.',
      author: 'David Thompson, CEO'
    },
    {
      id: 2,
      category: 'Visa & Emigration',
      icon: Globe,
      client: 'Global Construction Group',
      industry: 'Construction & Engineering',
      challenge: 'A major construction project required bringing 150 skilled workers from multiple countries within a tight timeframe. The client needed visa processing, labor approvals, and residency permits for the entire team.',
      solution: 'We deployed a dedicated team to handle bulk visa processing, coordinated with Ministry of Manpower for quota approvals, managed medical examinations, and processed all documentation efficiently.',
      results: [
        'Successfully processed 150 employment visas',
        'Obtained labor approvals for all positions',
        'Coordinated medical tests and clearances',
        'Issued residence cards within deadlines',
        'Zero visa rejections or complications'
      ],
      metrics: {
        time: '45 Days',
        visas: '150 Visas',
        success: '100%'
      },
      image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=800',
      testimonial: 'Handling 150 visas seemed impossible, but OSBIC delivered flawlessly.',
      author: 'Mohammed Al-Rashid, Project Director'
    },
    {
      id: 3,
      category: 'PRO Services',
      icon: Users,
      client: 'RetailHub International',
      industry: 'Retail & Distribution',
      challenge: 'A retail chain with 12 locations across Oman needed ongoing PRO services to manage license renewals, municipality approvals, health permits, and civil defense clearances for all branches.',
      solution: 'We assigned a dedicated PRO team to manage all government interactions, created a renewal calendar system, and provided proactive compliance monitoring for all locations.',
      results: [
        'Renewed 12 commercial licenses on time',
        'Obtained 36 different permits and approvals',
        'Maintained 100% compliance across all branches',
        'Reduced client admin time by 80%',
        'Prevented any business interruptions'
      ],
      metrics: {
        locations: '12 Stores',
        permits: '36 Permits',
        compliance: '100%'
      },
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800',
      testimonial: 'OSBIC is our trusted partner. We focus on business while they handle compliance.',
      author: 'Sarah Williams, Operations Manager'
    },
    {
      id: 4,
      category: 'Business Expansion',
      icon: TrendingUp,
      client: 'FoodCo Distribution',
      industry: 'Food & Beverage',
      challenge: 'A successful food distribution company wanted to expand from 1 location to 5 new branches across different governorates, each requiring specific licenses, municipality approvals, and health department clearances.',
      solution: 'We provided end-to-end support including location assessment, municipality liaison, health permit processing, commercial license applications, and coordination with multiple government entities.',
      results: [
        'Successfully established 5 new branch offices',
        'Obtained food handling licenses for all locations',
        'Secured municipality approvals in record time',
        'Coordinated with health authorities efficiently',
        'Completed expansion 3 months ahead of plan'
      ],
      metrics: {
        branches: '5 New Branches',
        time: '4 Months',
        growth: '400%'
      },
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
      testimonial: 'Our aggressive expansion plan succeeded because of OSBIC\'s expertise.',
      author: 'Ahmed Al-Balushi, Managing Director'
    },
    {
      id: 5,
      category: 'Ministry Services',
      icon: Building2,
      client: 'EduGlobal Consultants',
      industry: 'Education & Training',
      challenge: 'An international education consultancy needed document attestation for over 200 certificates and degrees for students applying to Omani universities, with strict deadlines from the academic calendar.',
      solution: 'We streamlined the attestation process through our Ministry contacts, created a tracking system for each document, and coordinated with embassies and relevant authorities for complete authentication.',
      results: [
        'Attested 200+ educational documents',
        'Processed through 3 government ministries',
        'Completed all attestations within deadline',
        'Achieved 100% acceptance rate',
        'Established ongoing partnership'
      ],
      metrics: {
        documents: '200+ Docs',
        ministries: '3 Ministries',
        timeline: 'On Time'
      },
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800',
      testimonial: 'OSBIC saved our academic year. Their efficiency is unmatched.',
      author: 'Dr. Priya Sharma, Director'
    },
    {
      id: 6,
      category: 'Startup Package',
      icon: TrendingUp,
      client: 'InnovateLab',
      industry: 'Innovation & Startups',
      challenge: 'A tech startup with limited resources needed a complete business setup including company registration, visa processing for founders, office setup, and banking relationships - all within a modest budget.',
      solution: 'We created a custom startup package combining essential services, negotiated better rates, provided flexible payment terms, and offered ongoing advisory support to help them launch successfully.',
      results: [
        'Complete business setup for 3 founders',
        'Registered LLC with e-commerce license',
        'Processed investor visas for 2 partners',
        'Opened corporate bank account',
        'Ongoing compliance support included'
      ],
      metrics: {
        days: '20 Days',
        founders: '3 Visas',
        savings: '30% Cost'
      },
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      testimonial: 'OSBIC understood our startup needs and made it happen within our budget.',
      author: 'Rashid Al-Mamari, Founder'
    }
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
            <h1 className="text-5xl font-light mb-6">Case Studies</h1>
            <p className="text-xl text-gray-300">
              Real success stories from businesses we've helped grow in Oman
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.client}
                    className="w-full h-full object-cover transform hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      <study.icon size={16} />
                      {study.category}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-[#1a2332] mb-2">{study.client}</h3>
                  <p className="text-amber-600 font-medium mb-4">{study.industry}</p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase mb-2">The Challenge</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{study.challenge}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase mb-2">Our Solution</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{study.solution}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase mb-2">Results Achieved</h4>
                    <ul className="space-y-2">
                      {study.results.map((result, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    {Object.entries(study.metrics).map(([key, value]) => (
                      <div key={key} className="flex-1 text-center">
                        <div className="text-2xl font-bold text-amber-600">{value}</div>
                        <div className="text-xs text-gray-600 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  <div className="border-l-4 border-amber-500 pl-4 py-2 mb-6 bg-amber-50">
                    <p className="text-gray-700 italic mb-2">"{study.testimonial}"</p>
                    <p className="text-sm font-medium text-gray-900">{study.author}</p>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-amber-600 font-medium hover:text-amber-700 transition"
                  >
                    Get Similar Results <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-light text-[#1a2332] mb-6">Ready to Become Our Next Success Story?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that trust OSBIC for their critical operations in Oman.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-amber-500 text-white px-12 py-4 rounded-lg hover:bg-amber-600 transition text-lg font-medium"
          >
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
}
