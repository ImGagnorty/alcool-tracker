// Formats disponibles par type d'alcool
export const ALCOHOL_FORMATS: Record<string, Array<{ name: string; volume: number }>> = {
  BEER: [
    { name: 'Demi (25cl)', volume: 250 },
    { name: 'Pinte (50cl)', volume: 500 },
    { name: 'Chope (50cl)', volume: 500 },
    { name: 'Bouteille (33cl)', volume: 330 },
    { name: 'Bouteille (50cl)', volume: 500 },
    { name: 'Verre (25cl)', volume: 250 }
  ],
  WINE: [
    { name: 'Verre (12.5cl)', volume: 125 },
    { name: 'Verre (15cl)', volume: 150 },
    { name: 'Pichet 25cl', volume: 250 },
    { name: 'Pichet 50cl', volume: 500 },
    { name: 'Bouteille (75cl)', volume: 750 }
  ],
  CHAMPAGNE: [
    { name: 'Flûte (12cl)', volume: 120 },
    { name: 'Coupe (15cl)', volume: 150 },
    { name: 'Bouteille (75cl)', volume: 750 }
  ],
  VODKA: [
    { name: 'Shot (2cl)', volume: 20 },
    { name: 'Shot (4cl)', volume: 40 },
    { name: 'Verre (6cl)', volume: 60 },
    { name: 'Bouteille (70cl)', volume: 700 }
  ],
  WHISKY: [
    { name: 'Shot (2cl)', volume: 20 },
    { name: 'Shot (4cl)', volume: 40 },
    { name: 'Verre (6cl)', volume: 60 },
    { name: 'Bouteille (70cl)', volume: 700 }
  ],
  RUM: [
    { name: 'Shot (2cl)', volume: 20 },
    { name: 'Shot (4cl)', volume: 40 },
    { name: 'Verre (6cl)', volume: 60 },
    { name: 'Bouteille (70cl)', volume: 700 }
  ],
  GIN: [
    { name: 'Shot (2cl)', volume: 20 },
    { name: 'Shot (4cl)', volume: 40 },
    { name: 'Verre (6cl)', volume: 60 },
    { name: 'Bouteille (70cl)', volume: 700 }
  ],
  TEQUILA: [
    { name: 'Shot (2cl)', volume: 20 },
    { name: 'Shot (4cl)', volume: 40 },
    { name: 'Verre (6cl)', volume: 60 },
    { name: 'Bouteille (70cl)', volume: 700 }
  ],
  COGNAC: [
    { name: 'Shot (2cl)', volume: 20 },
    { name: 'Shot (4cl)', volume: 40 },
    { name: 'Verre (6cl)', volume: 60 },
    { name: 'Bouteille (70cl)', volume: 700 }
  ],
  LIQUEUR: [
    { name: 'Shot (2cl)', volume: 20 },
    { name: 'Shot (4cl)', volume: 40 },
    { name: 'Verre (6cl)', volume: 60 },
    { name: 'Bouteille (70cl)', volume: 700 }
  ],
  CIDER: [
    { name: 'Verre (25cl)', volume: 250 },
    { name: 'Bouteille (75cl)', volume: 750 }
  ],
  OTHER: [
    { name: 'Verre', volume: 150 },
    { name: 'Shot (2cl)', volume: 20 },
    { name: 'Shot (4cl)', volume: 40 }
  ]
};

export function getFormatsForType(type: string) {
  return ALCOHOL_FORMATS[type] || ALCOHOL_FORMATS.OTHER;
}

