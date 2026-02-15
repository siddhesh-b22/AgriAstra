
import { AgriComponent, AgriScheme } from '../types';

export const AGRI_COMPONENTS: AgriComponent[] = [
  // 1. FARM MACHINERY
  {
    id: 'tractor-john-deere',
    name: 'John Deere 5050D (50HP)',
    category: 'Machinery',
    subCategory: 'Tractor',
    description: 'High-performance engine with PowerPro technology, optimized for heavy tillage and haulage.',
    costRange: '₹7.9L - ₹8.4L',
    basePrice: 790000,
    rentalPrice: '₹1200/hr',
    rating: 4.9,
    dealersCount: 42,
    availability: 'In Stock',
    availableInStates: ['National'],
    specs: { power: '50 HP', efficiency: '88%', durability: 'High', techLevel: 'Advanced' },
    aiInsights: { priceTrend: [75, 78, 77, 80, 79], demandForecast: 'High', recommendation: 'Price rising; buy before Rabi season.' },
    images: ['https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=800'],
    relatedSchemes: ['smam-subsidy'],
    // Added missing fields for AgriComponent
    relatedComponents: [],
    maintenanceTips: ['Check oil levels weekly', 'Clean air filters regularly', 'Inspect tire pressure before heavy use'],
    commonProblems: ['Fuel injector clogging', 'Hydraulic leakages in older units'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rotavator-maschio',
    name: 'Maschio Gaspardo Rotavator',
    category: 'Machinery',
    subCategory: 'Rotavator',
    description: 'Multi-speed gearbox rotavator for fine soil preparation in a single pass.',
    costRange: '₹95k - ₹1.2L',
    basePrice: 95000,
    rentalPrice: '₹400/hr',
    rating: 4.7,
    dealersCount: 15,
    availability: 'In Stock',
    availableInStates: ['Uttar Pradesh', 'Punjab', 'Haryana'],
    specs: { efficiency: 'High', durability: 'Extreme', techLevel: 'Standard' },
    aiInsights: { priceTrend: [92, 94, 95, 95, 95], demandForecast: 'Medium', recommendation: 'Steady supply; prices stable.' },
    images: ['https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800'],
    relatedSchemes: ['smam-subsidy'],
    // Added missing fields for AgriComponent
    relatedComponents: ['tractor-john-deere'],
    maintenanceTips: ['Grease moving parts every 20 hours', 'Tighten bolts before use', 'Check blade sharpness'],
    commonProblems: ['Gearbox overheating', 'Blade wear and tear'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'drone-sprayer-agri',
    name: 'Astra-Drone X10 Sprayer',
    category: 'Machinery',
    subCategory: 'Drone Sprayer',
    description: 'Autonomous 10L capacity drone with obstacle avoidance and precision mapping.',
    costRange: '₹4.5L - ₹6.2L',
    basePrice: 450000,
    rentalPrice: '₹500/acre',
    rating: 4.8,
    dealersCount: 5,
    availability: 'Limited',
    availableInStates: ['National'],
    specs: { power: 'Li-Po 22k mAh', efficiency: '99%', durability: 'Medium', techLevel: 'Cutting-Edge' },
    aiInsights: { priceTrend: [50, 48, 47, 46, 45], demandForecast: 'High', recommendation: 'Prices dropping due to new policy incentives.' },
    images: ['https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800'],
    relatedSchemes: ['drone-shakti'],
    // Added missing fields for AgriComponent
    relatedComponents: [],
    maintenanceTips: ['Calibrate GPS before flight', 'Clean nozzles after spray', 'Store batteries in cool dry place'],
    commonProblems: ['Signal interference', 'Nozzle blockage'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },

  // 2. IRRIGATION SYSTEMS
  {
    id: 'drip-jain-irrigation',
    name: 'Jain Drip Inline System',
    category: 'Irrigation',
    subCategory: 'Drip Irrigation',
    description: 'World-class drip system reducing water usage by 70%. Best for cotton and sugarcane.',
    costRange: '₹45k - ₹65k/acre',
    basePrice: 45000,
    rating: 4.6,
    dealersCount: 84,
    availability: 'In Stock',
    availableInStates: ['National'],
    specs: { efficiency: '95% Water Saving', techLevel: 'Advanced' },
    aiInsights: { priceTrend: [40, 42, 43, 44, 45], demandForecast: 'High', recommendation: 'Water scarcity alerts increasing demand.' },
    images: ['https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=800'],
    relatedSchemes: ['pmksy-per-drop'],
    // Added missing fields for AgriComponent
    relatedComponents: ['solar-pump-tata'],
    maintenanceTips: ['Flush system weekly', 'Check for dripper clogging', 'Inspect main line for leaks'],
    commonProblems: ['Salt accumulation in drippers', 'Rat damage to pipes'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'solar-pump-tata',
    name: 'Tata Solar Pump (5HP)',
    category: 'Irrigation',
    subCategory: 'Solar Pumps',
    description: 'Submersible solar pump with high-efficiency PV panels. Zero operational cost.',
    costRange: '₹2.8L - ₹3.5L',
    basePrice: 280000,
    rating: 4.9,
    dealersCount: 12,
    availability: 'In Stock',
    availableInStates: ['National'],
    specs: { power: '5 HP', efficiency: 'Solar Powered', techLevel: 'Cutting-Edge' },
    aiInsights: { priceTrend: [25, 26, 27, 27, 28], demandForecast: 'High', recommendation: 'Best ROI in 3 years with PM-KUSUM.' },
    images: ['https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800'],
    relatedSchemes: ['pm-kusum-scheme'],
    // Added missing fields for AgriComponent
    relatedComponents: ['drip-jain-irrigation'],
    maintenanceTips: ['Clean panels weekly', 'Check wiring connections', 'Protect controller from rain'],
    commonProblems: ['Panel shadowing', 'Inverter failures'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },

  // 3. SEEDS & PLANTING
  {
    id: 'seeds-hybrid-wheat',
    name: 'Kundan Hybrid Wheat (HD2967)',
    category: 'Seeds',
    subCategory: 'Hybrid Seeds',
    description: 'Climate-resilient, high-yield wheat variety. Heat tolerant and rust-resistant.',
    costRange: '₹2400 - ₹2800/quintal',
    basePrice: 2400,
    rating: 4.5,
    dealersCount: 120,
    availability: 'In Stock',
    availableInStates: ['Punjab', 'Haryana', 'UP', 'MP'],
    specs: { efficiency: 'Yield 6.5t/ha', techLevel: 'Advanced' },
    aiInsights: { priceTrend: [20, 21, 23, 24, 24], demandForecast: 'High', recommendation: 'Sowing window starts in 10 days; stock now.' },
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800'],
    relatedSchemes: ['nfsm-seeds'],
    // Added missing fields for AgriComponent
    relatedComponents: [],
    maintenanceTips: ['Store in cool dry place', 'Protect from moisture', 'Check expiry date'],
    commonProblems: ['Germination failure if stored poorly', 'Bird damage after sowing'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },

  // 4. FERTILIZER & SOIL
  {
    id: 'soil-test-kit-pro',
    name: 'SoilHealth-Pro Digital Kit',
    category: 'Fertilizer',
    subCategory: 'Soil Testing Kits',
    description: 'Instant NPK and pH testing with mobile app sync. Avoid over-fertilization.',
    costRange: '₹4,500 - ₹6,000',
    basePrice: 4500,
    rating: 4.7,
    dealersCount: 22,
    availability: 'In Stock',
    availableInStates: ['National'],
    specs: { techLevel: 'Advanced' },
    aiInsights: { priceTrend: [40, 42, 45, 45, 45], demandForecast: 'Medium', recommendation: 'Reduces urea waste by 30%.' },
    images: ['https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200'],
    relatedSchemes: ['soil-health-card'],
    // Added missing fields for AgriComponent
    relatedComponents: [],
    maintenanceTips: ['Calibrate sensors monthly', 'Keep probes clean', 'Update mobile app'],
    commonProblems: ['Battery drain', 'Sensor inaccuracies over time'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },

  // 5. ORGANIC
  {
    id: 'organic-vermicompost-gold',
    name: 'Astra Vermicompost Gold',
    category: 'Organic',
    subCategory: 'Organic Compost',
    description: '100% pure earthworm compost enriched with Neem and Trichoderma.',
    costRange: '₹12 - ₹18/kg',
    basePrice: 12,
    rating: 4.8,
    dealersCount: 55,
    availability: 'In Stock',
    availableInStates: ['National'],
    specs: { efficiency: 'Soil Rejuvenation', techLevel: 'Standard' },
    aiInsights: { priceTrend: [10, 11, 12, 12, 12], demandForecast: 'High', recommendation: 'Growing organic market shift in urban fringes.' },
    images: ['https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800'],
    relatedSchemes: ['pkvy-organic'],
    // Added missing fields for AgriComponent
    relatedComponents: [],
    maintenanceTips: ['Keep in shade', 'Maintain moisture level', 'Apply during morning/evening'],
    commonProblems: ['Drying out if exposed to direct sun', 'Nutrient leaching if overwatered'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  }
];

export const AGRI_SCHEMES: AgriScheme[] = [
  {
    id: 'smam-subsidy',
    schemeName: 'SMAM (Sub-Mission on Agricultural Mechanization)',
    description: 'Financial assistance for procurement of farm machinery.',
    subsidyPercentage: 40,
    eligibility: ['Small/Marginal Indian Farmer', 'Valid land records mapped to Aadhaar'],
    requiredDocuments: ['Aadhaar', 'Khasra/B-1', 'Bank Passbook'],
    applicationProcess: 'Submit quotation via Block Agri Officer.',
    officialLink: 'https://agrimachinery.nic.in',
    relatedComponentIds: ['tractor-john-deere', 'rotavator-maschio']
  },
  {
    id: 'drone-shakti',
    schemeName: 'Drone Shakti Subsidy',
    description: 'Direct subsidy for FPOs and individual farmers to adopt drone tech.',
    subsidyPercentage: 50,
    eligibility: ['Registered FPOs', 'Agriculture Graduates'],
    requiredDocuments: ['FPO Registration', 'Drone Training Certificate'],
    applicationProcess: 'Apply through ICAR Regional Center.',
    officialLink: 'https://pib.gov.in',
    relatedComponentIds: ['drone-sprayer-agri']
  },
  {
    id: 'pmksy-per-drop',
    schemeName: 'PMKSY - Per Drop More Crop',
    description: 'Promotes micro-irrigation systems.',
    subsidyPercentage: 55,
    eligibility: ['All farmers with cultivable land'],
    requiredDocuments: ['Land Record', 'Bank Details'],
    applicationProcess: 'District Horticulture Office verification.',
    officialLink: 'https://pmksy.gov.in',
    relatedComponentIds: ['drip-jain-irrigation']
  },
  {
    id: 'pm-kusum-scheme',
    schemeName: 'PM-KUSUM (Component B)',
    description: 'Standalone solar agriculture pumps subsidy.',
    subsidyPercentage: 60,
    eligibility: ['Farmers from off-grid areas'],
    requiredDocuments: ['Aadhaar', 'Borewell confirmation'],
    applicationProcess: 'Apply via State Renewable Energy Agency.',
    officialLink: 'https://pmkusum.mnre.gov.in',
    relatedComponentIds: ['solar-pump-tata']
  }
];
