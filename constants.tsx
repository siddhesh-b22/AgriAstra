
import { MandiPrice, SubsidyStatus, WeatherData, PriorityAction, CropStage } from './types';

export const COLORS = {
  PRIMARY: '#064E3B', // Deep Forest Green
  ACCENT: '#C29243',  // Bharat Gold
  SURFACE: '#FDFDFC', // Paper Base
  EMERALD: '#10B981', // Growth
  AMBER: '#F59E0B',   // Warning
  ERROR: '#EF4444',   // Critical
};

export const CROP_CALENDAR: CropStage[] = [
  { stage: 'Sowing', duration: 'Oct 1-15', status: 'completed', tasks: ['Soil Prep', 'Seed Treatment'] },
  { stage: 'Vegetative', duration: 'Oct 16 - Nov 20', status: 'completed', tasks: ['First Irrigation', 'Weeding'] },
  { stage: 'Tuberization', duration: 'Nov 21 - Jan 10', status: 'current', tasks: ['Earthing up', 'Potash Spray'] },
  { stage: 'Maturity', duration: 'Jan 11 - Feb 5', status: 'upcoming', tasks: ['Dehaulming'] },
  { stage: 'Harvest', duration: 'Feb 6-20', status: 'upcoming', tasks: ['Digging', 'Sorting'] },
];

export const MOCK_MANDI_PRICES: MandiPrice[] = [
  { 
    mandi: 'Lucknow Mandi', 
    commodity: 'Potato (Jyoti)', 
    price: 1450, 
    unit: 'q', 
    trend: 'up',
    volume: '1,200 MT',
    lastSync: '14 mins ago',
    history: [1200, 1300, 1450],
    recommendation: 'Price trend bullish. Target ₹1550 by Friday.'
  },
  { 
    mandi: 'Agra Mandi', 
    commodity: 'Potato (Laukar)', 
    price: 1380, 
    unit: 'q', 
    trend: 'stable',
    volume: '2,500 MT',
    lastSync: '22 mins ago',
    history: [1380, 1380, 1380],
    recommendation: 'Market arrival steady. Sell 40% stock now.'
  }
];

export const MOCK_SUBSIDIES: SubsidyStatus[] = [
  { 
    schemeName: 'PM-KISAN (14th Installment)', 
    status: 'Disbursed', 
    amount: '₹2,000', 
    grievanceId: 'BK-77210',
    timeline: [
      { step: 'PFMS Approval', date: 'Aug 10', completed: true },
      { step: 'RFT Signed', date: 'Aug 25', completed: true },
      { step: 'Payment Success', date: 'Sep 01', completed: true }
    ]
  },
  { 
    schemeName: 'PMFBY (Kharif Claim)', 
    status: 'Pending', 
    amount: '₹8,400 est.',
    timeline: [
      { step: 'Loss Intimation', date: 'Sep 05', completed: true },
      { step: 'Joint Survey', date: 'Sep 10', completed: true },
      { step: 'Final Approval', date: 'Awaited', completed: false }
    ]
  },
];

export const MOCK_WEATHER: WeatherData = {
  temp: 28,
  condition: 'Clear Sky',
  location: 'Lucknow, UP',
  alert: 'Early Blight Risk',
  severity: 'Medium',
  humidity: '65%',
  windSpeed: '12 km/h',
  recommendation: 'Monitor lower leaves for dark spots. Preventive spray recommended.'
};

export const MOCK_PRIORITIES: PriorityAction[] = [
  { id: '1', label: 'E-KYC Pending (Aadhaar)', type: 'Govt', priority: 'High', icon: 'ShieldCheck' },
  { id: '2', label: 'Update Sowing Area (Khasra)', type: 'Govt', priority: 'Normal', icon: 'FileText' },
];
