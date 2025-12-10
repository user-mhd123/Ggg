export type Language = 'en' | 'ar';

export interface Content {
  nav: {
    about: string;
    solutions: string;
    howItWorks: string;
    testimonials: string;
    investors: string;
    contact: string;
    signUp: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  stats: {
    speed: string;
    speedLabel: string;
    rating: string;
    ratingLabel: string;
    coverage: string;
    coverageLabel: string;
  };
  mission: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
  };
  capabilities: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
  };
  coverage: {
    title: string;
    subtitle: string;
    legend: string;
  };
  solution: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
  };
  security: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
  };
  pricing: {
    title: string;
    toggleIndividual: string;
    toggleBusiness: string;
    cta: string;
    features: {
      download: string;
      upload: string;
      data: string;
      contract: string;
      setup: string;
    };
  };
  ctaJoin: {
    title: string;
    button: string;
  };
  footer: {
    about: string;
    solutions: string;
    investors: string;
    contact: string;
    description: string;
    copyright: string;
  };
  contactInfo: {
    title: string;
    manager: string;
    whatsapp: string;
    email: string;
    instagram: string;
    close: string;
  };
  ai: {
    button: string;
    listening: string;
    speaking: string;
    idle: string;
    title: string;
    micPermission: string;
  }
}
