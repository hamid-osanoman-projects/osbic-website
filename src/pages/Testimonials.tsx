import { motion } from 'framer-motion';
import { Star, Quote, Building2, Users, Award } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'David Thompson',
      position: 'CEO',
      company: 'TechVision Solutions',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'OSBIC made our Oman expansion seamless. Their expertise in company registration and understanding of local business requirements saved us weeks of frustration. The team was professional, responsive, and delivered results ahead of schedule. I highly recommend their services to any international company looking to establish presence in Oman.',
      service: 'Company Registration',
      date: 'September 2024'
    },
    {
      id: 2,
      name: 'Fatima Al-Balushi',
      position: 'Operations Director',
      company: 'Gulf Trade Partners',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'We have been working with OSBIC for over 3 years for all our PRO services and visa processing needs. They handle everything from license renewals to employee visa applications with remarkable efficiency. Having a reliable partner like OSBIC allows us to focus entirely on our business growth without worrying about compliance issues.',
      service: 'PRO Services',
      date: 'August 2024'
    },
    {
      id: 3,
      name: 'Mohammed Al-Rashid',
      position: 'Project Director',
      company: 'Global Construction Group',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'Processing 150 employment visas for our construction project seemed like an impossible task with our tight deadline. OSBIC not only made it possible but achieved a 100% success rate with zero rejections. Their systematic approach and strong government relationships are truly impressive. They are now our go-to partner for all projects in Oman.',
      service: 'Visa & Emigration',
      date: 'July 2024'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      position: 'Operations Manager',
      company: 'RetailHub International',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'Managing compliance for 12 retail locations across Oman was a nightmare until we partnered with OSBIC. Their proactive approach to license renewals and permit management has eliminated stress and prevented any business interruptions. The dedicated PRO team feels like an extension of our own staff. Outstanding service!',
      service: 'Multi-location Support',
      date: 'June 2024'
    },
    {
      id: 5,
      name: 'Ahmed Al-Balushi',
      position: 'Managing Director',
      company: 'FoodCo Distribution',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'OSBIC guided us through an aggressive expansion from 1 to 5 locations in just 4 months. They handled municipality approvals, health permits, and commercial licenses for each location seamlessly. Their expertise in dealing with different governorates and understanding local requirements was invaluable. We achieved 400% growth thanks to their support.',
      service: 'Business Expansion',
      date: 'May 2024'
    },
    {
      id: 6,
      name: 'Dr. Priya Sharma',
      position: 'Director',
      company: 'EduGlobal Consultants',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'We needed urgent attestation for over 200 educational documents with strict academic deadlines. OSBIC handled the complex process involving multiple ministries and embassies flawlessly. Every single document was processed on time with 100% acceptance. Their efficiency literally saved our academic year. Exceptional service and reliability.',
      service: 'Document Attestation',
      date: 'April 2024'
    },
    {
      id: 7,
      name: 'Rashid Al-Mamari',
      position: 'Founder & CEO',
      company: 'InnovateLab',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'As a startup with limited budget, OSBIC created a custom package that gave us everything we needed at a price we could afford. They understood our constraints and worked with us to establish our company, process visas, and set up banking relationships. More than a service provider, they became our trusted advisors. Highly recommended for startups.',
      service: 'Startup Package',
      date: 'March 2024'
    },
    {
      id: 8,
      name: 'James Martinez',
      position: 'Regional Manager',
      company: 'Logistics Express',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'OSBIC has been handling our visa renewals and labor card processing for 200+ employees annually for the past 5 years. Their systematic tracking ensures nothing falls through the cracks and all renewals happen on time. The online portal they provide gives us complete visibility. This level of organization and service is rare. Truly professional team.',
      service: 'Ongoing Support',
      date: 'February 2024'
    },
    {
      id: 9,
      name: 'Aisha Mohammed',
      position: 'Business Development Manager',
      company: 'Arabian Hospitality Group',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'Opening a hotel requires numerous licenses and approvals from various government entities. OSBIC coordinated everything from tourism licenses to health approvals to civil defense clearances. They anticipated requirements we did not even know existed and ensured we had everything in place before our grand opening. Their thoroughness is impressive.',
      service: 'Hospitality Licensing',
      date: 'January 2024'
    },
    {
      id: 10,
      name: 'Robert Chen',
      position: 'CFO',
      company: 'Pacific Trading Co.',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'Transparency and clear pricing were our top priorities when selecting a business services provider. OSBIC delivers both, along with exceptional service. No hidden fees, clear timelines, and regular updates throughout every process. After bad experiences with other providers, finding OSBIC was a relief. They set the standard for professional business services.',
      service: 'Complete Business Setup',
      date: 'December 2023'
    },
    {
      id: 11,
      name: 'Khalid Al-Hinai',
      position: 'Partner',
      company: 'Al-Hinai Legal Consultancy',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'As a law firm, we have high standards for professional services. OSBIC consistently exceeds expectations with their attention to detail, knowledge of regulations, and client communication. We regularly refer our corporate clients to them for PRO and registration services. Their work quality reflects positively on our recommendations. Excellent partnership.',
      service: 'Professional Services',
      date: 'November 2023'
    },
    {
      id: 12,
      name: 'Maria Santos',
      position: 'HR Director',
      company: 'Healthcare International',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'Processing medical professional licenses and visas involves complex requirements and strict documentation. OSBIC handles this for our doctors and nurses from various countries with remarkable efficiency. They understand healthcare sector requirements and ensure all credentials are properly attested. Our HR team can focus on recruitment while they handle compliance.',
      service: 'Healthcare Sector Support',
      date: 'October 2023'
    }
  ];

  const stats = [
    { icon: Users, value: '3000+', label: 'Happy Clients' },
    { icon: Star, value: '4.9/5', label: 'Average Rating' },
    { icon: Award, value: '98%', label: 'Success Rate' },
    { icon: Building2, value: '15+', label: 'Years Experience' }
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
            <h1 className="text-5xl font-light mb-6">Client Testimonials</h1>
            <p className="text-xl text-gray-300">
              See what our clients say about working with OSBIC International
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-amber-600" size={28} />
                </div>
                <div className="text-3xl font-bold text-[#1a2332] mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 6) * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition relative"
              >
                <Quote className="absolute top-6 right-6 text-amber-200" size={48} />

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-[#1a2332]">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                    <p className="text-sm text-amber-600 font-medium">{testimonial.company}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-4 text-sm">{testimonial.text}</p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-xs font-medium text-amber-600">{testimonial.service}</span>
                  <span className="text-xs text-gray-500">{testimonial.date}</span>
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
            className="max-w-4xl mx-auto bg-gradient-to-br from-[#1a2332] to-[#0f1520] rounded-2xl p-12 text-white text-center"
          >
            <h2 className="text-3xl font-light mb-4">Join Our Growing List of Satisfied Clients</h2>
            <p className="text-gray-300 mb-8">
              Experience the same level of service and dedication that our clients rave about
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/96812345678"
                className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition font-medium"
              >
                Chat on WhatsApp
              </a>
              <a
                href="tel:+96812345678"
                className="bg-amber-500 text-white px-8 py-3 rounded-lg hover:bg-amber-600 transition font-medium"
              >
                Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
