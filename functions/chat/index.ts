import i18n from 'i18next'; // Make sure i18n is initialized elsewhere

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
}

const getMockResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('company registration') || lowerMessage.includes('business setup')) {
    return i18n.t('response.companyRegistration');
  }

  if (lowerMessage.includes('visa') || lowerMessage.includes('visa services')) {
    return i18n.t('response.visaServices');
  }

  if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('quote')) {
    return i18n.t('response.costEstimate');
  }

  if (lowerMessage.includes('pro') || lowerMessage.includes('government')) {
    return i18n.t('response.proServices');
  }

  if (lowerMessage.includes('time') || lowerMessage.includes('duration') || lowerMessage.includes('how long')) {
    return i18n.t('response.processingTime');
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
    return i18n.t('response.contactInfo');
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return i18n.t('response.help');
  }

  return i18n.t('response.default');
};

export const handleChatRequest = async (request: ChatRequest): Promise<ChatResponse> => {
  const response = getMockResponse(request.message);
  return { response };
};
  