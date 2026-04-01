export const REGIONS = [
  {
    name: 'Nordeste',
    city: {
      name: 'Fortaleza',
      balance: 800,
      incomeRate: 1.2
    },
    description: 'Alta irradiação solar e ventos costeiros fortes. Seca frequente no sertão.',
    mults: {
      solar: 1.4,
      wind: 1.2,
      biomass: 0.8,
    },
    events: ['drought', 'heatwave', 'strong_winds', 'investment'],
  },

  {
    name: 'Sul',
    city: {
      name: 'Curitiba',
      balance: 800,
      incomeRate: 1.2
    },
    description: 'Ventos intensos no litoral e planalto. Chuvas regulares favorecem biomassa.',
    mults: {
      solar: 0.8,
      wind: 1.3,
      biomass: 1.1,
    },
    events: ['strong_winds', 'cloudy_season', 'investment'],
  },

  {
    name: 'Sudeste',
    city: {
      name: 'São Paulo',
      balance: 800,
      incomeRate: 1.2
    },
    description: 'Região equilibrada. Boa biomassa pela agroindústria, solar moderado.',
    mults: {
      solar: 1.0,
      wind: 0.9,
      biomass: 1.2,
    },
    events: ['heatwave', 'cloudy_season', 'drought', 'investment'],
  },

  {
    name: 'Norte',
    city: {
      name: 'Manaus',
      balance: 800,
      incomeRate: 1.2
    },
    description: 'Biomassa abundante pela floresta. Solar alto mas frequentemente encoberto.',
    mults: {
      solar: 1.1,
      wind: 0.7,
      biomass: 1.5,
    },
    events: ['drought', 'cloudy_season', 'investment'],
  },
];