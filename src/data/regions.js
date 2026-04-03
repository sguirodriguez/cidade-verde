export const REGIONS = [
  {
    name: 'Nordeste',
    city: {
      name: 'Fortaleza',
      balance: 800,
      turnIncome: 110,
    },
    description: 'Alta irradiação solar e ventos costeiros fortes. Seca frequente no sertão.',
    mults: {
      solar: 1.22,
      wind: 1.08,
      biomass: 0.82,
    },
    events: ['drought', 'heatwave', 'strong_winds', 'investment'],
  },

  {
    name: 'Sul',
    city: {
      name: 'Curitiba',
      balance: 800,
      turnIncome: 115,
    },
    description: 'Ventos intensos no litoral e planalto. Chuvas regulares favorecem biomassa.',
    mults: {
      solar: 0.85,
      wind: 1.14,
      biomass: 1.05,
    },
    events: ['strong_winds', 'cloudy_season', 'investment'],
  },

  {
    name: 'Sudeste',
    city: {
      name: 'São Paulo',
      balance: 800,
      turnIncome: 130,
    },
    description: 'Região equilibrada. Boa biomassa pela agroindústria, solar moderado.',
    mults: {
      solar: 1.0,
      wind: 0.92,
      biomass: 1.08,
    },
    events: ['heatwave', 'cloudy_season', 'drought', 'investment'],
  },

  {
    name: 'Norte',
    city: {
      name: 'Manaus',
      balance: 800,
      turnIncome: 105,
    },
    description: 'Biomassa abundante pela floresta. Solar alto mas frequentemente encoberto.',
    mults: {
      solar: 1.05,
      wind: 0.76,
      biomass: 1.22,
    },
    events: ['drought', 'cloudy_season', 'investment'],
  },
];