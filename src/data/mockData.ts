import type { Standard, AnalysisResult, AnalysisHistoryItem, AnalysisStep, StandardCategory } from '../types';

export const standards: Standard[] = [
  {
    id: 'is-2026-1',
    number: 'IS 2026 (Part 1)',
    title: 'Power Transformers — General',
    description: 'Specifies general requirements for power transformers including ratings, testing, and performance parameters.',
    scope: 'Applies to three-phase and single-phase power transformers, including auto-transformers. Excludes certain specialized transformers like traction and welding transformers.',
    category: 'Electrical',
    status: 'Current',
    latestEdition: '2025',
    yearOfPublication: 2025,
    amendments: [
      { number: '1', year: '2026', description: 'Updated testing tolerances' }
    ],
    normativeReferences: ['IS 2026 (Part 2)', 'IS 2026 (Part 3)', 'IS 335'],
    certification: {
      bisApplicable: true,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Mandatory BIS ISI Mark required under Quality Control Order.'
    },
    keyRequirements: [
      'Must operate continuously at rated MVA under specified conditions.',
      'Terminals and connections must withstand specified short-circuit forces.',
      'Clear definition of cooling methods and corresponding ratings.'
    ],
    procurementGuidance: [
      'Ensure bidders provide valid BIS license documentation.',
      'Specify required cooling type (ONAN, ONAF, etc.) clearly in the tender.',
      'Request type test reports not older than 5 years.'
    ]
  },
  {
    id: 'is-2026-2',
    number: 'IS 2026 (Part 2)',
    title: 'Power Transformers — Temperature Rise',
    description: 'Details the temperature rise limits and testing methods for various parts of power transformers.',
    scope: 'Covers the identification of cooling methods, temperature rise limits, and methods of temperature rise testing for oil-immersed and dry-type transformers.',
    category: 'Electrical',
    status: 'Current',
    latestEdition: '2024',
    yearOfPublication: 2024,
    amendments: [],
    normativeReferences: ['IS 2026 (Part 1)'],
    certification: {
      bisApplicable: true,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Included under the scope of Part 1 certification.'
    },
    keyRequirements: [
      'Top oil temperature rise must not exceed 50°C for standard cooling.',
      'Winding temperature rise measured by resistance must be within 55°C limit.',
      'Hot spot temperature limits must be validated during design.'
    ],
    procurementGuidance: [
      'Specify the maximum ambient temperature of the installation site.',
      'Require temperature rise test certificates for the specific design offered.'
    ]
  },
  {
    id: 'is-2026-3',
    number: 'IS 2026 (Part 3)',
    title: 'Power Transformers — Insulation Levels',
    description: 'Specifies insulation levels, dielectric tests, and external clearances in air.',
    scope: 'Applies to power transformers and details the dielectric test requirements, including lightning impulse and switching impulse tests.',
    category: 'Electrical',
    status: 'Current',
    latestEdition: '2024',
    yearOfPublication: 2024,
    amendments: [],
    normativeReferences: ['IS 2026 (Part 1)', 'IS 2099'],
    certification: {
      bisApplicable: true,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Included under the scope of Part 1 certification.'
    },
    keyRequirements: [
      'Lightning impulse withstand voltage requirements for different system voltages.',
      'Power frequency withstand voltage tests for line and neutral terminals.',
      'Minimum external clearances for bushings in air.'
    ],
    procurementGuidance: [
      'Clearly define the basic insulation level (BIL) required for the system.',
      'Verify that bushing clearances match the environmental conditions (e.g., altitude).'
    ]
  },
  {
    id: 'is-2026-4',
    number: 'IS 2026 (Part 4)',
    title: 'Power Transformers — Tappings and Connections',
    description: 'Covers the requirements for tappings, connections, and phase displacement symbols for transformers.',
    scope: 'Details the specification of tappings for voltage variation, vector groups, and phase displacement for three-phase transformers.',
    category: 'Electrical',
    status: 'Current',
    latestEdition: '2023',
    yearOfPublication: 2023,
    amendments: [],
    normativeReferences: ['IS 2026 (Part 1)'],
    certification: {
      bisApplicable: true,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Included under the scope of Part 1 certification.'
    },
    keyRequirements: [
      'Standardized vector groups (e.g., Dyn11, YNyn0).',
      'Specifications for On-Load Tap Changers (OLTC) and Off-Circuit Tap Changers (OCTC).',
      'Tapping voltage ratios and step sizes.'
    ],
    procurementGuidance: [
      'Specify required vector group for parallel operation with existing network.',
      'Clearly define the tapping range required (e.g., +5% to -10% in steps of 2.5%).'
    ]
  },
  {
    id: 'is-2026-5',
    number: 'IS 2026 (Part 5)',
    title: 'Power Transformers — Ability to Withstand Short Circuit',
    description: 'Requirements for transformers to withstand the thermal and dynamic effects of short circuits.',
    scope: 'Applies to power transformers, detailing the calculation and testing methods for short-circuit withstand capability.',
    category: 'Electrical',
    status: 'Current',
    latestEdition: '2023',
    yearOfPublication: 2023,
    amendments: [],
    normativeReferences: ['IS 2026 (Part 1)'],
    certification: {
      bisApplicable: true,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Included under the scope of Part 1 certification.'
    },
    keyRequirements: [
      'Thermal ability to withstand short-circuit current for 2 seconds.',
      'Dynamic ability to withstand electromagnetic forces during asymmetrical fault currents.',
      'Criteria for successful passing of short-circuit type test.'
    ],
    procurementGuidance: [
      'Short-circuit type test certificate is critical; demand valid reports from NABL accredited labs.',
      'Specify system fault level accurately for correct design.'
    ]
  },
  {
    id: 'is-1180-1',
    number: 'IS 1180 (Part 1)',
    title: 'Outdoor Type Distribution Transformers — General',
    description: 'Standard for outdoor three-phase and single-phase distribution transformers up to 2500 kVA.',
    scope: 'Covers specification, energy efficiency levels, and testing for distribution transformers up to 33 kV system voltage.',
    category: 'Electrical',
    status: 'Current',
    latestEdition: '2024',
    yearOfPublication: 2024,
    amendments: [
      { number: '1', year: '2025', description: 'Revised maximum loss values for Level 2.' }
    ],
    normativeReferences: ['IS 2026 (Part 1)', 'IS 335', 'IS 2099', 'IS 3347'],
    certification: {
      bisApplicable: true,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Mandatory BIS certification. Energy efficiency level marking is required.'
    },
    keyRequirements: [
      'Maximum total losses defined for different Energy Efficiency Levels (Level 1, 2, 3).',
      'Standard impedance values and tolerances.',
      'Fittings and accessories standardization.'
    ],
    procurementGuidance: [
      'Always specify the required Energy Efficiency Level (usually Level 2 or 3).',
      'Ensure the manufacturer has a valid BIS license for the specific rating and level.',
      'Specify the required material for windings (Copper or Aluminum).'
    ]
  },
  {
    id: 'is-2705-1',
    number: 'IS 2705 (Part 1)',
    title: 'Current Transformers — General',
    description: 'General requirements for current transformers used for measurement and protection.',
    scope: 'Applies to newly manufactured current transformers for use with electrical measuring instruments and electrical protective devices.',
    category: 'Electrical',
    status: 'Current',
    latestEdition: '2022',
    yearOfPublication: 2022,
    amendments: [],
    normativeReferences: ['IS 1885'],
    certification: {
      bisApplicable: true,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Mandatory BIS certification.'
    },
    keyRequirements: [
      'Accuracy class specifications for metering and protection.',
      'Short-time current ratings.',
      'Instrument security factor for metering CTs.'
    ],
    procurementGuidance: [
      'Specify correct accuracy class (e.g., 0.2s for tariff metering, 5P20 for protection).',
      'Verify burden requirements match the connected relays/meters.'
    ]
  },
  {
    id: 'is-3156-1',
    number: 'IS 3156 (Part 1)',
    title: 'Voltage Transformers — General',
    description: 'General requirements and testing for inductive voltage transformers.',
    scope: 'Covers voltage transformers for use with electrical measuring instruments and protective devices at frequencies from 15 Hz to 100 Hz.',
    category: 'Electrical',
    status: 'Current',
    latestEdition: '2022',
    yearOfPublication: 2022,
    amendments: [],
    normativeReferences: ['IS 1885'],
    certification: {
      bisApplicable: true,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Mandatory BIS certification.'
    },
    keyRequirements: [
      'Accuracy limits for measuring and protective voltage transformers.',
      'Voltage factors and permissible durations.',
      'Temperature rise limits.'
    ],
    procurementGuidance: [
      'Ensure proper selection of voltage factor (e.g., 1.2 continuous, 1.9 for 8 hours for ungrounded systems).',
      'Specify the required burden and accuracy class.'
    ]
  },
  {
    id: 'is-335',
    number: 'IS 335',
    title: 'New Insulating Oil for Transformers',
    description: 'Specification for uninhibited and inhibited new mineral insulating oils.',
    scope: 'Applies to new insulating oils of petroleum origin for use as an insulating and cooling medium in transformers and switchgears.',
    category: 'Electrical',
    status: 'Current',
    latestEdition: '2023',
    yearOfPublication: 2023,
    amendments: [],
    normativeReferences: [],
    certification: {
      bisApplicable: true,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Mandatory BIS certification for insulating oil.'
    },
    keyRequirements: [
      'Breakdown voltage (BDV) limits for new oil before and after treatment.',
      'Moisture content and dielectric dissipation factor (tan delta) limits.',
      'Oxidation stability requirements.'
    ],
    procurementGuidance: [
      'Specify Type I (uninhibited) or Type II (inhibited) oil based on transformer application.',
      'Transformer manufacturer must source oil from BIS approved vendors.',
      'Require test certificate of oil before filling.'
    ]
  },
  {
    id: 'is-10028-1',
    number: 'IS 10028 (Part 1)',
    title: 'Code of Practice for Installation and Maintenance of Transformers — Installation',
    description: 'Guidelines for safe and proper installation of power and distribution transformers.',
    scope: 'Covers selection, handling, site preparation, and commissioning procedures for transformers.',
    category: 'Electrical',
    status: 'Current',
    latestEdition: '2017',
    yearOfPublication: 2017,
    amendments: [],
    normativeReferences: ['IS 2026 (Part 1)', 'IS 1180 (Part 1)'],
    certification: {
      bisApplicable: false,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Code of practice, no mandatory certification.'
    },
    keyRequirements: [
      'Clearances required around the transformer for safety and maintenance.',
      'Foundation design and oil soak pit requirements.',
      'Pre-commissioning test procedures.'
    ],
    procurementGuidance: [
      'Include compliance with this code as a mandatory requirement for turnkey installation contracts.',
      'Ensure site preparation meets the clearances specified.'
    ]
  },
  {
    id: 'is-10028-2',
    number: 'IS 10028 (Part 2)',
    title: 'Code of Practice for Installation and Maintenance of Transformers — Maintenance',
    description: 'Guidelines for routine and preventive maintenance of transformers in service.',
    scope: 'Provides maintenance schedules, diagnostic testing methods, and troubleshooting for power and distribution transformers.',
    category: 'Electrical',
    status: 'Current',
    latestEdition: '2017',
    yearOfPublication: 2017,
    amendments: [],
    normativeReferences: ['IS 335'],
    certification: {
      bisApplicable: false,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Code of practice, no mandatory certification.'
    },
    keyRequirements: [
      'Periodic inspection schedules for silica gel breather, oil level, and leaks.',
      'Annual testing of oil for BDV and moisture.',
      'Dissolved Gas Analysis (DGA) guidelines for early fault detection.'
    ],
    procurementGuidance: [
      'Reference this code when drafting Annual Maintenance Contracts (AMCs) for substations.',
      'Ensure maintenance contractors follow the recommended testing frequencies.'
    ]
  },
  {
    id: 'is-1885',
    number: 'IS 1885',
    title: 'Electrotechnical Vocabulary',
    description: 'Standard definitions for terms used in electrical engineering.',
    scope: 'Provides a comprehensive glossary of standard terms to ensure uniform terminology in specifications and contracts.',
    category: 'Electrical',
    status: 'Current',
    latestEdition: '2018',
    yearOfPublication: 2018,
    amendments: [],
    normativeReferences: [],
    certification: {
      bisApplicable: false,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Reference standard.'
    },
    keyRequirements: [
      'Standardized terminology for transformers, switchgears, and power systems.'
    ],
    procurementGuidance: [
      'Use standard terms from this vocabulary in tender documents to avoid ambiguity.'
    ]
  },
  {
    id: 'is-2099',
    number: 'IS 2099',
    title: 'Bushings for Alternating Voltages Above 1000 Volts',
    description: 'Specification for porcelain and composite insulators used as bushings.',
    scope: 'Applies to outdoor and indoor bushings used in transformers and switchgears for system voltages above 1 kV.',
    category: 'Electrical',
    status: 'Current',
    latestEdition: '2019',
    yearOfPublication: 2019,
    amendments: [],
    normativeReferences: [],
    certification: {
      bisApplicable: true,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Mandatory BIS certification.'
    },
    keyRequirements: [
      'Creepage distance requirements for different pollution levels.',
      'Dry and wet power frequency withstand tests.',
      'Cantilever strength requirements.'
    ],
    procurementGuidance: [
      'Specify the required creepage distance based on the site pollution severity (e.g., 25 mm/kV or 31 mm/kV).',
      'Ensure bushings have valid BIS marking.'
    ]
  },
  {
    id: 'is-3347',
    number: 'IS 3347',
    title: 'Dimensions for Porcelain Transformer Bushings',
    description: 'Standardized dimensions to ensure interchangeability of transformer bushings.',
    scope: 'Covers dimensional requirements for porcelain bushings up to 36 kV used in distribution and power transformers.',
    category: 'Electrical',
    status: 'Current',
    latestEdition: '2020',
    yearOfPublication: 2020,
    amendments: [],
    normativeReferences: ['IS 2099'],
    certification: {
      bisApplicable: false,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Dimensional standard, often checked alongside IS 2099.'
    },
    keyRequirements: [
      'Standardized metal parts and mounting flanges.',
      'Specific dimensions for stems and terminals.'
    ],
    procurementGuidance: [
      'Compliance ensures spare bushings can be easily procured and replaced in the future.'
    ]
  },
  {
    id: 'is-6600',
    number: 'IS 6600',
    title: 'Guide for Loading of Oil Immersed Transformers',
    description: 'Guidelines on how much a transformer can be overloaded under various conditions without excessive loss of life.',
    scope: 'Provides calculation methods for continuous and emergency overloading of power transformers based on ambient temperature and load cycles.',
    category: 'Electrical',
    status: 'Current',
    latestEdition: '2020',
    yearOfPublication: 2020,
    amendments: [],
    normativeReferences: ['IS 2026 (Part 2)'],
    certification: {
      bisApplicable: false,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Guidance document.'
    },
    keyRequirements: [
      'Formulas for calculating loss of life due to thermal aging.',
      'Permissible limits for hot spot temperature under emergency loading.'
    ],
    procurementGuidance: [
      'Useful for planning department to decide on required capacity based on expected load profiles.'
    ]
  },
  {
    id: 'is-11171',
    number: 'IS 11171',
    title: 'Dry-Type Power Transformers',
    description: 'Specification for cast resin and VPI dry-type transformers.',
    scope: 'Applies to dry-type power transformers, useful for indoor installations where oil fire hazard must be eliminated.',
    category: 'Electrical',
    status: 'Current',
    latestEdition: '2021',
    yearOfPublication: 2021,
    amendments: [],
    normativeReferences: ['IS 2026 (Part 1)'],
    certification: {
      bisApplicable: true,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Mandatory BIS certification.'
    },
    keyRequirements: [
      'Fire behavior classes (e.g., F1) and environmental classes (e.g., E2).',
      'Temperature rise limits for Class F and Class H insulation.',
      'Partial discharge measurement limits.'
    ],
    procurementGuidance: [
      'Prefer dry-type for indoor, commercial, or residential basement installations.',
      'Specify required enclosure protection class (IP rating).'
    ]
  },
  {
    id: 'is-2062',
    number: 'IS 2062',
    title: 'Hot Rolled Low and Medium Tensile Structural Steel',
    description: 'Specification for structural steel used in fabrication.',
    scope: 'Covers steel grades used for general structural purposes, including transformer tanks and mounting structures.',
    category: 'Mechanical',
    status: 'Current',
    latestEdition: '2023',
    yearOfPublication: 2023,
    amendments: [],
    normativeReferences: [],
    certification: {
      bisApplicable: true,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Mandatory BIS certification.'
    },
    keyRequirements: [
      'Chemical composition limits (Carbon, Manganese, etc.).',
      'Mechanical properties like yield stress and tensile strength.',
      'Impact test requirements for certain grades.'
    ],
    procurementGuidance: [
      'Ensure transformer tanks and structural supports are fabricated from IS 2062 compliant steel.',
      'Require mill test certificates for the steel used.'
    ]
  },
  {
    id: 'is-1200',
    number: 'IS 1200',
    title: 'Method of Measurement of Building Works',
    description: 'Standardized methods for measuring construction works for billing.',
    scope: 'Covers the rules for measurement of earthwork, concrete, masonry, etc., useful for substation civil works.',
    category: 'Construction',
    status: 'Current',
    latestEdition: '2019',
    yearOfPublication: 2019,
    amendments: [],
    normativeReferences: [],
    certification: {
      bisApplicable: false,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Measurement standard.'
    },
    keyRequirements: [
      'Uniform rules for taking off quantities.',
      'Units of measurement for different trades.'
    ],
    procurementGuidance: [
      'Reference in civil works BOQ (Bill of Quantities) for substation construction to prevent billing disputes.'
    ]
  },
  {
    id: 'is-875-1',
    number: 'IS 875 (Part 1)',
    title: 'Design Loads for Buildings — Dead Loads',
    description: 'Code of practice for estimating dead loads for structural design.',
    scope: 'Provides unit weights of building materials and stored materials for designing civil structures, including equipment foundations.',
    category: 'Construction',
    status: 'Current',
    latestEdition: '2018',
    yearOfPublication: 2018,
    amendments: [],
    normativeReferences: [],
    certification: {
      bisApplicable: false,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Design code.'
    },
    keyRequirements: [
      'Standard unit weights of concrete, steel, soil, etc.'
    ],
    procurementGuidance: [
      'Relevant for civil design consultants designing transformer foundations.'
    ]
  },
  {
    id: 'is-10500',
    number: 'IS 10500',
    title: 'Drinking Water — Specification',
    description: 'Specification for drinking water quality parameters.',
    scope: 'Prescribes the physical, chemical, and biological requirements for drinking water.',
    category: 'Food',
    status: 'Current',
    latestEdition: '2023',
    yearOfPublication: 2023,
    amendments: [],
    normativeReferences: [],
    certification: {
      bisApplicable: true,
      crsApplicable: false,
      hallmarkingApplicable: false,
      details: 'Mandatory BIS certification for packaged drinking water.'
    },
    keyRequirements: [
      'Limits for heavy metals, pesticides, and microbial contaminants.',
      'Acceptable limits for taste, odor, and color.'
    ],
    procurementGuidance: [
      'Ensure any packaged water procured for government offices holds valid BIS mark under this standard.'
    ]
  }
];

export const mockAnalysisResult: AnalysisResult = {
  id: 'analysis-001',
  input: {
    mode: 'describe',
    description: '50 kVA three-phase oil immersed distribution transformer for 11 kV distribution system'
  },
  summary: 'Based on your specification for a 50 kVA three-phase oil immersed distribution transformer for an 11 kV electrical distribution system, we identified 12 applicable Indian Standards.',
  aiExplanation: 'The primary standard governing this equipment is IS 1180 (Part 1), which makes BIS certification mandatory. Additionally, IS 2026 parts apply for general requirements and testing methods. Associated standards for insulating oil (IS 335), bushings (IS 2099), and installation practices (IS 10028) are also critical for a complete procurement specification.',
  recommendations: [
    {
      standard: standards.find(s => s.id === 'is-1180-1')!,
      relevanceScore: 98,
      relevanceType: 'Primary',
      matchReason: 'Specifically covers outdoor distribution transformers up to 2500 kVA and 33kV.',
      matchedKeywords: ['distribution transformer', 'oil immersed', 'three-phase']
    },
    {
      standard: standards.find(s => s.id === 'is-2026-1')!,
      relevanceScore: 96,
      relevanceType: 'Primary',
      matchReason: 'General requirements for all power and distribution transformers.',
      matchedKeywords: ['transformer', 'three-phase']
    },
    {
      standard: standards.find(s => s.id === 'is-2026-2')!,
      relevanceScore: 92,
      relevanceType: 'Allied',
      matchReason: 'Mandatory for defining temperature rise limits in oil-immersed units.',
      matchedKeywords: ['oil immersed', 'temperature']
    },
    {
      standard: standards.find(s => s.id === 'is-2026-3')!,
      relevanceScore: 90,
      relevanceType: 'Allied',
      matchReason: 'Required for specifying 11 kV system insulation levels.',
      matchedKeywords: ['11 kV', 'insulation']
    },
    {
      standard: standards.find(s => s.id === 'is-335')!,
      relevanceScore: 88,
      relevanceType: 'Allied',
      matchReason: 'Specifies the insulating oil required for the transformer.',
      matchedKeywords: ['oil immersed']
    },
    {
      standard: standards.find(s => s.id === 'is-2026-4')!,
      relevanceScore: 85,
      relevanceType: 'Allied',
      matchReason: 'Required if voltage tappings are needed on the 11kV side.',
      matchedKeywords: ['transformer', '11 kV']
    },
    {
      standard: standards.find(s => s.id === 'is-2026-5')!,
      relevanceScore: 83,
      relevanceType: 'Normative Reference',
      matchReason: 'Referenced by primary standards for short-circuit testing.',
      matchedKeywords: ['transformer']
    },
    {
      standard: standards.find(s => s.id === 'is-2705-1')!,
      relevanceScore: 78,
      relevanceType: 'Allied',
      matchReason: 'Relevant if internal current transformers are specified for protection.',
      matchedKeywords: ['transformer']
    },
    {
      standard: standards.find(s => s.id === 'is-2099')!,
      relevanceScore: 75,
      relevanceType: 'Normative Reference',
      matchReason: 'Referenced for 11kV bushings required on the transformer.',
      matchedKeywords: ['11 kV']
    },
    {
      standard: standards.find(s => s.id === 'is-10028-1')!,
      relevanceScore: 72,
      relevanceType: 'Installation',
      matchReason: 'Guidelines for installing the distribution transformer at site.',
      matchedKeywords: ['distribution transformer']
    },
    {
      standard: standards.find(s => s.id === 'is-3347')!,
      relevanceScore: 68,
      relevanceType: 'Allied',
      matchReason: 'Ensures standard dimensions for 11kV bushings.',
      matchedKeywords: ['11 kV']
    },
    {
      standard: standards.find(s => s.id === 'is-6600')!,
      relevanceScore: 65,
      relevanceType: 'Allied',
      matchReason: 'Guide for loading oil-immersed transformers.',
      matchedKeywords: ['oil immersed', 'transformer']
    }
  ],
  totalStandards: 12,
  highRelevance: 4,
  alliedStandards: 7,
  certificationRequirements: 3,
  procurementChecklist: [
    { label: 'Applicable product standard identified', status: 'pass', detail: 'IS 1180 (Part 1) identified as the primary product standard.' },
    { label: 'Latest edition verified', status: 'pass', detail: 'All recommended standards are current editions.' },
    { label: 'Normative references included', status: 'pass', detail: 'Key normative references IS 2026, IS 335, IS 2099 included.' },
    { label: 'Required testing standards included', status: 'pass', detail: 'Short-circuit test (IS 2026 Part 5) and routine tests covered.' },
    { label: 'Safety requirements included', status: 'pass', detail: 'Insulation levels and temperature rise standards identified.' },
    { label: 'Certification requirements checked', status: 'pass', detail: 'BIS ISI mark mandatory under IS 1180 (Part 1).' },
    { label: 'Installation requirements should be reviewed', status: 'warning', detail: 'IS 10028 (Part 1) recommended for site installation guidance.' }
  ],
  certifications: [
    { name: 'BIS Product Certification', status: 'Applicable', reason: 'Distribution transformers under IS 1180 require mandatory BIS ISI mark. Manufacturers must hold a valid BIS licence.' },
    { name: 'CRS (Compulsory Registration Scheme)', status: 'Not Applicable', reason: 'CRS primarily covers electronic and IT goods. Distribution transformers are not under CRS scope.' },
    { name: 'Hallmarking', status: 'Not Applicable', reason: 'Hallmarking applies to gold, silver, and precious metal articles. Not relevant for electrical equipment.' }
  ],
  createdAt: '2026-09-06T14:30:00+05:30',
  status: 'Completed'
};

export const analysisHistory: AnalysisHistoryItem[] = [
  {
    id: 'hist-1',
    title: 'Distribution Transformer Tender',
    date: '2026-09-06',
    category: 'Electrical',
    standardsFound: 12,
    status: 'Completed'
  },
  {
    id: 'hist-2',
    title: 'Steel Procurement for Bridge',
    date: '2026-09-04',
    category: 'Mechanical',
    standardsFound: 8,
    status: 'Completed'
  },
  {
    id: 'hist-3',
    title: 'Drinking Water Supply Equipment',
    date: '2026-09-02',
    category: 'Food',
    standardsFound: 6,
    status: 'Completed'
  },
  {
    id: 'hist-4',
    title: 'Building Materials - Cement',
    date: '2026-08-28',
    category: 'Construction',
    standardsFound: 9,
    status: 'Completed'
  },
  {
    id: 'hist-5',
    title: 'Solar Panel Procurement',
    date: '2026-08-25',
    category: 'Electrical',
    standardsFound: 11,
    status: 'Completed'
  },
  {
    id: 'hist-6',
    title: 'LED Street Lighting',
    date: '2026-08-20',
    category: 'IT & Electronics',
    standardsFound: 7,
    status: 'Processing'
  }
];

export const analysisSteps: AnalysisStep[] = [
  { label: 'Reading specification', status: 'completed' },
  { label: 'Extracting technical requirements', status: 'completed' },
  { label: 'Matching Indian Standards', status: 'active' },
  { label: 'Checking normative references', status: 'pending' },
  { label: 'Checking amendments and latest versions', status: 'pending' },
  { label: 'Checking certification requirements', status: 'pending' }
];

export const standardCategories: { name: StandardCategory; count: number; icon: string }[] = [
  { name: 'Electrical', count: 45, icon: 'Zap' },
  { name: 'Mechanical', count: 38, icon: 'Wrench' },
  { name: 'Construction', count: 52, icon: 'Building2' },
  { name: 'Food', count: 31, icon: 'Apple' },
  { name: 'Textiles', count: 24, icon: 'Shirt' },
  { name: 'Chemicals', count: 29, icon: 'FlaskConical' },
  { name: 'Consumer Products', count: 33, icon: 'ShoppingBag' },
  { name: 'IT & Electronics', count: 27, icon: 'Cpu' },
  { name: 'Safety', count: 41, icon: 'ShieldCheck' },
  { name: 'Environment', count: 19, icon: 'Leaf' }
];
