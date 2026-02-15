
export enum UserRole {
  GUEST = 'GUEST',
  FARMER = 'FARMER',
  BUSINESS = 'BUSINESS'
}

export interface UserAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface UserProfile {
  id: string; 
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  role: UserRole;
  dateOfBirth: string;
  gender: string;
  profileImage?: string;
  address: UserAddress;
  createdAt: string;
  // Added updatedAt field to satisfy ProfileSettings.tsx fix
  updatedAt?: string;
}

export interface AgriFAQ {
  question: string;
  answer: string;
}

export interface AgriComponent {
  id: string;
  name: string;
  category: 'Machinery' | 'Irrigation' | 'Seeds' | 'Fertilizer' | 'Organic' | 'Tools';
  subCategory: string;
  description: string;
  costRange: string;
  basePrice: number;
  rentalPrice?: string;
  rating: number;
  dealersCount: number;
  availability: 'In Stock' | 'Limited' | 'Out of Stock';
  availableInStates: string[];
  specs: {
    power?: string;
    efficiency?: string;
    durability?: string;
    techLevel: 'Standard' | 'Advanced' | 'Cutting-Edge';
  };
  aiInsights: {
    priceTrend: number[]; // Sparkline data points
    demandForecast: 'High' | 'Medium' | 'Low';
    recommendation: string;
  };
  images: string[];
  relatedSchemes: string[];
  // Added relatedComponents, maintenanceTips, and commonProblems fields to satisfy ComponentDetail.tsx fix
  relatedComponents: string[];
  maintenanceTips: string[];
  commonProblems: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AgriScheme {
  id: string;
  schemeName: string;
  description: string;
  subsidyPercentage: number;
  stateRestriction?: string; // 'National' or specific State
  eligibility: string[];
  requiredDocuments: string[];
  applicationProcess: string;
  officialLink: string;
  contactDetails?: string;
  relatedComponentIds: string[];
}

export interface CropStage {
  stage: string;
  duration: string;
  status: 'completed' | 'current' | 'upcoming';
  tasks: string[];
}

export interface MandiPrice {
  mandi: string;
  commodity: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  history?: number[];
  recommendation?: string;
  volume: string;
  lastSync: string;
}

export interface SubsidyStatus {
  schemeName: string;
  status: 'Approved' | 'Pending' | 'Disbursed' | 'Rejected';
  amount: string;
  grievanceId?: string;
  timeline: { step: string; date: string; completed: boolean }[];
}

export interface WeatherData {
  temp: number;
  condition: string;
  location: string;
  alert?: string;
  severity: 'Low' | 'Medium' | 'High';
  recommendation: string;
  humidity: string;
  windSpeed: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface PriorityAction {
  id: string;
  label: string;
  type: 'Market' | 'Advisory' | 'Govt';
  priority: 'High' | 'Normal';
  icon: string;
}
