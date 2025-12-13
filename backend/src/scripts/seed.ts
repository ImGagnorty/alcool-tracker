import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

async function main() {
  console.log('🌱 Seeding database with alcohols...');

  const alcohols: any[] = [];

  // ========== BIÈRES (100+ références) ==========
  // Bières françaises
  alcohols.push({ name: 'Kronenbourg 1664', brand: 'Kronenbourg', type: 'BEER', alcoholRate: 5.5, sugarRate: 4.2, price: 3.50, volume: 330 });
  alcohols.push({ name: '1664 Blanc', brand: 'Kronenbourg', type: 'BEER', alcoholRate: 5.0, sugarRate: 5.0, price: 3.80, volume: 330 });
  alcohols.push({ name: '1664 Gold', brand: 'Kronenbourg', type: 'BEER', alcoholRate: 5.5, sugarRate: 4.0, price: 3.50, volume: 330 });
  alcohols.push({ name: '1664 Rousse', brand: 'Kronenbourg', type: 'BEER', alcoholRate: 5.5, sugarRate: 4.5, price: 3.50, volume: 330 });
  alcohols.push({ name: 'Pelforth Brune', brand: 'Pelforth', type: 'BEER', alcoholRate: 6.5, sugarRate: 5.0, price: 3.50, volume: 330 });
  alcohols.push({ name: 'Pelforth Blonde', brand: 'Pelforth', type: 'BEER', alcoholRate: 5.8, sugarRate: 4.2, price: 3.50, volume: 330 });
  alcohols.push({ name: 'Desperados', brand: 'Desperados', type: 'BEER', alcoholRate: 5.9, sugarRate: 6.5, price: 3.80, volume: 330 });
  alcohols.push({ name: 'Grimbergen Blonde', brand: 'Grimbergen', type: 'BEER', alcoholRate: 6.7, sugarRate: 4.8, price: 4.50, volume: 330 });
  alcohols.push({ name: 'Grimbergen Ambrée', brand: 'Grimbergen', type: 'BEER', alcoholRate: 6.5, sugarRate: 5.2, price: 4.50, volume: 330 });
  alcohols.push({ name: 'Grimbergen Triple', brand: 'Grimbergen', type: 'BEER', alcoholRate: 9.0, sugarRate: 5.8, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Grimbergen Double Ambrée', brand: 'Grimbergen', type: 'BEER', alcoholRate: 6.5, sugarRate: 5.5, price: 4.50, volume: 330 });

  // Bières belges
  alcohols.push({ name: 'Leffe Blonde', brand: 'Leffe', type: 'BEER', alcoholRate: 6.6, sugarRate: 4.5, price: 4.20, volume: 330 });
  alcohols.push({ name: 'Leffe Brune', brand: 'Leffe', type: 'BEER', alcoholRate: 6.5, sugarRate: 5.2, price: 4.20, volume: 330 });
  alcohols.push({ name: 'Leffe Ruby', brand: 'Leffe', type: 'BEER', alcoholRate: 5.0, sugarRate: 6.0, price: 4.20, volume: 330 });
  alcohols.push({ name: 'Hoegaarden', brand: 'Hoegaarden', type: 'BEER', alcoholRate: 4.9, sugarRate: 4.8, price: 4.00, volume: 330 });
  alcohols.push({ name: 'Hoegaarden Rosée', brand: 'Hoegaarden', type: 'BEER', alcoholRate: 3.0, sugarRate: 5.5, price: 4.00, volume: 330 });
  alcohols.push({ name: 'Duvel', brand: 'Duvel', type: 'BEER', alcoholRate: 8.5, sugarRate: 4.0, price: 5.00, volume: 330 });
  alcohols.push({ name: 'Chimay Bleue', brand: 'Chimay', type: 'BEER', alcoholRate: 9.0, sugarRate: 5.5, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Chimay Rouge', brand: 'Chimay', type: 'BEER', alcoholRate: 7.0, sugarRate: 4.8, price: 5.00, volume: 330 });
  alcohols.push({ name: 'Chimay Triple', brand: 'Chimay', type: 'BEER', alcoholRate: 8.0, sugarRate: 5.0, price: 5.20, volume: 330 });
  alcohols.push({ name: 'Kwak', brand: 'Bosteels', type: 'BEER', alcoholRate: 8.4, sugarRate: 5.0, price: 6.50, volume: 330 });
  alcohols.push({ name: 'Delirium Tremens', brand: 'Huyghe', type: 'BEER', alcoholRate: 8.5, sugarRate: 5.5, price: 7.00, volume: 330 });
  alcohols.push({ name: 'Rochefort 10', brand: 'Rochefort', type: 'BEER', alcoholRate: 11.3, sugarRate: 6.0, price: 8.00, volume: 330 });
  alcohols.push({ name: 'Rochefort 8', brand: 'Rochefort', type: 'BEER', alcoholRate: 9.2, sugarRate: 5.5, price: 7.00, volume: 330 });
  alcohols.push({ name: 'Westmalle Triple', brand: 'Westmalle', type: 'BEER', alcoholRate: 9.5, sugarRate: 4.8, price: 7.00, volume: 330 });
  alcohols.push({ name: 'Westmalle Dubbel', brand: 'Westmalle', type: 'BEER', alcoholRate: 7.0, sugarRate: 5.2, price: 6.50, volume: 330 });
  alcohols.push({ name: 'Orval', brand: 'Orval', type: 'BEER', alcoholRate: 6.2, sugarRate: 3.5, price: 5.50, volume: 330 });
  alcohols.push({ name: 'La Chouffe', brand: 'Achouffe', type: 'BEER', alcoholRate: 8.0, sugarRate: 4.5, price: 6.00, volume: 330 });
  alcohols.push({ name: 'Tripel Karmeliet', brand: 'Bosteels', type: 'BEER', alcoholRate: 8.4, sugarRate: 5.0, price: 7.00, volume: 330 });
  alcohols.push({ name: 'Maredsous 10', brand: 'Duvel Moortgat', type: 'BEER', alcoholRate: 10.0, sugarRate: 5.5, price: 7.50, volume: 330 });
  alcohols.push({ name: 'Maredsous 8', brand: 'Duvel Moortgat', type: 'BEER', alcoholRate: 8.0, sugarRate: 5.0, price: 6.50, volume: 330 });
  alcohols.push({ name: 'Affligem Blonde', brand: 'Affligem', type: 'BEER', alcoholRate: 6.8, sugarRate: 4.5, price: 4.50, volume: 330 });
  alcohols.push({ name: 'Affligem Triple', brand: 'Affligem', type: 'BEER', alcoholRate: 9.5, sugarRate: 5.2, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Kasteel Rouge', brand: 'Kasteel', type: 'BEER', alcoholRate: 8.0, sugarRate: 15.0, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Kasteel Donker', brand: 'Kasteel', type: 'BEER', alcoholRate: 11.0, sugarRate: 6.0, price: 6.00, volume: 330 });
  alcohols.push({ name: 'Gulden Draak', brand: 'Van Steenberge', type: 'BEER', alcoholRate: 10.5, sugarRate: 5.8, price: 6.50, volume: 330 });
  alcohols.push({ name: 'Stella Artois', brand: 'Stella Artois', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 3.30, volume: 330 });
  alcohols.push({ name: 'Jupiler', brand: 'Jupiler', type: 'BEER', alcoholRate: 5.2, sugarRate: 3.6, price: 3.20, volume: 330 });
  alcohols.push({ name: 'Maes', brand: 'Maes', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 3.10, volume: 330 });

  // Bières allemandes
  alcohols.push({ name: 'Weihenstephaner', brand: 'Weihenstephan', type: 'BEER', alcoholRate: 5.4, sugarRate: 3.8, price: 4.50, volume: 500 });
  alcohols.push({ name: 'Paulaner', brand: 'Paulaner', type: 'BEER', alcoholRate: 5.5, sugarRate: 4.0, price: 4.30, volume: 500 });
  alcohols.push({ name: 'Erdinger', brand: 'Erdinger', type: 'BEER', alcoholRate: 5.3, sugarRate: 3.9, price: 4.40, volume: 500 });
  alcohols.push({ name: 'Franziskaner', brand: 'Spaten-Franziskaner', type: 'BEER', alcoholRate: 5.0, sugarRate: 4.2, price: 4.50, volume: 500 });
  alcohols.push({ name: 'Warsteiner', brand: 'Warsteiner', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 4.00, volume: 500 });
  alcohols.push({ name: 'Bitburger', brand: 'Bitburger', type: 'BEER', alcoholRate: 4.8, sugarRate: 3.4, price: 3.90, volume: 500 });
  alcohols.push({ name: 'Krombacher', brand: 'Krombacher', type: 'BEER', alcoholRate: 4.8, sugarRate: 3.5, price: 3.90, volume: 500 });
  alcohols.push({ name: 'Beck\'s', brand: 'Beck\'s', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.6, price: 4.00, volume: 330 });

  // Bières internationales
  alcohols.push({ name: 'Heineken', brand: 'Heineken', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.8, price: 3.30, volume: 330 });
  alcohols.push({ name: 'Corona Extra', brand: 'Corona', type: 'BEER', alcoholRate: 4.5, sugarRate: 3.5, price: 3.50, volume: 330 });
  alcohols.push({ name: 'Budweiser', brand: 'Budweiser', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.2, price: 3.20, volume: 330 });
  alcohols.push({ name: 'Guinness', brand: 'Guinness', type: 'BEER', alcoholRate: 4.2, sugarRate: 3.5, price: 5.00, volume: 500 });
  alcohols.push({ name: 'Carlsberg', brand: 'Carlsberg', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.6, price: 3.40, volume: 330 });
  alcohols.push({ name: 'Tuborg', brand: 'Tuborg', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 3.30, volume: 330 });
  alcohols.push({ name: 'Amstel', brand: 'Amstel', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 3.30, volume: 330 });
  alcohols.push({ name: 'San Miguel', brand: 'San Miguel', type: 'BEER', alcoholRate: 5.4, sugarRate: 3.8, price: 3.50, volume: 330 });
  alcohols.push({ name: 'Peroni', brand: 'Peroni', type: 'BEER', alcoholRate: 5.1, sugarRate: 3.6, price: 3.70, volume: 330 });
  alcohols.push({ name: 'Dos Equis', brand: 'Dos Equis', type: 'BEER', alcoholRate: 4.5, sugarRate: 3.5, price: 4.00, volume: 330 });
  alcohols.push({ name: 'Modelo', brand: 'Modelo', type: 'BEER', alcoholRate: 4.5, sugarRate: 3.4, price: 3.90, volume: 330 });
  alcohols.push({ name: 'Sagres', brand: 'Sagres', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 3.50, volume: 330 });
  alcohols.push({ name: 'Super Bock', brand: 'Super Bock', type: 'BEER', alcoholRate: 5.2, sugarRate: 3.6, price: 3.60, volume: 330 });
  alcohols.push({ name: 'Estrella Damm', brand: 'Estrella', type: 'BEER', alcoholRate: 5.4, sugarRate: 3.7, price: 3.80, volume: 330 });
  alcohols.push({ name: 'Mahou', brand: 'Mahou', type: 'BEER', alcoholRate: 5.5, sugarRate: 3.8, price: 3.70, volume: 330 });
  alcohols.push({ name: 'Moretti', brand: 'Moretti', type: 'BEER', alcoholRate: 4.6, sugarRate: 3.5, price: 3.80, volume: 330 });
  alcohols.push({ name: 'Nastro Azzurro', brand: 'Peroni', type: 'BEER', alcoholRate: 5.1, sugarRate: 3.6, price: 3.90, volume: 330 });
  alcohols.push({ name: 'Asahi', brand: 'Asahi', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.4, price: 4.20, volume: 330 });
  alcohols.push({ name: 'Kirin', brand: 'Kirin', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 4.20, volume: 330 });
  alcohols.push({ name: 'Sapporo', brand: 'Sapporo', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 4.30, volume: 330 });
  alcohols.push({ name: 'Tsingtao', brand: 'Tsingtao', type: 'BEER', alcoholRate: 4.7, sugarRate: 3.3, price: 3.80, volume: 330 });
  
  // Bières françaises artisanales supplémentaires
  alcohols.push({ name: '1664 Blanc', brand: 'Kronenbourg', type: 'BEER', alcoholRate: 5.0, sugarRate: 4.5, price: 4.20, volume: 330 });
  alcohols.push({ name: '1664 Gold', brand: 'Kronenbourg', type: 'BEER', alcoholRate: 5.5, sugarRate: 3.8, price: 4.30, volume: 330 });
  alcohols.push({ name: 'Grimbergen Blonde', brand: 'Grimbergen', type: 'BEER', alcoholRate: 6.7, sugarRate: 4.2, price: 4.80, volume: 330 });
  alcohols.push({ name: 'Grimbergen Double Ambrée', brand: 'Grimbergen', type: 'BEER', alcoholRate: 6.5, sugarRate: 4.5, price: 5.00, volume: 330 });
  alcohols.push({ name: 'Leffe Blonde', brand: 'Leffe', type: 'BEER', alcoholRate: 6.6, sugarRate: 4.0, price: 4.90, volume: 330 });
  alcohols.push({ name: 'Leffe Brune', brand: 'Leffe', type: 'BEER', alcoholRate: 6.5, sugarRate: 4.8, price: 5.00, volume: 330 });
  alcohols.push({ name: 'Hoegaarden', brand: 'Hoegaarden', type: 'BEER', alcoholRate: 4.9, sugarRate: 4.2, price: 4.50, volume: 330 });
  alcohols.push({ name: 'Stella Artois', brand: 'Stella Artois', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 4.00, volume: 330 });
  alcohols.push({ name: 'Jupiler', brand: 'Jupiler', type: 'BEER', alcoholRate: 5.2, sugarRate: 3.6, price: 3.80, volume: 330 });
  alcohols.push({ name: 'Maes', brand: 'Maes', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 3.70, volume: 330 });
  alcohols.push({ name: 'Belle-Vue Kriek', brand: 'Belle-Vue', type: 'BEER', alcoholRate: 4.5, sugarRate: 12.0, price: 4.80, volume: 330 });
  alcohols.push({ name: 'Belle-Vue Framboise', brand: 'Belle-Vue', type: 'BEER', alcoholRate: 4.0, sugarRate: 15.0, price: 4.80, volume: 330 });
  alcohols.push({ name: 'Duvel', brand: 'Duvel', type: 'BEER', alcoholRate: 8.5, sugarRate: 4.0, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Chimay Bleue', brand: 'Chimay', type: 'BEER', alcoholRate: 9.0, sugarRate: 4.5, price: 6.00, volume: 330 });
  alcohols.push({ name: 'Chimay Rouge', brand: 'Chimay', type: 'BEER', alcoholRate: 7.0, sugarRate: 4.2, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Chimay Triple', brand: 'Chimay', type: 'BEER', alcoholRate: 8.0, sugarRate: 4.0, price: 5.80, volume: 330 });
  alcohols.push({ name: 'Orval', brand: 'Orval', type: 'BEER', alcoholRate: 6.2, sugarRate: 3.5, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Rochefort 8', brand: 'Rochefort', type: 'BEER', alcoholRate: 9.2, sugarRate: 4.8, price: 6.20, volume: 330 });
  alcohols.push({ name: 'Rochefort 10', brand: 'Rochefort', type: 'BEER', alcoholRate: 11.3, sugarRate: 5.0, price: 6.50, volume: 330 });
  alcohols.push({ name: 'Westmalle Triple', brand: 'Westmalle', type: 'BEER', alcoholRate: 9.5, sugarRate: 4.2, price: 6.00, volume: 330 });
  alcohols.push({ name: 'Westmalle Dubbel', brand: 'Westmalle', type: 'BEER', alcoholRate: 7.0, sugarRate: 4.5, price: 5.80, volume: 330 });
  alcohols.push({ name: 'La Chouffe', brand: 'La Chouffe', type: 'BEER', alcoholRate: 8.0, sugarRate: 4.0, price: 5.50, volume: 330 });
  alcohols.push({ name: 'McChouffe', brand: 'La Chouffe', type: 'BEER', alcoholRate: 8.0, sugarRate: 4.8, price: 5.80, volume: 330 });
  alcohols.push({ name: 'Kwak', brand: 'Kwak', type: 'BEER', alcoholRate: 8.4, sugarRate: 4.2, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Delirium Tremens', brand: 'Delirium', type: 'BEER', alcoholRate: 8.5, sugarRate: 4.5, price: 6.00, volume: 330 });
  alcohols.push({ name: 'Delirium Red', brand: 'Delirium', type: 'BEER', alcoholRate: 8.0, sugarRate: 12.0, price: 6.20, volume: 330 });
  alcohols.push({ name: 'Kasteel Rouge', brand: 'Kasteel', type: 'BEER', alcoholRate: 8.0, sugarRate: 15.0, price: 6.00, volume: 330 });
  alcohols.push({ name: 'Kasteel Blonde', brand: 'Kasteel', type: 'BEER', alcoholRate: 11.0, sugarRate: 4.5, price: 6.50, volume: 330 });
  alcohols.push({ name: 'Tripel Karmeliet', brand: 'Bosteels', type: 'BEER', alcoholRate: 8.4, sugarRate: 4.0, price: 5.80, volume: 330 });
  alcohols.push({ name: 'Pauwel Kwak', brand: 'Bosteels', type: 'BEER', alcoholRate: 8.4, sugarRate: 4.2, price: 5.50, volume: 330 });
  
  // Bières artisanales françaises
  alcohols.push({ name: 'Coreff', brand: 'Coreff', type: 'BEER', alcoholRate: 4.5, sugarRate: 3.5, price: 4.50, volume: 330 });
  alcohols.push({ name: 'Coreff Ambrée', brand: 'Coreff', type: 'BEER', alcoholRate: 5.0, sugarRate: 4.0, price: 4.80, volume: 330 });
  alcohols.push({ name: 'Bière des Garrigues', brand: 'Brasserie du Mont Blanc', type: 'BEER', alcoholRate: 5.5, sugarRate: 3.8, price: 5.00, volume: 330 });
  alcohols.push({ name: 'La Goudale', brand: 'Goudale', type: 'BEER', alcoholRate: 7.2, sugarRate: 4.2, price: 4.50, volume: 330 });
  alcohols.push({ name: 'Bière de Garde', brand: 'Castelain', type: 'BEER', alcoholRate: 6.4, sugarRate: 4.5, price: 4.80, volume: 330 });
  alcohols.push({ name: 'Bière de Noël', brand: 'Castelain', type: 'BEER', alcoholRate: 7.5, sugarRate: 5.5, price: 5.20, volume: 330 });
  alcohols.push({ name: 'Bière de Printemps', brand: 'Castelain', type: 'BEER', alcoholRate: 6.0, sugarRate: 4.0, price: 4.80, volume: 330 });
  alcohols.push({ name: 'Bière de Mars', brand: 'Castelain', type: 'BEER', alcoholRate: 6.5, sugarRate: 4.2, price: 4.90, volume: 330 });
  alcohols.push({ name: 'Bière de l\'Été', brand: 'Castelain', type: 'BEER', alcoholRate: 5.5, sugarRate: 3.8, price: 4.70, volume: 330 });
  alcohols.push({ name: 'Bière de l\'Automne', brand: 'Castelain', type: 'BEER', alcoholRate: 6.8, sugarRate: 4.5, price: 5.00, volume: 330 });
  
  // Bières allemandes supplémentaires
  alcohols.push({ name: 'Weihenstephaner Hefeweissbier', brand: 'Weihenstephaner', type: 'BEER', alcoholRate: 5.4, sugarRate: 4.2, price: 5.00, volume: 500 });
  alcohols.push({ name: 'Weihenstephaner Vitus', brand: 'Weihenstephaner', type: 'BEER', alcoholRate: 7.7, sugarRate: 4.5, price: 5.50, volume: 500 });
  alcohols.push({ name: 'Ayinger Celebrator', brand: 'Ayinger', type: 'BEER', alcoholRate: 6.7, sugarRate: 4.8, price: 5.80, volume: 330 });
  alcohols.push({ name: 'Ayinger Oktober Fest-Märzen', brand: 'Ayinger', type: 'BEER', alcoholRate: 5.8, sugarRate: 4.0, price: 5.20, volume: 500 });
  alcohols.push({ name: 'Schneider Weisse', brand: 'Schneider', type: 'BEER', alcoholRate: 5.4, sugarRate: 4.2, price: 5.00, volume: 500 });
  alcohols.push({ name: 'Schneider Aventinus', brand: 'Schneider', type: 'BEER', alcoholRate: 8.2, sugarRate: 4.8, price: 5.80, volume: 500 });
  alcohols.push({ name: 'Erdinger Weissbier', brand: 'Erdinger', type: 'BEER', alcoholRate: 5.3, sugarRate: 4.0, price: 4.80, volume: 500 });
  alcohols.push({ name: 'Erdinger Dunkel', brand: 'Erdinger', type: 'BEER', alcoholRate: 5.6, sugarRate: 4.5, price: 4.90, volume: 500 });
  alcohols.push({ name: 'Franziskaner Hefe-Weissbier', brand: 'Franziskaner', type: 'BEER', alcoholRate: 5.0, sugarRate: 4.2, price: 4.80, volume: 500 });
  alcohols.push({ name: 'Franziskaner Dunkel', brand: 'Franziskaner', type: 'BEER', alcoholRate: 5.0, sugarRate: 4.5, price: 4.90, volume: 500 });
  alcohols.push({ name: 'Paulaner Hefe-Weissbier', brand: 'Paulaner', type: 'BEER', alcoholRate: 5.5, sugarRate: 4.2, price: 4.90, volume: 500 });
  alcohols.push({ name: 'Paulaner Oktoberfest', brand: 'Paulaner', type: 'BEER', alcoholRate: 6.0, sugarRate: 4.0, price: 5.20, volume: 500 });
  alcohols.push({ name: 'Hofbräu Original', brand: 'Hofbräu', type: 'BEER', alcoholRate: 5.1, sugarRate: 3.6, price: 4.80, volume: 500 });
  alcohols.push({ name: 'Hofbräu Dunkel', brand: 'Hofbräu', type: 'BEER', alcoholRate: 5.5, sugarRate: 4.0, price: 4.90, volume: 500 });
  alcohols.push({ name: 'Spaten Oktoberfestbier', brand: 'Spaten', type: 'BEER', alcoholRate: 5.9, sugarRate: 4.0, price: 4.90, volume: 500 });
  alcohols.push({ name: 'Spaten Optimator', brand: 'Spaten', type: 'BEER', alcoholRate: 7.6, sugarRate: 4.8, price: 5.50, volume: 500 });
  
  // Bières belges supplémentaires
  alcohols.push({ name: 'Affligem Blonde', brand: 'Affligem', type: 'BEER', alcoholRate: 6.8, sugarRate: 4.0, price: 5.00, volume: 330 });
  alcohols.push({ name: 'Affligem Dubbel', brand: 'Affligem', type: 'BEER', alcoholRate: 6.8, sugarRate: 4.5, price: 5.20, volume: 330 });
  alcohols.push({ name: 'Affligem Tripel', brand: 'Affligem', type: 'BEER', alcoholRate: 8.5, sugarRate: 4.2, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Corsendonk Pater', brand: 'Corsendonk', type: 'BEER', alcoholRate: 5.5, sugarRate: 4.0, price: 5.20, volume: 330 });
  alcohols.push({ name: 'Corsendonk Agnus', brand: 'Corsendonk', type: 'BEER', alcoholRate: 7.5, sugarRate: 4.5, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Gulden Draak', brand: 'Gulden Draak', type: 'BEER', alcoholRate: 10.5, sugarRate: 5.0, price: 6.50, volume: 330 });
  alcohols.push({ name: 'Gulden Draak 9000', brand: 'Gulden Draak', type: 'BEER', alcoholRate: 10.5, sugarRate: 5.5, price: 7.00, volume: 330 });
  alcohols.push({ name: 'St. Bernardus Abt 12', brand: 'St. Bernardus', type: 'BEER', alcoholRate: 10.0, sugarRate: 4.8, price: 6.20, volume: 330 });
  alcohols.push({ name: 'St. Bernardus Tripel', brand: 'St. Bernardus', type: 'BEER', alcoholRate: 8.0, sugarRate: 4.2, price: 5.80, volume: 330 });
  alcohols.push({ name: 'St. Bernardus Pater 6', brand: 'St. Bernardus', type: 'BEER', alcoholRate: 6.7, sugarRate: 4.0, price: 5.20, volume: 330 });
  alcohols.push({ name: 'Maredsous 6', brand: 'Maredsous', type: 'BEER', alcoholRate: 6.0, sugarRate: 4.0, price: 5.00, volume: 330 });
  alcohols.push({ name: 'Maredsous 8', brand: 'Maredsous', type: 'BEER', alcoholRate: 8.0, sugarRate: 4.2, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Maredsous 10', brand: 'Maredsous', type: 'BEER', alcoholRate: 10.0, sugarRate: 4.5, price: 6.00, volume: 330 });
  alcohols.push({ name: 'La Trappe Quadrupel', brand: 'La Trappe', type: 'BEER', alcoholRate: 10.0, sugarRate: 4.8, price: 6.20, volume: 330 });
  alcohols.push({ name: 'La Trappe Tripel', brand: 'La Trappe', type: 'BEER', alcoholRate: 8.0, sugarRate: 4.0, price: 5.50, volume: 330 });
  alcohols.push({ name: 'La Trappe Dubbel', brand: 'La Trappe', type: 'BEER', alcoholRate: 7.0, sugarRate: 4.5, price: 5.20, volume: 330 });
  alcohols.push({ name: 'La Trappe Blond', brand: 'La Trappe', type: 'BEER', alcoholRate: 6.5, sugarRate: 3.8, price: 5.00, volume: 330 });
  
  // Bières américaines craft supplémentaires
  alcohols.push({ name: 'Sierra Nevada Pale Ale', brand: 'Sierra Nevada', type: 'BEER', alcoholRate: 5.6, sugarRate: 3.8, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Sierra Nevada IPA', brand: 'Sierra Nevada', type: 'BEER', alcoholRate: 6.8, sugarRate: 4.2, price: 5.80, volume: 330 });
  alcohols.push({ name: 'Sierra Nevada Torpedo', brand: 'Sierra Nevada', type: 'BEER', alcoholRate: 7.2, sugarRate: 4.5, price: 6.00, volume: 330 });
  alcohols.push({ name: 'Blue Moon', brand: 'Blue Moon', type: 'BEER', alcoholRate: 5.4, sugarRate: 4.2, price: 4.80, volume: 330 });
  alcohols.push({ name: 'Blue Moon Belgian White', brand: 'Blue Moon', type: 'BEER', alcoholRate: 5.4, sugarRate: 4.5, price: 4.90, volume: 330 });
  alcohols.push({ name: 'Samuel Adams Boston Lager', brand: 'Samuel Adams', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.6, price: 4.80, volume: 330 });
  alcohols.push({ name: 'Samuel Adams IPA', brand: 'Samuel Adams', type: 'BEER', alcoholRate: 6.8, sugarRate: 4.2, price: 5.20, volume: 330 });
  alcohols.push({ name: 'Goose Island IPA', brand: 'Goose Island', type: 'BEER', alcoholRate: 5.9, sugarRate: 4.0, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Goose Island 312', brand: 'Goose Island', type: 'BEER', alcoholRate: 4.2, sugarRate: 3.5, price: 4.80, volume: 330 });
  alcohols.push({ name: 'Lagunitas IPA', brand: 'Lagunitas', type: 'BEER', alcoholRate: 6.2, sugarRate: 4.0, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Lagunitas Little Sumpin\' Sumpin\'', brand: 'Lagunitas', type: 'BEER', alcoholRate: 7.5, sugarRate: 4.2, price: 5.80, volume: 330 });
  alcohols.push({ name: 'Stone IPA', brand: 'Stone', type: 'BEER', alcoholRate: 6.9, sugarRate: 4.2, price: 5.80, volume: 330 });
  alcohols.push({ name: 'Stone Arrogant Bastard', brand: 'Stone', type: 'BEER', alcoholRate: 7.2, sugarRate: 4.5, price: 6.00, volume: 330 });
  alcohols.push({ name: 'Dogfish Head 60 Minute IPA', brand: 'Dogfish Head', type: 'BEER', alcoholRate: 6.0, sugarRate: 4.0, price: 5.80, volume: 330 });
  alcohols.push({ name: 'Dogfish Head 90 Minute IPA', brand: 'Dogfish Head', type: 'BEER', alcoholRate: 9.0, sugarRate: 4.5, price: 6.50, volume: 330 });
  
  // Bières anglaises supplémentaires
  alcohols.push({ name: 'Guinness Draught', brand: 'Guinness', type: 'BEER', alcoholRate: 4.2, sugarRate: 4.0, price: 5.00, volume: 500 });
  alcohols.push({ name: 'Guinness Extra Stout', brand: 'Guinness', type: 'BEER', alcoholRate: 5.6, sugarRate: 4.5, price: 5.20, volume: 500 });
  alcohols.push({ name: 'Guinness Foreign Extra', brand: 'Guinness', type: 'BEER', alcoholRate: 7.5, sugarRate: 4.8, price: 5.50, volume: 500 });
  alcohols.push({ name: 'Boddingtons', brand: 'Boddingtons', type: 'BEER', alcoholRate: 3.5, sugarRate: 3.2, price: 4.50, volume: 500 });
  alcohols.push({ name: 'Tetley\'s', brand: 'Tetley\'s', type: 'BEER', alcoholRate: 3.6, sugarRate: 3.3, price: 4.40, volume: 500 });
  alcohols.push({ name: 'John Smith\'s', brand: 'John Smith\'s', type: 'BEER', alcoholRate: 3.8, sugarRate: 3.4, price: 4.50, volume: 500 });
  alcohols.push({ name: 'Old Speckled Hen', brand: 'Morland', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.8, price: 4.80, volume: 500 });
  alcohols.push({ name: 'Hobgoblin', brand: 'Wychwood', type: 'BEER', alcoholRate: 5.2, sugarRate: 4.0, price: 5.00, volume: 500 });
  alcohols.push({ name: 'London Pride', brand: 'Fuller\'s', type: 'BEER', alcoholRate: 4.7, sugarRate: 3.8, price: 4.80, volume: 500 });
  alcohols.push({ name: 'ESB', brand: 'Fuller\'s', type: 'BEER', alcoholRate: 5.9, sugarRate: 4.2, price: 5.20, volume: 500 });
  alcohols.push({ name: 'London Porter', brand: 'Fuller\'s', type: 'BEER', alcoholRate: 5.4, sugarRate: 4.5, price: 5.00, volume: 500 });
  
  // Bières scandinaves
  alcohols.push({ name: 'Carlsberg', brand: 'Carlsberg', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 4.00, volume: 330 });
  alcohols.push({ name: 'Tuborg', brand: 'Tuborg', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.6, price: 4.10, volume: 330 });
  alcohols.push({ name: 'Tuborg Classic', brand: 'Tuborg', type: 'BEER', alcoholRate: 4.6, sugarRate: 3.4, price: 4.00, volume: 330 });
  alcohols.push({ name: 'Tuborg Grøn', brand: 'Tuborg', type: 'BEER', alcoholRate: 4.6, sugarRate: 3.5, price: 4.10, volume: 330 });
  alcohols.push({ name: 'Royal Export', brand: 'Carlsberg', type: 'BEER', alcoholRate: 5.4, sugarRate: 3.7, price: 4.30, volume: 330 });
  alcohols.push({ name: 'Elephant', brand: 'Carlsberg', type: 'BEER', alcoholRate: 7.2, sugarRate: 4.2, price: 4.80, volume: 330 });
  alcohols.push({ name: 'Pripps Blå', brand: 'Pripps', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 4.20, volume: 330 });
  alcohols.push({ name: 'Norrlands Guld', brand: 'Spendrups', type: 'BEER', alcoholRate: 5.3, sugarRate: 3.6, price: 4.30, volume: 330 });
  alcohols.push({ name: 'Mariestads', brand: 'Mariestads', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 4.20, volume: 330 });
  alcohols.push({ name: 'Falcon', brand: 'Falcon', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.6, price: 4.20, volume: 330 });
  
  // Bières italiennes supplémentaires
  alcohols.push({ name: 'Peroni Nastro Azzurro', brand: 'Peroni', type: 'BEER', alcoholRate: 5.1, sugarRate: 3.6, price: 3.90, volume: 330 });
  alcohols.push({ name: 'Peroni Gran Riserva', brand: 'Peroni', type: 'BEER', alcoholRate: 6.6, sugarRate: 4.0, price: 4.80, volume: 330 });
  alcohols.push({ name: 'Nastro Azzurro', brand: 'Peroni', type: 'BEER', alcoholRate: 5.1, sugarRate: 3.6, price: 3.90, volume: 330 });
  alcohols.push({ name: 'Ichnusa', brand: 'Ichnusa', type: 'BEER', alcoholRate: 4.7, sugarRate: 3.4, price: 3.80, volume: 330 });
  alcohols.push({ name: 'Menabrea', brand: 'Menabrea', type: 'BEER', alcoholRate: 4.8, sugarRate: 3.5, price: 4.00, volume: 330 });
  alcohols.push({ name: 'Forst', brand: 'Forst', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.6, price: 4.10, volume: 330 });
  alcohols.push({ name: 'Theresianer', brand: 'Theresianer', type: 'BEER', alcoholRate: 5.2, sugarRate: 3.7, price: 4.20, volume: 330 });
  
  // Bières espagnoles supplémentaires
  alcohols.push({ name: 'Estrella Galicia', brand: 'Estrella Galicia', type: 'BEER', alcoholRate: 5.5, sugarRate: 3.7, price: 3.90, volume: 330 });
  alcohols.push({ name: 'Estrella Damm Inedit', brand: 'Estrella', type: 'BEER', alcoholRate: 4.8, sugarRate: 3.5, price: 4.20, volume: 330 });
  alcohols.push({ name: 'Mahou Cinco Estrellas', brand: 'Mahou', type: 'BEER', alcoholRate: 5.5, sugarRate: 3.8, price: 3.70, volume: 330 });
  alcohols.push({ name: 'Mahou Clásica', brand: 'Mahou', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.6, price: 3.60, volume: 330 });
  alcohols.push({ name: 'San Miguel', brand: 'San Miguel', type: 'BEER', alcoholRate: 5.4, sugarRate: 3.7, price: 3.80, volume: 330 });
  alcohols.push({ name: 'Cruzcampo', brand: 'Cruzcampo', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 3.60, volume: 330 });
  alcohols.push({ name: 'Alhambra', brand: 'Alhambra', type: 'BEER', alcoholRate: 5.4, sugarRate: 3.7, price: 3.80, volume: 330 });
  alcohols.push({ name: 'Voll-Damm', brand: 'Damm', type: 'BEER', alcoholRate: 7.2, sugarRate: 4.2, price: 4.50, volume: 330 });
  alcohols.push({ name: 'Xibeca', brand: 'Damm', type: 'BEER', alcoholRate: 4.6, sugarRate: 3.4, price: 3.50, volume: 330 });
  
  // Bières néerlandaises supplémentaires
  alcohols.push({ name: 'Heineken', brand: 'Heineken', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 3.80, volume: 330 });
  alcohols.push({ name: 'Amstel', brand: 'Amstel', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 3.70, volume: 330 });
  alcohols.push({ name: 'Grolsch', brand: 'Grolsch', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.6, price: 3.90, volume: 330 });
  alcohols.push({ name: 'Grolsch Premium Weizen', brand: 'Grolsch', type: 'BEER', alcoholRate: 5.5, sugarRate: 4.2, price: 4.20, volume: 330 });
  alcohols.push({ name: 'Bavaria', brand: 'Bavaria', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 3.60, volume: 330 });
  alcohols.push({ name: 'Bavaria Premium', brand: 'Bavaria', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.6, price: 3.70, volume: 330 });
  alcohols.push({ name: 'Hertog Jan', brand: 'Hertog Jan', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 3.80, volume: 330 });
  alcohols.push({ name: 'Hertog Jan Grand Prestige', brand: 'Hertog Jan', type: 'BEER', alcoholRate: 10.0, sugarRate: 4.8, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Brand', brand: 'Brand', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 3.80, volume: 330 });
  alcohols.push({ name: 'Brand UP', brand: 'Brand', type: 'BEER', alcoholRate: 5.5, sugarRate: 3.7, price: 4.00, volume: 330 });
  
  // Bières tchèques supplémentaires
  alcohols.push({ name: 'Pilsner Urquell', brand: 'Pilsner Urquell', type: 'BEER', alcoholRate: 4.4, sugarRate: 3.2, price: 4.20, volume: 500 });
  alcohols.push({ name: 'Budweiser Budvar', brand: 'Budweiser Budvar', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 4.50, volume: 500 });
  alcohols.push({ name: 'Kozel Premium', brand: 'Kozel', type: 'BEER', alcoholRate: 4.6, sugarRate: 3.4, price: 4.00, volume: 500 });
  alcohols.push({ name: 'Kozel Dark', brand: 'Kozel', type: 'BEER', alcoholRate: 3.8, sugarRate: 4.0, price: 4.20, volume: 500 });
  alcohols.push({ name: 'Staropramen', brand: 'Staropramen', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 4.30, volume: 500 });
  alcohols.push({ name: 'Gambrinus', brand: 'Gambrinus', type: 'BEER', alcoholRate: 4.0, sugarRate: 3.2, price: 3.80, volume: 500 });
  alcohols.push({ name: 'Bernard', brand: 'Bernard', type: 'BEER', alcoholRate: 4.7, sugarRate: 3.5, price: 4.50, volume: 500 });
  alcohols.push({ name: 'Velkopopovický Kozel', brand: 'Kozel', type: 'BEER', alcoholRate: 4.6, sugarRate: 3.4, price: 4.00, volume: 500 });
  
  // Bières mexicaines supplémentaires
  alcohols.push({ name: 'Corona Extra', brand: 'Corona', type: 'BEER', alcoholRate: 4.5, sugarRate: 3.4, price: 3.90, volume: 330 });
  alcohols.push({ name: 'Corona Light', brand: 'Corona', type: 'BEER', alcoholRate: 3.2, sugarRate: 2.5, price: 3.80, volume: 330 });
  alcohols.push({ name: 'Dos Equis', brand: 'Dos Equis', type: 'BEER', alcoholRate: 4.5, sugarRate: 3.5, price: 3.90, volume: 330 });
  alcohols.push({ name: 'Dos Equis Amber', brand: 'Dos Equis', type: 'BEER', alcoholRate: 4.7, sugarRate: 3.6, price: 4.00, volume: 330 });
  alcohols.push({ name: 'Tecate', brand: 'Tecate', type: 'BEER', alcoholRate: 4.5, sugarRate: 3.4, price: 3.70, volume: 330 });
  alcohols.push({ name: 'Tecate Light', brand: 'Tecate', type: 'BEER', alcoholRate: 3.2, sugarRate: 2.5, price: 3.60, volume: 330 });
  alcohols.push({ name: 'Negra Modelo', brand: 'Modelo', type: 'BEER', alcoholRate: 5.4, sugarRate: 3.8, price: 4.20, volume: 330 });
  alcohols.push({ name: 'Modelo Especial', brand: 'Modelo', type: 'BEER', alcoholRate: 4.5, sugarRate: 3.4, price: 3.90, volume: 330 });
  alcohols.push({ name: 'Pacifico', brand: 'Pacifico', type: 'BEER', alcoholRate: 4.5, sugarRate: 3.5, price: 3.90, volume: 330 });
  alcohols.push({ name: 'Sol', brand: 'Sol', type: 'BEER', alcoholRate: 4.5, sugarRate: 3.4, price: 3.80, volume: 330 });
  alcohols.push({ name: 'Sol Cerveza', brand: 'Sol', type: 'BEER', alcoholRate: 4.5, sugarRate: 3.4, price: 3.80, volume: 330 });
  
  // Bières asiatiques supplémentaires
  alcohols.push({ name: 'Asahi Super Dry', brand: 'Asahi', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.4, price: 4.20, volume: 330 });
  alcohols.push({ name: 'Kirin Ichiban', brand: 'Kirin', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 4.20, volume: 330 });
  alcohols.push({ name: 'Kirin Lager', brand: 'Kirin', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 4.20, volume: 330 });
  alcohols.push({ name: 'Sapporo Premium', brand: 'Sapporo', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 4.30, volume: 330 });
  alcohols.push({ name: 'Sapporo Black Label', brand: 'Sapporo', type: 'BEER', alcoholRate: 5.5, sugarRate: 3.8, price: 4.50, volume: 330 });
  alcohols.push({ name: 'Tsingtao', brand: 'Tsingtao', type: 'BEER', alcoholRate: 4.7, sugarRate: 3.3, price: 3.80, volume: 330 });
  alcohols.push({ name: 'Tsingtao Pure Draft', brand: 'Tsingtao', type: 'BEER', alcoholRate: 4.7, sugarRate: 3.3, price: 3.90, volume: 330 });
  alcohols.push({ name: 'Singha', brand: 'Singha', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.6, price: 4.00, volume: 330 });
  alcohols.push({ name: 'Singha Light', brand: 'Singha', type: 'BEER', alcoholRate: 3.5, sugarRate: 2.8, price: 3.90, volume: 330 });
  alcohols.push({ name: 'Chang', brand: 'Chang', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.7, price: 3.90, volume: 330 });
  alcohols.push({ name: 'Chang Classic', brand: 'Chang', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.7, price: 3.90, volume: 330 });
  alcohols.push({ name: 'Tiger', brand: 'Tiger', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 4.10, volume: 330 });
  alcohols.push({ name: 'Tiger Crystal', brand: 'Tiger', type: 'BEER', alcoholRate: 4.0, sugarRate: 3.0, price: 4.00, volume: 330 });
  alcohols.push({ name: 'Bintang', brand: 'Bintang', type: 'BEER', alcoholRate: 4.7, sugarRate: 3.4, price: 4.00, volume: 330 });
  alcohols.push({ name: 'Bintang Radler', brand: 'Bintang', type: 'BEER', alcoholRate: 2.0, sugarRate: 8.0, price: 4.20, volume: 330 });

  // Bières artisanales / craft
  alcohols.push({ name: 'IPA', brand: 'Craft Beer', type: 'BEER', alcoholRate: 6.5, sugarRate: 4.0, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Double IPA', brand: 'Craft Beer', type: 'BEER', alcoholRate: 8.5, sugarRate: 4.5, price: 6.50, volume: 330 });
  alcohols.push({ name: 'Pale Ale', brand: 'Craft Beer', type: 'BEER', alcoholRate: 5.5, sugarRate: 3.8, price: 5.00, volume: 330 });
  alcohols.push({ name: 'Stout', brand: 'Craft Beer', type: 'BEER', alcoholRate: 5.8, sugarRate: 4.5, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Imperial Stout', brand: 'Craft Beer', type: 'BEER', alcoholRate: 9.0, sugarRate: 5.5, price: 7.00, volume: 330 });
  alcohols.push({ name: 'Wheat Beer', brand: 'Craft Beer', type: 'BEER', alcoholRate: 5.0, sugarRate: 4.2, price: 5.00, volume: 330 });
  alcohols.push({ name: 'Lager', brand: 'Craft Beer', type: 'BEER', alcoholRate: 5.2, sugarRate: 3.6, price: 4.80, volume: 330 });
  alcohols.push({ name: 'Pilsner', brand: 'Craft Beer', type: 'BEER', alcoholRate: 4.8, sugarRate: 3.4, price: 4.80, volume: 330 });
  alcohols.push({ name: 'Amber Ale', brand: 'Craft Beer', type: 'BEER', alcoholRate: 5.8, sugarRate: 4.2, price: 5.20, volume: 330 });
  alcohols.push({ name: 'Porter', brand: 'Craft Beer', type: 'BEER', alcoholRate: 6.0, sugarRate: 4.8, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Sour Beer', brand: 'Craft Beer', type: 'BEER', alcoholRate: 4.5, sugarRate: 3.0, price: 6.00, volume: 330 });
  alcohols.push({ name: 'Saison', brand: 'Craft Beer', type: 'BEER', alcoholRate: 6.5, sugarRate: 4.0, price: 5.80, volume: 330 });
  alcohols.push({ name: 'Berliner Weisse', brand: 'Craft Beer', type: 'BEER', alcoholRate: 3.5, sugarRate: 2.5, price: 5.50, volume: 330 });
  alcohols.push({ name: 'Gose', brand: 'Craft Beer', type: 'BEER', alcoholRate: 4.5, sugarRate: 3.0, price: 5.80, volume: 330 });
  alcohols.push({ name: 'Lambic', brand: 'Craft Beer', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 6.50, volume: 330 });
  alcohols.push({ name: 'Gueuze', brand: 'Craft Beer', type: 'BEER', alcoholRate: 5.5, sugarRate: 3.8, price: 7.00, volume: 330 });
  alcohols.push({ name: 'Framboise', brand: 'Craft Beer', type: 'BEER', alcoholRate: 3.5, sugarRate: 15.0, price: 6.50, volume: 330 });
  alcohols.push({ name: 'Kriek', brand: 'Craft Beer', type: 'BEER', alcoholRate: 4.0, sugarRate: 12.0, price: 6.50, volume: 330 });
  
  // Bières françaises supplémentaires
  alcohols.push({ name: 'Jenlain', brand: 'Jenlain', type: 'BEER', alcoholRate: 7.5, sugarRate: 5.0, price: 4.50, volume: 330 });
  alcohols.push({ name: '3 Monts', brand: '3 Monts', type: 'BEER', alcoholRate: 8.5, sugarRate: 4.5, price: 5.00, volume: 330 });
  alcohols.push({ name: 'Bière de Garde', brand: 'Générique', type: 'BEER', alcoholRate: 6.5, sugarRate: 4.5, price: 4.80, volume: 330 });
  alcohols.push({ name: 'Bière de Noël', brand: 'Générique', type: 'BEER', alcoholRate: 7.0, sugarRate: 5.5, price: 5.20, volume: 330 });
  
  // Bières tchèques
  alcohols.push({ name: 'Pilsner Urquell', brand: 'Pilsner Urquell', type: 'BEER', alcoholRate: 4.4, sugarRate: 3.2, price: 4.20, volume: 500 });
  alcohols.push({ name: 'Budweiser Budvar', brand: 'Budweiser Budvar', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 4.50, volume: 500 });
  alcohols.push({ name: 'Kozel', brand: 'Kozel', type: 'BEER', alcoholRate: 4.6, sugarRate: 3.4, price: 4.00, volume: 500 });
  
  // Bières anglaises
  alcohols.push({ name: 'Newcastle Brown Ale', brand: 'Newcastle', type: 'BEER', alcoholRate: 4.7, sugarRate: 4.0, price: 4.50, volume: 330 });
  alcohols.push({ name: 'Fuller\'s London Pride', brand: 'Fuller\'s', type: 'BEER', alcoholRate: 4.7, sugarRate: 3.8, price: 4.80, volume: 330 });
  alcohols.push({ name: 'Bass', brand: 'Bass', type: 'BEER', alcoholRate: 4.4, sugarRate: 3.5, price: 4.20, volume: 330 });
  
  // Bières irlandaises
  alcohols.push({ name: 'Kilkenny', brand: 'Kilkenny', type: 'BEER', alcoholRate: 4.3, sugarRate: 3.6, price: 4.80, volume: 500 });
  alcohols.push({ name: 'Murphy\'s', brand: 'Murphy\'s', type: 'BEER', alcoholRate: 4.0, sugarRate: 3.5, price: 4.50, volume: 500 });
  alcohols.push({ name: 'Beamish', brand: 'Beamish', type: 'BEER', alcoholRate: 4.1, sugarRate: 3.6, price: 4.50, volume: 500 });
  
  // Bières mexicaines
  alcohols.push({ name: 'Sol', brand: 'Sol', type: 'BEER', alcoholRate: 4.5, sugarRate: 3.4, price: 3.80, volume: 330 });
  alcohols.push({ name: 'Pacifico', brand: 'Pacifico', type: 'BEER', alcoholRate: 4.5, sugarRate: 3.5, price: 3.90, volume: 330 });
  alcohols.push({ name: 'Tecate', brand: 'Tecate', type: 'BEER', alcoholRate: 4.5, sugarRate: 3.4, price: 3.70, volume: 330 });
  
  // Bières asiatiques
  alcohols.push({ name: 'Singha', brand: 'Singha', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.6, price: 4.00, volume: 330 });
  alcohols.push({ name: 'Chang', brand: 'Chang', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.7, price: 3.90, volume: 330 });
  alcohols.push({ name: 'Tiger', brand: 'Tiger', type: 'BEER', alcoholRate: 5.0, sugarRate: 3.5, price: 4.10, volume: 330 });
  alcohols.push({ name: 'Bintang', brand: 'Bintang', type: 'BEER', alcoholRate: 4.7, sugarRate: 3.4, price: 4.00, volume: 330 });

  // ========== VINS ROUGES ==========
  alcohols.push({ name: 'Vin Rouge', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 4.50, volume: 125 });
  alcohols.push({ name: 'Bordeaux Rouge', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Médoc', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Saint-Émilion', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.0, price: 8.50, volume: 125 });
  alcohols.push({ name: 'Pomerol', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.0, price: 9.00, volume: 125 });
  alcohols.push({ name: 'Margaux', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 10.00, volume: 125 });
  alcohols.push({ name: 'Pauillac', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 9.50, volume: 125 });
  alcohols.push({ name: 'Côtes du Rhône', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.5, price: 5.00, volume: 125 });
  alcohols.push({ name: 'Châteauneuf-du-Pape', brand: 'Générique', type: 'WINE', alcoholRate: 14.5, sugarRate: 2.0, price: 10.50, volume: 125 });
  alcohols.push({ name: 'Gigondas', brand: 'Générique', type: 'WINE', alcoholRate: 14.0, sugarRate: 2.2, price: 8.00, volume: 125 });
  alcohols.push({ name: 'Vacqueyras', brand: 'Générique', type: 'WINE', alcoholRate: 14.0, sugarRate: 2.3, price: 7.50, volume: 125 });
  alcohols.push({ name: 'Bourgogne Pinot Noir', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 1.8, price: 8.00, volume: 125 });
  alcohols.push({ name: 'Gevrey-Chambertin', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 1.8, price: 12.00, volume: 125 });
  alcohols.push({ name: 'Nuits-Saint-Georges', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 1.8, price: 11.00, volume: 125 });
  alcohols.push({ name: 'Beaujolais', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 2.0, price: 5.50, volume: 125 });
  alcohols.push({ name: 'Morgon', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Fleurie', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 2.0, price: 7.50, volume: 125 });
  alcohols.push({ name: 'Cahors', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.2, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Madiran', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.0, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Côtes de Provence', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.3, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Bandol', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.2, price: 9.00, volume: 125 });
  alcohols.push({ name: 'Minervois', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Fitou', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.2, price: 5.50, volume: 125 });
  alcohols.push({ name: 'Corbières', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.5, price: 5.50, volume: 125 });
  alcohols.push({ name: 'Côtes du Roussillon', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.5, price: 5.00, volume: 125 });
  alcohols.push({ name: 'Côtes de Gascogne', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 4.50, volume: 125 });
  alcohols.push({ name: 'Merlot', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 5.50, volume: 125 });
  alcohols.push({ name: 'Syrah', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.2, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Malbec', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.3, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Cabernet Sauvignon', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 6.00, volume: 125 });

  // ========== VINS BLANCS ==========
  alcohols.push({ name: 'Vin Blanc', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 1.8, price: 4.50, volume: 125 });
  alcohols.push({ name: 'Sancerre', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 1.5, price: 7.50, volume: 125 });
  alcohols.push({ name: 'Pouilly-Fumé', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 1.5, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Chablis', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 1.5, price: 8.00, volume: 125 });
  alcohols.push({ name: 'Meursault', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 1.8, price: 12.00, volume: 125 });
  alcohols.push({ name: 'Puligny-Montrachet', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 1.8, price: 13.00, volume: 125 });
  alcohols.push({ name: 'Chardonnay', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 5.50, volume: 125 });
  alcohols.push({ name: 'Sauvignon Blanc', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 1.8, price: 5.00, volume: 125 });
  alcohols.push({ name: 'Muscadet', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 4.50, volume: 125 });
  alcohols.push({ name: 'Alsace Riesling', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 8.0, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Gewurztraminer', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 12.0, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Pinot Gris', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 1.8, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Viognier', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Chenin Blanc', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 2.0, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Côtes du Rhône Blanc', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 5.00, volume: 125 });
  alcohols.push({ name: 'Condrieu', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.0, price: 11.00, volume: 125 });
  alcohols.push({ name: 'Hermitage Blanc', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 1.8, price: 14.00, volume: 125 });
  alcohols.push({ name: 'Côte-Rôtie', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.0, price: 15.00, volume: 125 });
  alcohols.push({ name: 'Cornas', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.0, price: 12.00, volume: 125 });
  alcohols.push({ name: 'Crozes-Hermitage', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 8.00, volume: 125 });
  alcohols.push({ name: 'Saint-Joseph', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 9.00, volume: 125 });
  alcohols.push({ name: 'Lirac', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.2, price: 7.50, volume: 125 });
  alcohols.push({ name: 'Costières de Nîmes', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.3, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Faugères', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.2, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Saint-Chinian', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.3, price: 6.80, volume: 125 });
  alcohols.push({ name: 'Pic Saint-Loup', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 2.2, price: 8.50, volume: 125 });
  alcohols.push({ name: 'Luberon', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Ventoux', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.1, price: 5.50, volume: 125 });
  alcohols.push({ name: 'Côtes du Luberon', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Coteaux d\'Aix-en-Provence', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.3, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Coteaux Varois', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.2, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Bellet', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 10.00, volume: 125 });
  alcohols.push({ name: 'Cassis', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 1.8, price: 9.00, volume: 125 });
  alcohols.push({ name: 'Palette', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 11.00, volume: 125 });
  alcohols.push({ name: 'Banyuls', brand: 'Générique', type: 'WINE', alcoholRate: 15.0, sugarRate: 8.0, price: 8.00, volume: 60 });
  alcohols.push({ name: 'Maury', brand: 'Générique', type: 'WINE', alcoholRate: 15.0, sugarRate: 8.0, price: 7.50, volume: 60 });
  alcohols.push({ name: 'Rivesaltes', brand: 'Générique', type: 'WINE', alcoholRate: 15.0, sugarRate: 8.5, price: 7.00, volume: 60 });
  alcohols.push({ name: 'Muscat de Rivesaltes', brand: 'Générique', type: 'WINE', alcoholRate: 15.0, sugarRate: 12.0, price: 7.50, volume: 60 });
  alcohols.push({ name: 'Muscat de Frontignan', brand: 'Générique', type: 'WINE', alcoholRate: 15.0, sugarRate: 12.0, price: 8.00, volume: 60 });
  alcohols.push({ name: 'Muscat de Beaumes-de-Venise', brand: 'Générique', type: 'WINE', alcoholRate: 15.0, sugarRate: 12.0, price: 8.50, volume: 60 });
  alcohols.push({ name: 'Coteaux du Layon', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 8.0, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Quarts de Chaume', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 10.0, price: 12.00, volume: 125 });
  alcohols.push({ name: 'Bonnezeaux', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 9.0, price: 11.00, volume: 125 });
  alcohols.push({ name: 'Coteaux de l\'Aubance', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 8.0, price: 7.50, volume: 125 });
  alcohols.push({ name: 'Jurançon', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 7.0, price: 8.00, volume: 125 });
  alcohols.push({ name: 'Pacherenc du Vic-Bilh', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 7.0, price: 8.50, volume: 125 });
  alcohols.push({ name: 'Monbazillac', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 8.0, price: 9.00, volume: 125 });
  alcohols.push({ name: 'Sauternes', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 10.0, price: 15.00, volume: 125 });
  alcohols.push({ name: 'Barsac', brand: 'Générique', type: 'WINE', alcoholRate: 13.5, sugarRate: 10.0, price: 14.00, volume: 125 });
  alcohols.push({ name: 'Loupiac', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 9.0, price: 10.00, volume: 125 });
  alcohols.push({ name: 'Cadillac', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 8.5, price: 9.50, volume: 125 });
  alcohols.push({ name: 'Cérons', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 8.5, price: 9.00, volume: 125 });
  alcohols.push({ name: 'Ste-Croix-du-Mont', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 9.0, price: 10.00, volume: 125 });
  alcohols.push({ name: 'Coteaux du Loir', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Jasnières', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 1.5, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Coteaux du Vendômois', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Savennières', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 1.8, price: 10.00, volume: 125 });
  alcohols.push({ name: 'Anjou', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 2.0, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Saumur', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Saumur-Champigny', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 2.0, price: 7.50, volume: 125 });
  alcohols.push({ name: 'Chinon', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 2.0, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Bourgueil', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 2.0, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Saint-Nicolas-de-Bourgueil', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 2.0, price: 7.50, volume: 125 });
  alcohols.push({ name: 'Menetou-Salon', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 1.5, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Quincy', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 1.5, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Reuilly', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 1.5, price: 7.50, volume: 125 });
  alcohols.push({ name: 'Valençay', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Cheverny', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Cour-Cheverny', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Coteaux du Giennois', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Orléans', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Coteaux de l\'Aubance', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 8.0, price: 7.50, volume: 125 });
  alcohols.push({ name: 'Coteaux de Saumur', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 8.0, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Haut-Poitou', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 5.50, volume: 125 });
  alcohols.push({ name: 'Fiefs Vendéens', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 2.0, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Gros Plant', brand: 'Générique', type: 'WINE', alcoholRate: 11.5, sugarRate: 1.5, price: 5.00, volume: 125 });
  alcohols.push({ name: 'Muscadet', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 5.50, volume: 125 });
  alcohols.push({ name: 'Muscadet Sèvre et Maine', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Muscadet Côtes de Grandlieu', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 5.80, volume: 125 });
  alcohols.push({ name: 'Muscadet Coteaux de la Loire', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 5.80, volume: 125 });
  alcohols.push({ name: 'Fiefs Vendéens', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 2.0, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Coteaux d\'Ancenis', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Coteaux du Loir', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Coteaux de la Loire', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Coteaux du Layon', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 8.0, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Coteaux de l\'Aubance', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 8.0, price: 7.50, volume: 125 });
  alcohols.push({ name: 'Coteaux de Saumur', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 8.0, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Bonnezeaux', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 9.0, price: 11.00, volume: 125 });
  alcohols.push({ name: 'Quarts de Chaume', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 10.0, price: 12.00, volume: 125 });
  alcohols.push({ name: 'Savennières', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 1.8, price: 10.00, volume: 125 });
  alcohols.push({ name: 'Savennières-Roche-aux-Moines', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 1.8, price: 11.00, volume: 125 });
  alcohols.push({ name: 'Savennières-Coulée-de-Serrant', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 1.8, price: 12.00, volume: 125 });
  alcohols.push({ name: 'Anjou', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 2.0, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Anjou-Villages', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 2.0, price: 7.50, volume: 125 });
  alcohols.push({ name: 'Anjou-Villages Brissac', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 2.0, price: 8.00, volume: 125 });
  alcohols.push({ name: 'Saumur', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Saumur-Champigny', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 2.0, price: 7.50, volume: 125 });
  alcohols.push({ name: 'Chinon', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 2.0, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Bourgueil', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 2.0, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Saint-Nicolas-de-Bourgueil', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 2.0, price: 7.50, volume: 125 });
  alcohols.push({ name: 'Touraine', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 5.50, volume: 125 });
  alcohols.push({ name: 'Touraine-Amboise', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Touraine-Azay-le-Rideau', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Touraine-Mesland', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Touraine-Noble-Joué', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Valençay', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Cheverny', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Cour-Cheverny', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Coteaux du Giennois', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Orléans', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Orléans-Cléry', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Coteaux du Vendômois', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Jasnières', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 1.5, price: 7.00, volume: 125 });
  alcohols.push({ name: 'Coteaux du Loir', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Coteaux de la Loire', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Haut-Poitou', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 5.50, volume: 125 });
  alcohols.push({ name: 'Fiefs Vendéens', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 2.0, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Gros Plant', brand: 'Générique', type: 'WINE', alcoholRate: 11.5, sugarRate: 1.5, price: 5.00, volume: 125 });
  alcohols.push({ name: 'Muscadet', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 5.50, volume: 125 });
  alcohols.push({ name: 'Muscadet Sèvre et Maine', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 6.00, volume: 125 });
  alcohols.push({ name: 'Muscadet Côtes de Grandlieu', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 5.80, volume: 125 });
  alcohols.push({ name: 'Muscadet Coteaux de la Loire', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.5, price: 5.80, volume: 125 });
  alcohols.push({ name: 'Coteaux d\'Ancenis', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 1.8, price: 6.00, volume: 125 });

  // ========== VINS ROSÉS ==========
  alcohols.push({ name: 'Vin Rosé', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 2.5, price: 5.00, volume: 125 });
  alcohols.push({ name: 'Côtes de Provence Rosé', brand: 'Générique', type: 'WINE', alcoholRate: 12.5, sugarRate: 2.5, price: 5.50, volume: 125 });
  alcohols.push({ name: 'Tavel Rosé', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.0, price: 6.50, volume: 125 });
  alcohols.push({ name: 'Bandol Rosé', brand: 'Générique', type: 'WINE', alcoholRate: 13.0, sugarRate: 2.2, price: 7.50, volume: 125 });
  alcohols.push({ name: 'Rosé d\'Anjou', brand: 'Générique', type: 'WINE', alcoholRate: 11.5, sugarRate: 3.0, price: 4.50, volume: 125 });
  alcohols.push({ name: 'Rosé de Loire', brand: 'Générique', type: 'WINE', alcoholRate: 12.0, sugarRate: 2.8, price: 5.00, volume: 125 });

  // ========== CHAMPAGNES ==========
  alcohols.push({ name: 'Champagne', brand: 'Générique', type: 'CHAMPAGNE', alcoholRate: 12.0, sugarRate: 12.0, price: 7.00, volume: 120 });
  alcohols.push({ name: 'Moët & Chandon', brand: 'Moët & Chandon', type: 'CHAMPAGNE', alcoholRate: 12.0, sugarRate: 12.0, price: 12.00, volume: 120 });
  alcohols.push({ name: 'Veuve Clicquot', brand: 'Veuve Clicquot', type: 'CHAMPAGNE', alcoholRate: 12.0, sugarRate: 12.0, price: 13.00, volume: 120 });
  alcohols.push({ name: 'Dom Pérignon', brand: 'Moët & Chandon', type: 'CHAMPAGNE', alcoholRate: 12.5, sugarRate: 6.0, price: 50.00, volume: 120 });
  alcohols.push({ name: 'Laurent-Perrier', brand: 'Laurent-Perrier', type: 'CHAMPAGNE', alcoholRate: 12.0, sugarRate: 12.0, price: 10.00, volume: 120 });
  alcohols.push({ name: 'Taittinger', brand: 'Taittinger', type: 'CHAMPAGNE', alcoholRate: 12.0, sugarRate: 12.0, price: 11.50, volume: 120 });
  alcohols.push({ name: 'Nicolas Feuillatte', brand: 'Nicolas Feuillatte', type: 'CHAMPAGNE', alcoholRate: 12.0, sugarRate: 12.0, price: 7.00, volume: 120 });
  alcohols.push({ name: 'Piper-Heidsieck', brand: 'Piper-Heidsieck', type: 'CHAMPAGNE', alcoholRate: 12.0, sugarRate: 12.0, price: 10.50, volume: 120 });
  alcohols.push({ name: 'Mumm', brand: 'Mumm', type: 'CHAMPAGNE', alcoholRate: 12.0, sugarRate: 12.0, price: 11.00, volume: 120 });
  alcohols.push({ name: 'Perrier-Jouët', brand: 'Perrier-Jouët', type: 'CHAMPAGNE', alcoholRate: 12.0, sugarRate: 12.0, price: 14.00, volume: 120 });
  alcohols.push({ name: 'Bollinger', brand: 'Bollinger', type: 'CHAMPAGNE', alcoholRate: 12.0, sugarRate: 12.0, price: 15.00, volume: 120 });
  alcohols.push({ name: 'Ruinart', brand: 'Ruinart', type: 'CHAMPAGNE', alcoholRate: 12.0, sugarRate: 12.0, price: 16.00, volume: 120 });
  alcohols.push({ name: 'Krug', brand: 'Krug', type: 'CHAMPAGNE', alcoholRate: 12.5, sugarRate: 6.0, price: 55.00, volume: 120 });
  alcohols.push({ name: 'Cristal', brand: 'Louis Roederer', type: 'CHAMPAGNE', alcoholRate: 12.5, sugarRate: 6.0, price: 70.00, volume: 120 });
  alcohols.push({ name: 'Salon', brand: 'Salon', type: 'CHAMPAGNE', alcoholRate: 12.0, sugarRate: 4.0, price: 60.00, volume: 120 });

  // ========== VODKAS ==========
  alcohols.push({ name: 'Vodka', brand: 'Absolut', type: 'VODKA', alcoholRate: 40.0, price: 3.50, volume: 20 });
  alcohols.push({ name: 'Vodka', brand: 'Grey Goose', type: 'VODKA', alcoholRate: 40.0, price: 6.00, volume: 20 });
  alcohols.push({ name: 'Vodka', brand: 'Belvedere', type: 'VODKA', alcoholRate: 40.0, price: 7.00, volume: 20 });
  alcohols.push({ name: 'Vodka', brand: 'Smirnoff', type: 'VODKA', alcoholRate: 37.5, price: 2.50, volume: 20 });
  alcohols.push({ name: 'Vodka', brand: 'Ciroc', type: 'VODKA', alcoholRate: 40.0, price: 5.50, volume: 20 });
  alcohols.push({ name: 'Vodka', brand: 'Ketel One', type: 'VODKA', alcoholRate: 40.0, price: 5.00, volume: 20 });
  alcohols.push({ name: 'Vodka', brand: 'Russian Standard', type: 'VODKA', alcoholRate: 40.0, price: 3.50, volume: 20 });
  alcohols.push({ name: 'Vodka', brand: 'Finlandia', type: 'VODKA', alcoholRate: 40.0, price: 4.00, volume: 20 });
  alcohols.push({ name: 'Vodka', brand: 'Stolichnaya', type: 'VODKA', alcoholRate: 40.0, price: 4.50, volume: 20 });
  alcohols.push({ name: 'Vodka', brand: 'Tito\'s', type: 'VODKA', alcoholRate: 40.0, price: 4.50, volume: 20 });
  alcohols.push({ name: 'Vodka', brand: 'Absolut Citron', type: 'VODKA', alcoholRate: 40.0, price: 3.80, volume: 20 });
  alcohols.push({ name: 'Vodka', brand: 'Absolut Vanilla', type: 'VODKA', alcoholRate: 40.0, price: 3.80, volume: 20 });

  // ========== WHISKIES ==========
  alcohols.push({ name: 'Whisky', brand: 'Jack Daniel\'s', type: 'WHISKY', alcoholRate: 40.0, price: 5.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Johnnie Walker Red Label', type: 'WHISKY', alcoholRate: 40.0, price: 4.50, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Johnnie Walker Black Label', type: 'WHISKY', alcoholRate: 40.0, price: 6.50, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Johnnie Walker Gold Label', type: 'WHISKY', alcoholRate: 40.0, price: 12.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Johnnie Walker Blue Label', type: 'WHISKY', alcoholRate: 40.0, price: 35.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Chivas Regal 12 ans', type: 'WHISKY', alcoholRate: 40.0, price: 6.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Chivas Regal 18 ans', type: 'WHISKY', alcoholRate: 40.0, price: 18.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Ballantine\'s', type: 'WHISKY', alcoholRate: 40.0, price: 3.80, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Jameson', type: 'WHISKY', alcoholRate: 40.0, price: 4.50, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Glenfiddich 12 ans', type: 'WHISKY', alcoholRate: 40.0, price: 7.50, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Glenfiddich 15 ans', type: 'WHISKY', alcoholRate: 40.0, price: 12.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Glenfiddich 18 ans', type: 'WHISKY', alcoholRate: 40.0, price: 20.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Macallan 12 ans', type: 'WHISKY', alcoholRate: 40.0, price: 13.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Macallan 18 ans', type: 'WHISKY', alcoholRate: 43.0, price: 45.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Glenlivet 12 ans', type: 'WHISKY', alcoholRate: 40.0, price: 7.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Glenlivet 18 ans', type: 'WHISKY', alcoholRate: 43.0, price: 22.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Crown Royal', type: 'WHISKY', alcoholRate: 40.0, price: 6.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Jim Beam', type: 'WHISKY', alcoholRate: 40.0, price: 4.20, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Wild Turkey', type: 'WHISKY', alcoholRate: 40.5, price: 5.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Maker\'s Mark', type: 'WHISKY', alcoholRate: 45.0, price: 6.50, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Woodford Reserve', type: 'WHISKY', alcoholRate: 45.2, price: 7.50, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Bulleit Bourbon', type: 'WHISKY', alcoholRate: 45.0, price: 6.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Four Roses', type: 'WHISKY', alcoholRate: 40.0, price: 5.50, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Lagavulin 16 ans', type: 'WHISKY', alcoholRate: 43.0, price: 15.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Laphroaig 10 ans', type: 'WHISKY', alcoholRate: 40.0, price: 8.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Talisker', type: 'WHISKY', alcoholRate: 45.8, price: 9.00, volume: 20 });
  alcohols.push({ name: 'Whisky', brand: 'Ardbeg', type: 'WHISKY', alcoholRate: 46.0, price: 9.50, volume: 20 });

  // ========== RHUMS ==========
  alcohols.push({ name: 'Rhum', brand: 'Bacardi Carta Blanca', type: 'RUM', alcoholRate: 37.5, price: 3.00, volume: 20 });
  alcohols.push({ name: 'Rhum', brand: 'Bacardi Carta Oro', type: 'RUM', alcoholRate: 37.5, price: 3.20, volume: 20 });
  alcohols.push({ name: 'Rhum', brand: 'Havana Club 3 ans', type: 'RUM', alcoholRate: 40.0, price: 3.50, volume: 20 });
  alcohols.push({ name: 'Rhum', brand: 'Havana Club 7 ans', type: 'RUM', alcoholRate: 40.0, price: 5.00, volume: 20 });
  alcohols.push({ name: 'Rhum', brand: 'Captain Morgan', type: 'RUM', alcoholRate: 35.0, price: 3.20, volume: 20 });
  alcohols.push({ name: 'Rhum', brand: 'Malibu', type: 'RUM', alcoholRate: 21.0, sugarRate: 25.0, price: 3.00, volume: 20 });
  alcohols.push({ name: 'Rhum Agricole Blanc', brand: 'Rhum Martinique', type: 'RUM', alcoholRate: 50.0, price: 4.50, volume: 20 });
  alcohols.push({ name: 'Rhum Agricole Vieux', brand: 'Rhum Martinique', type: 'RUM', alcoholRate: 40.0, price: 5.50, volume: 20 });
  alcohols.push({ name: 'Rhum', brand: 'Mount Gay', type: 'RUM', alcoholRate: 43.0, price: 5.20, volume: 20 });
  alcohols.push({ name: 'Rhum', brand: 'Appleton Estate', type: 'RUM', alcoholRate: 40.0, price: 4.80, volume: 20 });
  alcohols.push({ name: 'Rhum', brand: 'Diplomatico', type: 'RUM', alcoholRate: 40.0, price: 6.00, volume: 20 });
  alcohols.push({ name: 'Rhum', brand: 'Zacapa', type: 'RUM', alcoholRate: 40.0, price: 7.00, volume: 20 });
  alcohols.push({ name: 'Rhum', brand: 'El Dorado', type: 'RUM', alcoholRate: 40.0, price: 5.50, volume: 20 });
  alcohols.push({ name: 'Rhum', brand: 'Plantation', type: 'RUM', alcoholRate: 40.0, price: 5.00, volume: 20 });

  // ========== GINS ==========
  alcohols.push({ name: 'Gin', brand: 'Bombay Sapphire', type: 'GIN', alcoholRate: 47.0, price: 4.50, volume: 20 });
  alcohols.push({ name: 'Gin', brand: 'Tanqueray', type: 'GIN', alcoholRate: 47.3, price: 5.00, volume: 20 });
  alcohols.push({ name: 'Gin', brand: 'Hendrick\'s', type: 'GIN', alcoholRate: 44.0, price: 6.50, volume: 20 });
  alcohols.push({ name: 'Gin', brand: 'Gordon\'s', type: 'GIN', alcoholRate: 37.5, price: 2.50, volume: 20 });
  alcohols.push({ name: 'Gin', brand: 'Beefeater', type: 'GIN', alcoholRate: 40.0, price: 3.80, volume: 20 });
  alcohols.push({ name: 'Gin', brand: 'Gin Mare', type: 'GIN', alcoholRate: 42.7, price: 7.00, volume: 20 });
  alcohols.push({ name: 'Gin', brand: 'Monkey 47', type: 'GIN', alcoholRate: 47.0, price: 9.00, volume: 20 });
  alcohols.push({ name: 'Gin', brand: 'Plymouth', type: 'GIN', alcoholRate: 41.2, price: 5.60, volume: 20 });
  alcohols.push({ name: 'Gin', brand: 'Sipsmith', type: 'GIN', alcoholRate: 41.6, price: 6.50, volume: 20 });
  alcohols.push({ name: 'Gin', brand: 'The Botanist', type: 'GIN', alcoholRate: 46.0, price: 7.50, volume: 20 });
  alcohols.push({ name: 'Gin', brand: 'Nordes', type: 'GIN', alcoholRate: 40.0, price: 6.00, volume: 20 });
  alcohols.push({ name: 'Gin', brand: 'Citadelle', type: 'GIN', alcoholRate: 44.0, price: 5.50, volume: 20 });

  // ========== TEQUILAS ==========
  alcohols.push({ name: 'Tequila', brand: 'Jose Cuervo Especial', type: 'TEQUILA', alcoholRate: 38.0, price: 4.00, volume: 20 });
  alcohols.push({ name: 'Tequila', brand: 'Patrón Silver', type: 'TEQUILA', alcoholRate: 40.0, price: 11.00, volume: 20 });
  alcohols.push({ name: 'Tequila', brand: 'Don Julio Blanco', type: 'TEQUILA', alcoholRate: 40.0, price: 9.00, volume: 20 });
  alcohols.push({ name: 'Tequila', brand: 'Don Julio 1942', type: 'TEQUILA', alcoholRate: 40.0, price: 25.00, volume: 20 });
  alcohols.push({ name: 'Tequila', brand: '1800 Tequila', type: 'TEQUILA', alcoholRate: 40.0, price: 5.60, volume: 20 });
  alcohols.push({ name: 'Tequila', brand: 'Sauza Silver', type: 'TEQUILA', alcoholRate: 38.0, price: 3.80, volume: 20 });
  alcohols.push({ name: 'Tequila', brand: 'Herradura', type: 'TEQUILA', alcoholRate: 40.0, price: 7.00, volume: 20 });
  alcohols.push({ name: 'Tequila', brand: 'Casa Dragones', type: 'TEQUILA', alcoholRate: 40.0, price: 18.00, volume: 20 });
  alcohols.push({ name: 'Tequila', brand: 'Clase Azul', type: 'TEQUILA', alcoholRate: 40.0, price: 20.00, volume: 20 });

  // ========== COGNACS ==========
  alcohols.push({ name: 'Cognac', brand: 'Hennessy VS', type: 'COGNAC', alcoholRate: 40.0, price: 7.00, volume: 20 });
  alcohols.push({ name: 'Cognac', brand: 'Hennessy VSOP', type: 'COGNAC', alcoholRate: 40.0, price: 12.00, volume: 20 });
  alcohols.push({ name: 'Cognac', brand: 'Hennessy XO', type: 'COGNAC', alcoholRate: 40.0, price: 36.00, volume: 20 });
  alcohols.push({ name: 'Cognac', brand: 'Rémy Martin VSOP', type: 'COGNAC', alcoholRate: 40.0, price: 10.00, volume: 20 });
  alcohols.push({ name: 'Cognac', brand: 'Rémy Martin XO', type: 'COGNAC', alcoholRate: 40.0, price: 32.00, volume: 20 });
  alcohols.push({ name: 'Cognac', brand: 'Martell VS', type: 'COGNAC', alcoholRate: 40.0, price: 6.50, volume: 20 });
  alcohols.push({ name: 'Cognac', brand: 'Martell VSOP', type: 'COGNAC', alcoholRate: 40.0, price: 11.00, volume: 20 });
  alcohols.push({ name: 'Cognac', brand: 'Martell XO', type: 'COGNAC', alcoholRate: 40.0, price: 30.00, volume: 20 });
  alcohols.push({ name: 'Cognac', brand: 'Courvoisier VSOP', type: 'COGNAC', alcoholRate: 40.0, price: 9.00, volume: 20 });
  alcohols.push({ name: 'Cognac', brand: 'Courvoisier XO', type: 'COGNAC', alcoholRate: 40.0, price: 28.00, volume: 20 });
  alcohols.push({ name: 'Cognac', brand: 'Camus VS', type: 'COGNAC', alcoholRate: 40.0, price: 6.00, volume: 20 });
  alcohols.push({ name: 'Cognac', brand: 'Camus XO', type: 'COGNAC', alcoholRate: 40.0, price: 25.00, volume: 20 });

  // ========== LIQUEURS ==========
  alcohols.push({ name: 'Baileys', brand: 'Baileys', type: 'LIQUEUR', alcoholRate: 17.0, sugarRate: 25.0, price: 3.50, volume: 20 });
  alcohols.push({ name: 'Cointreau', brand: 'Cointreau', type: 'LIQUEUR', alcoholRate: 40.0, sugarRate: 20.0, price: 4.50, volume: 20 });
  alcohols.push({ name: 'Jägermeister', brand: 'Jägermeister', type: 'LIQUEUR', alcoholRate: 35.0, sugarRate: 15.0, price: 4.00, volume: 20 });
  alcohols.push({ name: 'Grand Marnier', brand: 'Grand Marnier', type: 'LIQUEUR', alcoholRate: 40.0, sugarRate: 22.0, price: 5.60, volume: 20 });
  alcohols.push({ name: 'Sambuca', brand: 'Générique', type: 'LIQUEUR', alcoholRate: 38.0, sugarRate: 30.0, price: 3.50, volume: 20 });
  alcohols.push({ name: 'Amaretto Disaronno', brand: 'Disaronno', type: 'LIQUEUR', alcoholRate: 28.0, sugarRate: 28.0, price: 4.20, volume: 20 });
  alcohols.push({ name: 'Chartreuse Verte', brand: 'Chartreuse', type: 'LIQUEUR', alcoholRate: 55.0, sugarRate: 10.0, price: 7.00, volume: 20 });
  alcohols.push({ name: 'Chartreuse Jaune', brand: 'Chartreuse', type: 'LIQUEUR', alcoholRate: 40.0, sugarRate: 15.0, price: 6.50, volume: 20 });
  alcohols.push({ name: 'Limoncello', brand: 'Générique', type: 'LIQUEUR', alcoholRate: 28.0, sugarRate: 32.0, price: 3.00, volume: 20 });
  alcohols.push({ name: 'Kahlúa', brand: 'Kahlúa', type: 'LIQUEUR', alcoholRate: 20.0, sugarRate: 35.0, price: 3.80, volume: 20 });
  alcohols.push({ name: 'Aperol', brand: 'Aperol', type: 'LIQUEUR', alcoholRate: 11.0, sugarRate: 18.0, price: 4.00, volume: 60 });
  alcohols.push({ name: 'Campari', brand: 'Campari', type: 'LIQUEUR', alcoholRate: 25.0, sugarRate: 8.0, price: 4.00, volume: 40 });
  alcohols.push({ name: 'Fernet Branca', brand: 'Fernet Branca', type: 'LIQUEUR', alcoholRate: 39.0, sugarRate: 5.0, price: 4.50, volume: 20 });
  alcohols.push({ name: 'Amarula', brand: 'Amarula', type: 'LIQUEUR', alcoholRate: 17.0, sugarRate: 22.0, price: 4.00, volume: 20 });
  alcohols.push({ name: 'Frangelico', brand: 'Frangelico', type: 'LIQUEUR', alcoholRate: 20.0, sugarRate: 28.0, price: 4.50, volume: 20 });
  alcohols.push({ name: 'Galliano', brand: 'Galliano', type: 'LIQUEUR', alcoholRate: 42.3, sugarRate: 18.0, price: 5.00, volume: 20 });
  alcohols.push({ name: 'Midori', brand: 'Midori', type: 'LIQUEUR', alcoholRate: 20.0, sugarRate: 30.0, price: 4.00, volume: 20 });
  alcohols.push({ name: 'Southern Comfort', brand: 'Southern Comfort', type: 'LIQUEUR', alcoholRate: 35.0, sugarRate: 12.0, price: 4.50, volume: 20 });
  alcohols.push({ name: 'Triple Sec', brand: 'Générique', type: 'LIQUEUR', alcoholRate: 40.0, sugarRate: 20.0, price: 3.50, volume: 20 });
  alcohols.push({ name: 'Blue Curaçao', brand: 'Générique', type: 'LIQUEUR', alcoholRate: 20.0, sugarRate: 25.0, price: 3.50, volume: 20 });
  alcohols.push({ name: 'Peach Schnapps', brand: 'Générique', type: 'LIQUEUR', alcoholRate: 20.0, sugarRate: 28.0, price: 3.50, volume: 20 });
  alcohols.push({ name: 'Raspberry Liqueur', brand: 'Générique', type: 'LIQUEUR', alcoholRate: 20.0, sugarRate: 30.0, price: 3.80, volume: 20 });
  alcohols.push({ name: 'Crème de Menthe', brand: 'Générique', type: 'LIQUEUR', alcoholRate: 25.0, sugarRate: 32.0, price: 3.50, volume: 20 });
  alcohols.push({ name: 'Crème de Cassis', brand: 'Générique', type: 'LIQUEUR', alcoholRate: 16.0, sugarRate: 35.0, price: 3.50, volume: 20 });
  alcohols.push({ name: 'St-Germain', brand: 'St-Germain', type: 'LIQUEUR', alcoholRate: 20.0, sugarRate: 25.0, price: 5.50, volume: 20 });
  alcohols.push({ name: 'Drambuie', brand: 'Drambuie', type: 'LIQUEUR', alcoholRate: 40.0, sugarRate: 18.0, price: 6.00, volume: 20 });
  alcohols.push({ name: 'Bénédictine', brand: 'Bénédictine', type: 'LIQUEUR', alcoholRate: 40.0, sugarRate: 20.0, price: 6.50, volume: 20 });

  // ========== APÉRITIFS ==========
  alcohols.push({ name: 'Pastis 51', brand: 'Pastis 51', type: 'OTHER', alcoholRate: 45.0, sugarRate: 8.0, price: 2.50, volume: 20 });
  alcohols.push({ name: 'Ricard', brand: 'Ricard', type: 'OTHER', alcoholRate: 45.0, sugarRate: 8.0, price: 2.70, volume: 20 });
  alcohols.push({ name: 'Pernod', brand: 'Pernod', type: 'OTHER', alcoholRate: 40.0, sugarRate: 10.0, price: 2.80, volume: 20 });
  alcohols.push({ name: 'Martini', brand: 'Martini', type: 'LIQUEUR', alcoholRate: 15.0, sugarRate: 12.0, price: 3.50, volume: 60 });
  alcohols.push({ name: 'Lillet', brand: 'Lillet', type: 'WINE', alcoholRate: 17.0, sugarRate: 12.0, price: 4.50, volume: 60 });
  alcohols.push({ name: 'Dubonnet', brand: 'Dubonnet', type: 'WINE', alcoholRate: 19.0, sugarRate: 10.0, price: 4.00, volume: 60 });
  alcohols.push({ name: 'Noilly Prat', brand: 'Noilly Prat', type: 'WINE', alcoholRate: 18.0, sugarRate: 8.0, price: 4.20, volume: 60 });
  alcohols.push({ name: 'Porto', brand: 'Générique', type: 'WINE', alcoholRate: 20.0, sugarRate: 10.0, price: 4.50, volume: 60 });
  alcohols.push({ name: 'Porto Ruby', brand: 'Générique', type: 'WINE', alcoholRate: 20.0, sugarRate: 12.0, price: 5.00, volume: 60 });
  alcohols.push({ name: 'Porto Tawny', brand: 'Générique', type: 'WINE', alcoholRate: 20.0, sugarRate: 10.0, price: 5.50, volume: 60 });
  alcohols.push({ name: 'Sherry', brand: 'Générique', type: 'WINE', alcoholRate: 17.0, sugarRate: 5.0, price: 4.00, volume: 60 });
  alcohols.push({ name: 'Vermouth Rouge', brand: 'Générique', type: 'WINE', alcoholRate: 16.0, sugarRate: 15.0, price: 3.50, volume: 60 });
  alcohols.push({ name: 'Vermouth Blanc', brand: 'Générique', type: 'WINE', alcoholRate: 16.0, sugarRate: 18.0, price: 3.50, volume: 60 });

  // ========== CIDRES ==========
  alcohols.push({ name: 'Cidre Doux', brand: 'Normandie', type: 'CIDER', alcoholRate: 2.5, sugarRate: 35.0, price: 4.00, volume: 250 });
  alcohols.push({ name: 'Cidre Brut', brand: 'Normandie', type: 'CIDER', alcoholRate: 4.5, sugarRate: 5.0, price: 4.00, volume: 250 });
  alcohols.push({ name: 'Cidre Bouché', brand: 'Normandie', type: 'CIDER', alcoholRate: 5.0, sugarRate: 8.0, price: 4.50, volume: 250 });
  alcohols.push({ name: 'Cidre de Bretagne', brand: 'Bretagne', type: 'CIDER', alcoholRate: 3.0, sugarRate: 12.0, price: 4.20, volume: 250 });
  alcohols.push({ name: 'Strongbow', brand: 'Strongbow', type: 'CIDER', alcoholRate: 5.0, sugarRate: 4.5, price: 3.50, volume: 250 });
  alcohols.push({ name: 'Magners', brand: 'Magners', type: 'CIDER', alcoholRate: 4.5, sugarRate: 5.0, price: 3.80, volume: 250 });
  alcohols.push({ name: 'Bulmers', brand: 'Bulmers', type: 'CIDER', alcoholRate: 4.5, sugarRate: 5.5, price: 3.70, volume: 250 });

  // ========== AUTRES SPIRITUEUX ==========
  alcohols.push({ name: 'Sake', brand: 'Générique', type: 'OTHER', alcoholRate: 15.0, sugarRate: 5.0, price: 4.00, volume: 180 });
  alcohols.push({ name: 'Soju', brand: 'Générique', type: 'OTHER', alcoholRate: 20.0, sugarRate: 3.0, price: 3.50, volume: 360 });
  alcohols.push({ name: 'Shochu', brand: 'Générique', type: 'OTHER', alcoholRate: 25.0, sugarRate: 2.0, price: 4.50, volume: 180 });
  alcohols.push({ name: 'Absinthe', brand: 'Générique', type: 'OTHER', alcoholRate: 68.0, sugarRate: 0.0, price: 8.00, volume: 20 });
  alcohols.push({ name: 'Grappa', brand: 'Générique', type: 'OTHER', alcoholRate: 40.0, sugarRate: 0.0, price: 5.00, volume: 20 });
  alcohols.push({ name: 'Marc de Bourgogne', brand: 'Générique', type: 'OTHER', alcoholRate: 40.0, sugarRate: 0.0, price: 5.50, volume: 20 });
  alcohols.push({ name: 'Calvados', brand: 'Générique', type: 'OTHER', alcoholRate: 40.0, sugarRate: 2.0, price: 6.00, volume: 20 });
  alcohols.push({ name: 'Armagnac', brand: 'Générique', type: 'OTHER', alcoholRate: 40.0, sugarRate: 0.0, price: 7.00, volume: 20 });
  alcohols.push({ name: 'Poire Williams', brand: 'Générique', type: 'OTHER', alcoholRate: 40.0, sugarRate: 5.0, price: 5.50, volume: 20 });
  alcohols.push({ name: 'Mirabelle', brand: 'Générique', type: 'OTHER', alcoholRate: 40.0, sugarRate: 5.0, price: 5.50, volume: 20 });
  alcohols.push({ name: 'Kirsch', brand: 'Générique', type: 'OTHER', alcoholRate: 40.0, sugarRate: 0.0, price: 5.00, volume: 20 });

  // ========== COCKTAILS ==========
  alcohols.push({ name: 'Mojito', brand: 'Cocktail', type: 'OTHER', alcoholRate: 12.0, sugarRate: 15.0, price: 8.50, volume: 200, description: 'Rhum, menthe, citron vert, eau gazeuse' });
  alcohols.push({ name: 'Piña Colada', brand: 'Cocktail', type: 'OTHER', alcoholRate: 10.0, sugarRate: 20.0, price: 9.00, volume: 250, description: 'Rhum, coco, ananas' });
  alcohols.push({ name: 'Margarita', brand: 'Cocktail', type: 'OTHER', alcoholRate: 15.0, sugarRate: 12.0, price: 9.50, volume: 150, description: 'Tequila, triple sec, citron' });
  alcohols.push({ name: 'Cosmopolitan', brand: 'Cocktail', type: 'OTHER', alcoholRate: 14.0, sugarRate: 18.0, price: 10.00, volume: 150, description: 'Vodka, cranberry, citron' });
  alcohols.push({ name: 'Long Island Iced Tea', brand: 'Cocktail', type: 'OTHER', alcoholRate: 22.0, sugarRate: 12.0, price: 12.00, volume: 250, description: 'Vodka, Gin, Rhum, Tequila, Triple sec, Cola' });
  alcohols.push({ name: 'Martini', brand: 'Cocktail', type: 'OTHER', alcoholRate: 18.0, sugarRate: 2.0, price: 9.00, volume: 100, description: 'Gin, vermouth' });
  alcohols.push({ name: 'Old Fashioned', brand: 'Cocktail', type: 'OTHER', alcoholRate: 20.0, sugarRate: 8.0, price: 10.50, volume: 150, description: 'Whisky, sucre, angostura' });
  alcohols.push({ name: 'Negroni', brand: 'Cocktail', type: 'OTHER', alcoholRate: 16.0, sugarRate: 5.0, price: 9.50, volume: 150, description: 'Gin, vermouth, campari' });
  alcohols.push({ name: 'Daiquiri', brand: 'Cocktail', type: 'OTHER', alcoholRate: 15.0, sugarRate: 12.0, price: 8.50, volume: 120, description: 'Rhum, citron, sucre' });
  alcohols.push({ name: 'Whisky Sour', brand: 'Cocktail', type: 'OTHER', alcoholRate: 18.0, sugarRate: 10.0, price: 9.50, volume: 150, description: 'Whisky, citron, sucre' });
  alcohols.push({ name: 'Bloody Mary', brand: 'Cocktail', type: 'OTHER', alcoholRate: 12.0, sugarRate: 5.0, price: 8.50, volume: 200, description: 'Vodka, jus de tomate, épices' });
  alcohols.push({ name: 'Sex on the Beach', brand: 'Cocktail', type: 'OTHER', alcoholRate: 12.0, sugarRate: 18.0, price: 9.50, volume: 200, description: 'Vodka, Peach schnapps, Jus d\'orange, Cranberry' });
  alcohols.push({ name: 'Tequila Sunrise', brand: 'Cocktail', type: 'OTHER', alcoholRate: 13.0, sugarRate: 15.0, price: 9.00, volume: 200, description: 'Tequila, Jus d\'orange, Grenadine' });
  alcohols.push({ name: 'Blue Lagoon', brand: 'Cocktail', type: 'OTHER', alcoholRate: 14.0, sugarRate: 16.0, price: 9.50, volume: 200, description: 'Vodka, Blue Curaçao, Citron' });
  alcohols.push({ name: 'Mai Tai', brand: 'Cocktail', type: 'OTHER', alcoholRate: 16.0, sugarRate: 14.0, price: 10.50, volume: 200, description: 'Rhum, Triple sec, Jus de citron, Orgeat' });
  alcohols.push({ name: 'Moscow Mule', brand: 'Cocktail', type: 'OTHER', alcoholRate: 12.0, sugarRate: 8.0, price: 9.00, volume: 250, description: 'Vodka, Ginger beer, Citron vert' });
  alcohols.push({ name: 'Caipirinha', brand: 'Cocktail', type: 'OTHER', alcoholRate: 15.0, sugarRate: 12.0, price: 9.50, volume: 200, description: 'Cachaça, Citron vert, Sucre' });
  alcohols.push({ name: 'Caipiroska', brand: 'Cocktail', type: 'OTHER', alcoholRate: 14.0, sugarRate: 12.0, price: 9.50, volume: 200, description: 'Vodka, Citron vert, Sucre' });
  alcohols.push({ name: 'Gin Tonic', brand: 'Cocktail', type: 'OTHER', alcoholRate: 12.0, sugarRate: 8.0, price: 8.50, volume: 250, description: 'Gin, Tonic, Citron' });
  alcohols.push({ name: 'Rhum Tonic', brand: 'Cocktail', type: 'OTHER', alcoholRate: 11.0, sugarRate: 8.0, price: 8.50, volume: 250, description: 'Rhum, Tonic, Citron' });
  alcohols.push({ name: 'Vodka Red Bull', brand: 'Cocktail', type: 'OTHER', alcoholRate: 10.0, sugarRate: 12.0, price: 9.00, volume: 250, description: 'Vodka, Red Bull' });
  alcohols.push({ name: 'Jägerbomb', brand: 'Cocktail', type: 'OTHER', alcoholRate: 8.0, sugarRate: 10.0, price: 8.00, volume: 200, description: 'Jägermeister, Red Bull' });
  alcohols.push({ name: 'Spritz', brand: 'Cocktail', type: 'OTHER', alcoholRate: 11.0, sugarRate: 15.0, price: 8.50, volume: 200, description: 'Prosecco, Aperol, Eau gazeuse' });
  alcohols.push({ name: 'Bellini', brand: 'Cocktail', type: 'OTHER', alcoholRate: 10.0, sugarRate: 14.0, price: 9.00, volume: 150, description: 'Prosecco, Purée de pêche' });
  alcohols.push({ name: 'Mimosa', brand: 'Cocktail', type: 'OTHER', alcoholRate: 9.0, sugarRate: 12.0, price: 8.50, volume: 200, description: 'Champagne, Jus d\'orange' });
  alcohols.push({ name: 'Kir Royal', brand: 'Cocktail', type: 'OTHER', alcoholRate: 11.0, sugarRate: 14.0, price: 8.00, volume: 120, description: 'Champagne, Crème de cassis' });
  alcohols.push({ name: 'French 75', brand: 'Cocktail', type: 'OTHER', alcoholRate: 13.0, sugarRate: 10.0, price: 10.00, volume: 150, description: 'Gin, Champagne, Citron, Sucre' });
  alcohols.push({ name: 'Sidecar', brand: 'Cocktail', type: 'OTHER', alcoholRate: 18.0, sugarRate: 8.0, price: 10.50, volume: 120, description: 'Cognac, Triple sec, Citron' });
  alcohols.push({ name: 'Manhattan', brand: 'Cocktail', type: 'OTHER', alcoholRate: 20.0, sugarRate: 6.0, price: 11.00, volume: 120, description: 'Whisky, Vermouth, Angostura' });
  alcohols.push({ name: 'White Russian', brand: 'Cocktail', type: 'OTHER', alcoholRate: 15.0, sugarRate: 20.0, price: 9.50, volume: 200, description: 'Vodka, Kahlúa, Crème' });
  alcohols.push({ name: 'Black Russian', brand: 'Cocktail', type: 'OTHER', alcoholRate: 20.0, sugarRate: 15.0, price: 9.00, volume: 150, description: 'Vodka, Kahlúa' });
  alcohols.push({ name: 'Tom Collins', brand: 'Cocktail', type: 'OTHER', alcoholRate: 12.0, sugarRate: 10.0, price: 8.50, volume: 250, description: 'Gin, Citron, Sucre, Eau gazeuse' });
  alcohols.push({ name: 'Gin Fizz', brand: 'Cocktail', type: 'OTHER', alcoholRate: 12.0, sugarRate: 10.0, price: 8.50, volume: 200, description: 'Gin, Citron, Sucre, Blanc d\'œuf' });
  alcohols.push({ name: 'Sazerac', brand: 'Cocktail', type: 'OTHER', alcoholRate: 20.0, sugarRate: 5.0, price: 11.50, volume: 120, description: 'Whisky, Absinthe, Sucre, Angostura' });
  alcohols.push({ name: 'Mint Julep', brand: 'Cocktail', type: 'OTHER', alcoholRate: 18.0, sugarRate: 8.0, price: 10.00, volume: 200, description: 'Whisky, Menthe, Sucre' });
  alcohols.push({ name: 'Pisco Sour', brand: 'Cocktail', type: 'OTHER', alcoholRate: 15.0, sugarRate: 10.0, price: 9.50, volume: 150, description: 'Pisco, Citron, Sucre, Blanc d\'œuf' });
  alcohols.push({ name: 'Paloma', brand: 'Cocktail', type: 'OTHER', alcoholRate: 12.0, sugarRate: 10.0, price: 9.00, volume: 250, description: 'Tequila, Pamplemousse, Eau gazeuse' });
  alcohols.push({ name: 'Dark \'n Stormy', brand: 'Cocktail', type: 'OTHER', alcoholRate: 13.0, sugarRate: 8.0, price: 9.00, volume: 250, description: 'Rhum, Ginger beer' });
  alcohols.push({ name: 'Cuba Libre', brand: 'Cocktail', type: 'OTHER', alcoholRate: 11.0, sugarRate: 10.0, price: 8.50, volume: 250, description: 'Rhum, Cola, Citron vert' });

  console.log(`📦 Adding ${alcohols.length} alcohols to database...`);

  let created = 0;
  let skipped = 0;

  for (const alcohol of alcohols) {
    try {
      // Vérifier si l'alcool existe déjà (par nom et marque)
      const existing = await prisma.alcohol.findFirst({
        where: {
          name: alcohol.name,
          brand: alcohol.brand
        }
      });

      if (existing) {
        skipped++;
        continue;
      }

      await prisma.alcohol.create({
        data: alcohol
      });
      created++;
    } catch (error: any) {
      skipped++;
      if (error.code !== 'P2002') {
        console.log(`⚠️  Error adding ${alcohol.name}: ${error.message}`);
      }
    }
  }

  console.log(`✅ Created ${created} new alcohols`);
  if (skipped > 0) {
    console.log(`⏭️  Skipped ${skipped} alcohols (already exist or errors)`);
  }
  console.log(`✨ Seeding completed! Total: ${alcohols.length} alcohols`);
  console.log(`📊 Breakdown:`);
  console.log(`   - Bières: ${alcohols.filter(a => a.type === 'BEER').length}`);
  console.log(`   - Vins: ${alcohols.filter(a => a.type === 'WINE').length}`);
  console.log(`   - Champagnes: ${alcohols.filter(a => a.type === 'CHAMPAGNE').length}`);
  console.log(`   - Spiritueux: ${alcohols.filter(a => ['VODKA', 'WHISKY', 'RUM', 'GIN', 'TEQUILA', 'COGNAC'].includes(a.type)).length}`);
  console.log(`   - Liqueurs: ${alcohols.filter(a => a.type === 'LIQUEUR').length}`);
  console.log(`   - Cocktails: ${alcohols.filter(a => a.brand === 'Cocktail').length}`);
  console.log(`   - Autres: ${alcohols.filter(a => a.type === 'OTHER' && a.brand !== 'Cocktail').length}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
