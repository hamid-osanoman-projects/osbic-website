import ServiceDetail from '../ServiceDetail';

export default function CompanyRegistration() {
  return (
    <ServiceDetail
      title="Company Registration Services"
      description="Complete business setup and registration solutions in Oman"
      benefits={[
        'Fast and efficient registration process',
        'Expert guidance on company structure',
        'Assistance with trade name selection',
        'Complete documentation handling',
        'Ministry of Commerce liaison',
        'Chamber of Commerce registration',
        'Tax registration assistance',
        'Bank account opening support'
      ]}
      process={[
        {
          step: 'Initial Consultation',
          description: 'We discuss your business needs and recommend the best company structure for your requirements.'
        },
        {
          step: 'Documentation Preparation',
          description: 'Our team prepares all necessary documents including MOA, AOA, and application forms.'
        },
        {
          step: 'Government Submission',
          description: 'We submit your application to relevant authorities and handle all government interactions.'
        },
        {
          step: 'License Issuance',
          description: 'Upon approval, we collect your commercial registration and business license.'
        }
      ]}
      faqs={[
        {
          question: 'How long does company registration take?',
          answer: 'Typically, the process takes 7-14 working days depending on the company type and completeness of documentation.'
        },
        {
          question: 'What types of companies can be registered?',
          answer: 'We can register LLCs, branch offices, representative offices, and establishments in Oman.'
        },
        {
          question: 'What documents are required?',
          answer: 'Requirements include passport copies, business plan, office lease agreement, and other specific documents based on business activity.'
        },
        {
          question: 'Do I need a local partner?',
          answer: 'Requirements vary by business activity and location. We can advise on the best structure for your specific case.'
        }
      ]}
    />
  );
}
