export const EVENTS = [
  {
    key: 'drought',
    name: 'Seca prolongada',
    description: 'Escassez de água reduz a eficiência das usinas de biomassa.',
    direction: 'DOWN',
    probability: {
      nordeste: 0.30,
      sul: 0.10,
      sudeste: 0.15,
      norte: 0.20,
    },
    biomassEffect: 0.5,
  },

  {
    key: 'heatwave',
    name: 'Onda de calor',
    description: 'Consumo residencial e industrial dispara com o calor extremo.',
    direction: 'DOWN',
    probability: {
      nordeste: 0.25,
      sul: 0.10,
      sudeste: 0.20,
      norte: 0.15,
    },
    demandBonus: 50,
  },

  {
    key: 'strong_winds',
    name: 'Ventos fortes',
    description: 'Rajadas acima da média aumentam significativamente a geração eólica.',
    direction: 'UP',
    probability: {
      nordeste: 0.15,
      sul: 0.30,
      sudeste: 0.10,
      norte: 0.05,
    },
    windEffect: 1.5,
  },

  {
    key: 'cloudy_season',
    name: 'Período nublado',
    description: 'Cobertura de nuvens persistente reduz a captação solar.',
    direction: 'DOWN',
    probability: {
      nordeste: 0.10,
      sul: 0.25,
      sudeste: 0.20,
      norte: 0.25,
    },
    solarEffect: 0.4,
  },

  {
    key: 'investment',
    name: 'Investimento federal',
    description: 'Programa de incentivo libera verba extra para energia renovável.',
    direction: 'UP',
    probability: {
      nordeste: 0.10,
      sul: 0.10,
      sudeste: 0.10,
      norte: 0.10,
    },
    balanceBonus: 500,
  },
];