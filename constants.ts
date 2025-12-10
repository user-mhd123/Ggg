import { Content, Language } from './types';

export const CONTACT_DETAILS = {
  whatsapp: "967736871497",
  email: "moshmmedmoshmmed56@gmail.com",
  instagram: "mohammed313581",
  manager: "Mohammed Saleh Al-Sari / محمد صالح الساري"
};

export const CONTENT: Record<Language, Content> = {
  en: {
    nav: {
      about: "About",
      solutions: "Solutions",
      howItWorks: "How it works",
      testimonials: "Testimonials",
      investors: "Investors",
      contact: "Contact",
      signUp: "Sign Up"
    },
    hero: {
      title: "INTERNET FROM SPACE",
      subtitle: "LightSpeed is developing innovative solutions to provide low-cost high-speed internet to everywhere in the world, even for the most remote and secluded location.",
      cta: "Get Started"
    },
    stats: {
      speed: "AMAZING SPEED",
      speedLabel: "Download speed",
      rating: "APPROVED",
      ratingLabel: "Customers' ratings",
      coverage: "COVERAGE",
      coverageLabel: "Internet in every country"
    },
    mission: {
      title: "OUR MISSION",
      subtitle: "INTERNET ON A REMOTE ISLAND?",
      description: "With the pandemic still affecting people and encouraging remote work, people with spotty internet connections working from a beach or secluded island can now enjoy reliable high-speed internet while still escaping life in a busy town.",
      cta: "EXPLORE"
    },
    capabilities: {
      title: "OUR CAPABILITIES",
      subtitle: "INNOVATION",
      description: "LightSpeed uses thousands of micro satellites scattered around in low orbit to bring high-speed internet anywhere on the planet. This lets us project down in a fixed spot on the Earth and drastically reduce internet bandwidth and latency.",
      cta: "LEARN MORE"
    },
    coverage: {
      title: "GLOBAL COVERAGE",
      subtitle: "LightSpeed provides internet solutions with excellent speeds around the whole globe. Power your home or enterprise with connectivity in more than 190 countries.",
      legend: "Where to find us"
    },
    solution: {
      title: "OUR SOLUTION",
      subtitle: "LOOKING FOR SPEED?",
      description: "A slow connection that times out or takes minutes for a page to load is almost as bad as no connection at all. Therefore, the LightSpeed has decided to develop a solution that allows you to download anything at a minimum of 150 Mbps and upload at 10 Mbps with no frustration attached.",
      cta: "SHOW ME"
    },
    security: {
      title: "OUR PROMISE",
      subtitle: "SECURITY IS IMPORTANT",
      description: "Cybersecurity risks pervade every organization and aren't always under the direct control of your IT security team. Increasing global connectivity, usage of cloud services, and outsourcing means a much larger attack vector than in the past. Learn more about cyber security.",
      cta: "LEARN MORE"
    },
    pricing: {
      title: "PRICING OPTIONS",
      toggleIndividual: "Individuals",
      toggleBusiness: "Businesses",
      cta: "SELECT",
      features: {
        download: "Download speed",
        upload: "Upload speed",
        data: "Data cap",
        contract: "Contract",
        setup: "Setup cost"
      }
    },
    ctaJoin: {
      title: "READY TO JOIN US?",
      button: "JOIN NOW"
    },
    footer: {
      about: "ABOUT",
      solutions: "SOLUTION",
      investors: "INVESTORS",
      contact: "CONTACT",
      description: "LightSpeed is a satellite internet constellation providing satellite internet access.",
      copyright: "LightSpeed © 2024 Created by Dominik D. UI/UX Designer"
    },
    contactInfo: {
      title: "Contact Information",
      manager: "Management",
      whatsapp: "WhatsApp",
      email: "Email",
      instagram: "Instagram",
      close: "Close"
    },
    ai: {
      button: "AI Support",
      listening: "Listening...",
      speaking: "Speaking...",
      idle: "Start Conversation",
      title: "LightSpeed AI Assistant",
      micPermission: "Please allow microphone access"
    }
  },
  ar: {
    nav: {
      about: "حول",
      solutions: "حلول",
      howItWorks: "كيف يعمل",
      testimonials: "آراء العملاء",
      investors: "المستثمرون",
      contact: "اتصل بنا",
      signUp: "سجل الآن"
    },
    hero: {
      title: "إنترنت من الفضاء",
      subtitle: "تعمل لايت سبيد على تطوير حلول مبتكرة لتوفير إنترنت عالي السرعة ومنخفض التكلفة في كل مكان في العالم، حتى في الأماكن النائية والمعزولة.",
      cta: "ابدأ الآن"
    },
    stats: {
      speed: "سرعة مذهلة",
      speedLabel: "سرعة التحميل",
      rating: "موافق عليه",
      ratingLabel: "تقييمات العملاء",
      coverage: "تغطية شاملة",
      coverageLabel: "إنترنت في كل بلد"
    },
    mission: {
      title: "مهمتنا",
      subtitle: "إنترنت في جزيرة نائية؟",
      description: "مع استمرار تأثير الوباء على الناس وتشجيع العمل عن بعد، يمكن للأشخاص الذين لديهم اتصالات إنترنت متقطعة ويعملون من الشاطئ أو جزيرة معزولة الاستمتاع الآن بإنترنت موثوق عالي السرعة مع الهروب من الحياة في المدينة المزدحمة.",
      cta: "استكشف"
    },
    capabilities: {
      title: "قدراتنا",
      subtitle: "ابتكار",
      description: "تستخدم لايت سبيد آلاف الأقمار الصناعية الصغيرة المنتشرة في مدار منخفض لتوصيل إنترنت عالي السرعة في أي مكان على الكوكب. يتيح لنا هذا الإسقاط لأسفل في بقعة ثابتة على الأرض وتقليل عرض النطاق الترددي للإنترنت وزمن الانتقال بشكل كبير.",
      cta: "اعرف المزيد"
    },
    coverage: {
      title: "تغطية عالمية",
      subtitle: "توفر لايت سبيد حلول إنترنت بسرعات ممتازة حول العالم بأسره. قم بتشغيل منزلك أو مؤسستك من خلال الاتصال في أكثر من 190 دولة.",
      legend: "أين تجدنا"
    },
    solution: {
      title: "حلولنا",
      subtitle: "تبحث عن السرعة؟",
      description: "الاتصال البطيء الذي تنتهي مهلته أو يستغرق دقائق لتحميل صفحة لا يقل سوءًا عن عدم وجود اتصال على الإطلاق. لذلك، قررت لايت سبيد تطوير حل يسمح لك بتنزيل أي شيء بحد أدنى 150 ميجابت في الثانية وتحميل بسرعة 10 ميجابت في الثانية دون أي إحباط.",
      cta: "أرني كيف"
    },
    security: {
      title: "وعدنا",
      subtitle: "الأمان مهم",
      description: "تتغلغل مخاطر الأمن السيبراني في كل مؤسسة وليست دائمًا تحت السيطرة المباشرة لفريق أمن تكنولوجيا المعلومات لديك. يعني زيادة الاتصال العالمي واستخدام الخدمات السحابية والاستعانة بمصادر خارجية ناقل هجوم أكبر بكثير مما كان عليه في الماضي.",
      cta: "اعرف المزيد"
    },
    pricing: {
      title: "خيارات التسعير",
      toggleIndividual: "الأفراد",
      toggleBusiness: "الشركات",
      cta: "اختر",
      features: {
        download: "سرعة التنزيل",
        upload: "سرعة الرفع",
        data: "سقف البيانات",
        contract: "العقد",
        setup: "تكلفة التثبيت"
      }
    },
    ctaJoin: {
      title: "هل أنت مستعد للانضمام؟",
      button: "انضم الآن"
    },
    footer: {
      about: "حول",
      solutions: "الحلول",
      investors: "المستثمرون",
      contact: "اتصل بنا",
      description: "لايت سبيد هي كوكبة إنترنت عبر الأقمار الصناعية توفر الوصول إلى الإنترنت عبر الأقمار الصناعية.",
      copyright: "لايت سبيد © 2024 تم الإنشاء بواسطة محمد صالح الساري"
    },
    contactInfo: {
      title: "معلومات التواصل",
      manager: "الإدارة",
      whatsapp: "واتساب",
      email: "البريد الإلكتروني",
      instagram: "انستغرام",
      close: "إغلاق"
    },
    ai: {
      button: "الدعم الذكي",
      listening: "جاري الاستماع...",
      speaking: "جاري التحدث...",
      idle: "ابدأ المحادثة",
      title: "مساعد لايت سبيد الذكي",
      micPermission: "يرجى السماح بصلاحيات الميكروفون"
    }
  }
};
