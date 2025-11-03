import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Building2, Globe, Users, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export default function BusinessLocations() {
  const { t } = useTranslation();

  const locations = [
    {
      country: 'Oman',
      flag: '🇴🇲',
      description: 'Strategic location bridging Asia, Africa, and Europe with world-class infrastructure and business-friendly policies.',
      advantages: [
        'Tax-free zones available',
        '100% foreign ownership in free zones',
        'Modern infrastructure',
        'Strategic location',
        'Stable political environment'
      ],
      services: [
        'Company Registration',
        'Trade License',
        'Visa Processing',
        'PRO Services',
        'Office Setup'
      ],
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      setupTime: '7-14 days',
      minCapital: 'OMR 20,000'
    },
    {
      country: 'Dubai (UAE)',
      flag: '🇦🇪',
      description: 'Global business hub with world-leading free zones, advanced infrastructure, and access to international markets.',
      advantages: [
        'No corporate tax in free zones',
        '100% foreign ownership',
        'World-class infrastructure',
        'Strategic connectivity',
        'Multiple free zones'
      ],
      services: [
        'Mainland Company Setup',
        'Free Zone Company Setup',
        'Trade License',
        'Golden Visa Services',
        'Bank Account Opening'
      ],
      image: 'https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg?auto=compress&cs=tinysrgb&w=800',
      setupTime: '5-10 days',
      minCapital: 'AED 50,000'
    },
    {
      country: 'United Arab Emirates',
      flag: '🇦🇪',
      description: 'Complete UAE business setup services across all emirates including Abu Dhabi, Sharjah, Ajman, and more.',
      advantages: [
        'Federal business options',
        'Access to GCC markets',
        'Modern banking system',
        'Easy repatriation of profits',
        'No currency restrictions'
      ],
      services: [
        'Federal Company Setup',
        'Branch Office Registration',
        'Industrial License',
        'Professional License',
        'Commercial License'
      ],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=800',
      setupTime: '7-14 days',
      minCapital: 'AED 50,000'
    },
    {
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      description: 'Largest economy in the Middle East with massive opportunities in Vision 2030 transformation projects.',
      advantages: [
        'Largest regional market',
        'Major infrastructure projects',
        '100% foreign ownership allowed',
        'Vision 2030 opportunities',
        'Tax incentives available'
      ],
      services: [
        'Company Registration',
        'Investment License',
        'Work Visa Services',
        'Commercial Registration',
        'Zakat & Tax Registration'
      ],
      image: 'https://images.pexels.com/photos/3935330/pexels-photo-3935330.jpeg?auto=compress&cs=tinysrgb&w=800',
      setupTime: '14-21 days',
      minCapital: 'SAR 50,000'
    },
    {
      country: 'Qatar',
      flag: '🇶🇦',
      description: 'Rapidly growing economy with major infrastructure development and business-friendly regulations.',
      advantages: [
        'Zero tax on income',
        '100% foreign ownership',
        'Strong economy',
        'Major infrastructure growth',
        'Strategic location'
      ],
      services: [
        'Company Formation',
        'Commercial License',
        'Work Permit Processing',
        'Bank Account Setup',
        'Office Space Solutions'
      ],
      image: 'https://images.pexels.com/photos/2115367/pexels-photo-2115367.jpeg?auto=compress&cs=tinysrgb&w=800',
      setupTime: '10-15 days',
      minCapital: 'QAR 200,000'
    },
    {
      country: 'Kuwait',
      flag: '🇰🇼',
      description: 'Oil-rich nation with strong economy and excellent opportunities for international businesses.',
      advantages: [
        'Strong economy',
        'Low corporate tax',
        'Modern infrastructure',
        'Strategic location',
        'Growing private sector'
      ],
      services: [
        'Business Setup',
        'Trade License',
        'Work Visa Services',
        'Partnership Arrangements',
        'Legal Documentation'
      ],
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      setupTime: '14-21 days',
      minCapital: 'KWD 20,000'
    },
    {
      country: 'Bahrain',
      flag: '🇧🇭',
      description: 'Liberal economy with 100% foreign ownership, low setup costs, and quick registration process.',
      advantages: [
        '100% foreign ownership',
        'Low setup costs',
        'Quick registration',
        'No currency restrictions',
        'Business-friendly laws'
      ],
      services: [
        'Company Registration',
        'CR License',
        'Work Permit Services',
        'Bank Account Opening',
        'Office Solutions'
      ],
      image: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=800',
      setupTime: '5-10 days',
      minCapital: 'BHD 20,000'
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
            <h1 className="text-5xl font-light mb-6">{t('businessLocations.title')}</h1>
            <p className="text-xl text-gray-300">
              {t('businessLocations.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.country}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl">{location.flag}</span>
                      <h3 className="text-3xl font-bold text-white">{location.country}</h3>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed">{location.description}</p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase mb-3 flex items-center gap-2">
                      <TrendingUp size={16} className="text-amber-600" />
                      Key Advantages
                    </h4>
                    <ul className="space-y-2">
                      {location.advantages.map((adv, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-600">
                          <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5 mr-2" size={16} />
                          {adv}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase mb-3 flex items-center gap-2">
                      <Building2 size={16} className="text-amber-600" />
                      Our Services
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {location.services.map((service, i) => (
                        <span
                          key={i}
                          className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">Setup Time</div>
                      <div className="font-semibold text-[#1a2332]">{location.setupTime}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">Min Capital</div>
                      <div className="font-semibold text-[#1a2332]">{location.minCapital}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to="/contact"
                      className="flex-1 bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition text-center font-medium"
                    >
                      {t('businessLocations.getStarted')}
                    </Link>
                    <Link
                      to="/contact"
                      className="flex-1 border-2 border-amber-500 text-amber-600 py-3 rounded-lg hover:bg-amber-50 transition text-center font-medium flex items-center justify-center gap-2"
                    >
                      {t('businessLocations.learnMore')}
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
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
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-light text-[#1a2332] mb-4">Why Choose OSBIC for Your Business Setup?</h2>
            <p className="text-gray-600 mb-12">
              We provide end-to-end business setup services across the Middle East with local expertise and international standards
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="text-amber-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-[#1a2332] mb-2">Regional Expertise</h3>
                <p className="text-gray-600">Deep knowledge of business regulations across all GCC countries</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-amber-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-[#1a2332] mb-2">Dedicated Support</h3>
                <p className="text-gray-600">Personal account manager for your setup and ongoing needs</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-amber-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-[#1a2332] mb-2">Fast Processing</h3>
                <p className="text-gray-600">Streamlined processes for quick company registration</p>
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-block bg-amber-500 text-white px-12 py-4 rounded-lg hover:bg-amber-600 transition text-lg font-medium"
            >
              Start Your Business Setup Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
