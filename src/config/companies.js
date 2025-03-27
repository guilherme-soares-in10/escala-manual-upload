// Company configuration
export const companies = {
  // Company A configuration
  'escala': {
    displayName: 'Escala',
    categories: [
      { text: 'Upload arquivos plano de mídia', category: 'plano-midia' },
      { text: 'Upload arquivos Tunad', category: 'tunad' },
      { text: 'Upload arquivos Logan', category: 'logan' }
    ],
  },
  // Company B configuration
  'olx': {
    displayName: 'OLX',
    categories: [
      { text: 'Conciliação de liquidações', category: 'conciliacao-liquidacoes' },
      { text: 'Payout', category: 'payout' },
      { text: 'Conciliação de transferências', category: 'conciliacao-transferencias' },
    ],
  },
  // Company C configuration
  'company-a': {
    displayName: 'Empresa C',
    categories: [
      { text: 'Upload arquivos plano de mídia', category: 'plano-midia' },
      { text: 'Upload arquivos Tunad', category: 'tunad' },
      { text: 'Upload arquivos Logan', category: 'logan' },
      { text: 'Upload arquivos Company C', category: 'company-c' }
    ],
  },

  'company-b': {
    displayName: 'Empresa B',
    categories: [
      { text: 'Upload arquivos plano de mídia', category: 'plano-midia' },
      { text: 'Upload arquivos Tunad', category: 'tunad' },
      { text: 'Upload arquivos Logan', category: 'logan' },
      { text: 'Upload arquivos Company C', category: 'company-c' }
    ],
  },

  'company-c': {
    displayName: 'Empresa C',
    categories: [
      { text: 'Upload arquivos plano de mídia', category: 'plano-midia' },
      { text: 'Upload arquivos Tunad', category: 'tunad' },
      { text: 'Upload arquivos Logan', category: 'logan' },
      { text: 'Upload arquivos Company C', category: 'company-c' }
    ],
  },

  'company-d': {
    displayName: 'Empresa D',
    categories: [
      { text: 'Upload arquivos plano de mídia', category: 'plano-midia' },
      { text: 'Upload arquivos Tunad', category: 'tunad' },
      { text: 'Upload arquivos Logan', category: 'logan' },
      { text: 'Upload arquivos Company C', category: 'company-c' }
    ],
  },

  'company-e': {
    displayName: 'Empresa E',
    categories: [
      { text: 'Upload arquivos plano de mídia', category: 'plano-midia' },
      { text: 'Upload arquivos Tunad', category: 'tunad' },
      { text: 'Upload arquivos Logan', category: 'logan' },
      { text: 'Upload arquivos Company C', category: 'company-c' }
    ],
  }
  // Add more companies here as needed
};

// Default company configuration for unknown companies
export const defaultCompany = {
  displayName: 'Empresa',
  categories: [
    { text: 'Upload arquivos', category: 'categoria' }
  ],
};

// Helper function to get company configuration
export function getCompanyConfig(companyId) {
  return companies[companyId] || defaultCompany;
} 