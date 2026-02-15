
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { advisorService } from '../services/geminiService';

export type Language = 'English' | 'Hindi' | 'Marathi' | 'Tamil' | 'Telugu' | 'Bengali' | 'Kannada';

interface TranslationMap {
  [key: string]: {
    [K in Language]?: string;
  };
}

const translations: TranslationMap = {
  // Nav & General
  products: { English: 'Products', Hindi: 'उत्पाद', Marathi: 'उत्पादने' },
  solutions: { English: 'Solutions', Hindi: 'समाधान', Marathi: 'उपाय' },
  resources: { English: 'Resources', Hindi: 'संसाधन', Marathi: 'संसाधने' },
  company: { English: 'Company', Hindi: 'कंपनी', Marathi: 'कंपनी' },
  login_signup: { English: 'Login / Sign up', Hindi: 'लॉगिन / साइन अप', Marathi: 'लॉगिन / साइन अप' },
  dashboard: { English: 'Dashboard', Hindi: 'डैशबोर्ड', Marathi: 'डॅशबोर्ड' },
  market: { English: 'Market', Hindi: 'बाज़ार', Marathi: 'बाजार' },
  logout: { English: 'Logout', Hindi: 'लॉगआउट', Marathi: 'लॉगआउट' },
  
  // Hero Section
  hero_tag: {
    English: 'AI-Powered Intelligent Agriculture',
    Hindi: 'AI-संचालित बुद्धिमान कृषि',
    Marathi: 'AI-आधारित प्रगत शेती'
  },
  hero_title_main: {
    English: 'AI for agriculture enterprise grade intelligence.',
    Hindi: 'कृषि उद्यम स्तर की बुद्धिमत्ता के लिए AI।',
    Marathi: 'कृषी क्षेत्रासाठी एंटरप्राइझ ग्रेड इंटेलिजेंस.'
  },
  hero_desc: {
    English: 'Experience the power of Bharat Krishi OS. Our platform converts data into actionable intelligence, helping you optimize yields, mitigate risks, and build sustainable food systems.',
    Hindi: 'भारत कृषि OS की शक्ति का अनुभव करें। हमारा प्लेटफॉर्म डेटा को कार्रवाई योग्य बुद्धिमत्ता में बदलता है।',
    Marathi: 'भारत कृषी OS ची ताकद अनुभवा. आमचा प्लॅटफॉर्म डेटाचे कृतीयोग्य बुद्धिमत्तेत रूपांतर करतो.'
  },
  connect_with_us: { English: 'Connect With Us', Hindi: 'हमसे जुड़ें', Marathi: 'आमच्याशी जोडा' },

  // Dashboards
  kisan_portal: { English: 'Kisan Portal', Hindi: 'किसान पोर्टल', Marathi: 'शेतकरी पोर्टल' },
  vyapar_hub: { English: 'Vyapar Hub', Hindi: 'व्यापार हब', Marathi: 'व्यापार हब' },
  mandi_pulse: { English: 'Mandi Pulse', Hindi: 'मंडी पल्स', Marathi: 'बाजार भाव' },
  kisan_score: { English: 'Kisan Score', Hindi: 'किसान स्कोर', Marathi: 'शेतकरी स्कोअर' },
  agri_video_lab: { English: 'Agri-Video Lab', Hindi: 'कृषि वीडियो लैब', Marathi: 'कृषी व्हिडिओ लॅब' },
  
  // Login Page
  welcome_back: { English: 'Welcome Back.', Hindi: 'आपका स्वागत है।', Marathi: 'पुन्हा स्वागत आहे.' },
  join_sovereign: { English: 'Join the Sovereign Stack.', Hindi: 'संप्रभु स्टैक से जुड़ें।', Marathi: 'सार्वभौम स्टॅकमध्ये सामील व्हा.' },
  identity_verification: { English: 'Identity Verification', Hindi: 'पहचान सत्यापन', Marathi: 'ओळख पडताळणी' },
  secure_login: { English: 'Secure Login', Hindi: 'सुरक्षित लॉगिन', Marathi: 'सुरक्षित लॉगिन' },
  verify_proceed: { English: 'Verify & Proceed', Hindi: 'सत्यापित करें और आगे बढ़ें', Marathi: 'पडताळणी करा आणि पुढे जा' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isAiTranslating: boolean;
  aiTranslatePage: () => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('English');
  const [isAiTranslating, setIsAiTranslating] = useState(false);
  const [dynamicTranslations, setDynamicTranslations] = useState<Record<string, string>>({});

  const t = useCallback((key: string): string => {
    // Check dynamic translations first
    if (dynamicTranslations[`${key}_${language}`]) {
      return dynamicTranslations[`${key}_${language}`];
    }
    
    // Check static dictionary
    const val = translations[key]?.[language] || translations[key]?.['English'];
    if (val) return val;
    
    // Fallback to key
    return key;
  }, [language, dynamicTranslations]);

  const aiTranslatePage = async () => {
    if (language === 'English') return;
    setIsAiTranslating(true);
    
    try {
      // Find all elements with data-translate attribute or just general text nodes
      // For this demo, we'll simulate translating the currently visible significant strings
      const elementsToTranslate = Array.from(document.querySelectorAll('h1, h2, h3, p, span'))
        .filter(el => el.textContent && el.textContent.length > 5 && el.textContent.length < 200)
        .map(el => el.textContent!.trim());

      const uniqueTexts = Array.from(new Set(elementsToTranslate));
      
      for (const text of uniqueTexts) {
        if (!dynamicTranslations[`${text}_${language}`]) {
          const translated = await advisorService.translateText(text, language);
          setDynamicTranslations(prev => ({
            ...prev,
            [`${text}_${language}`]: translated
          }));
        }
      }
    } catch (error) {
      console.error("AI Page Translation Error:", error);
    } finally {
      setIsAiTranslating(false);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isAiTranslating, aiTranslatePage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
