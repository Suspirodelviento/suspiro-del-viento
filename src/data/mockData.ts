import { Producer, Product, EduArticle, PreparationInfo } from '../types';

export const PRODUCERS: Producer[] = [
  {
    id: 'finca-el-sol',
    name: 'Finca El Sol & Biodinámica',
    tagline: 'Cultivating living soils at the foot of the Andes mountains',
    region: 'Uco Valley',
    location: 'Vista Flores, Tunuyán, Mendoza',
    coordinates: { lat: -33.6401, lng: -69.1724 },
    yearsFarming: 18,
    certification: 'Demeter Certified Biodynamic (100%)',
    story: 'Founded in 2006 by the Mendoza family, Finca El Sol turned 45 hectares of high-altitude gravel soil into a self-sustaining agricultural sanctuary. Here, cows, horses, wild lavender, and olive trees co-exist with heritage vines.',
    philosophy: 'Treating the farm as a single, living organism that breathes with cosmic cycles and heals its own soil naturally.',
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600',
    portraitImage: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800'
    ],
    practices: [
      'On-site compost preparation using horn manure (Prep 500)',
      '100% manual harvest in accordance with lunar phases',
      'Zero synthetic pesticides or artificial irrigation additives',
      'Native flora cover crops for nitrogen fixing and pollinator habitat'
    ],
    sizeHectares: 45,
    familyHistory: '3 generations of agrarian heritage in Tunuyán, transitioning fully to Demeter certified biodynamic methods in 2011.'
  },
  {
    id: 'chacra-uco-organica',
    name: 'Chacra Organica del Uco',
    tagline: 'Artisanal heirloom crops and raw Andean mountain honey',
    region: 'Valle de Uco',
    location: 'Gualtallary, Tupungato, Mendoza',
    coordinates: { lat: -33.3712, lng: -69.1415 },
    yearsFarming: 12,
    certification: 'Demeter Certified & Argencert Biodynamic',
    story: 'Perched at 1,300 meters above sea level in Gualtallary, Chacra Organica focuses on ancient fruit orchards, wild wildflower apiary, and cold-pressed extra virgin olive oil.',
    philosophy: 'Pure mountain water from snow melt feeds our living soils without any industrial interventions.',
    heroImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1600',
    portraitImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800'
    ],
    practices: [
      'Wild bee protection corridors with native Jarilla bushes',
      'Biol dynamic sprays 501 (Horn Silica) applied at sunrise',
      'No tilling to maintain subterranean mycorrhizal fungi networks'
    ],
    sizeHectares: 28,
    familyHistory: 'Restored abandoned drylands into a lush biodynamic oasis rich in biodiversity and native wildlife.'
  },
  {
    id: 'terruño-lujan',
    name: 'Terruño Biodinámico Luján',
    tagline: 'Ancient olive groves & heirloom heritage vegetables',
    region: 'Luján de Cuyo',
    location: 'Agrelo, Luján de Cuyo, Mendoza',
    coordinates: { lat: -33.1205, lng: -68.8801 },
    yearsFarming: 22,
    certification: 'Demeter Certified Biodynamic',
    story: 'Centuries-old olive trees standing side-by-side with organic herbal gardens and seasonal root vegetables in Agrelo.',
    philosophy: 'Soil is not a container for nutrients; soil is a vibrant, living organism teeming with life.',
    heroImage: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=1600',
    portraitImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=800'
    ],
    practices: [
      'Graze sheep during autumn to fertilize olive orchards organically',
      'Preparations 502-507 integrated in home compost',
      'Hand-milled flours and stone-pressed oils'
    ],
    sizeHectares: 60,
    familyHistory: 'Pioneers of biodynamic olive oil production in the Agrelo terroir.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'malbec-biodinamico-2022',
    name: 'Reserva Malbec Biodinámico 2022',
    subtitle: 'Single vineyard high-altitude Malbec harvested under full moon',
    category: 'Wine',
    price: 18500,
    unit: '750ml bottle',
    producerId: 'finca-el-sol',
    producerName: 'Finca El Sol & Biodinámica',
    location: 'Vista Flores, Valle de Uco',
    harvestDate: 'April 2022 (Root Day Harvest)',
    images: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Fermented naturally with wild indigenous yeasts from the vineyard skins. Aged 14 months in neutral concrete eggs without added sulfites or clarification agents.',
    biodynamicNotes: 'Vineyard sprayed with Preparation 500 (Horn Manure) in autumn and Preparation 501 (Horn Silica) at veraison under the constellation of Taurus.',
    suggestedPairings: ['Slow-roasted wild herbs & root vegetables', 'Artisanal aged mountain preserves', 'Mendoza walnuts'],
    recipeIdea: {
      title: 'Braised Mountain Mushrooms with Wine Reduction',
      instructions: 'Sauté forest mushrooms with garlic, fresh thyme, and reduce 100ml of Malbec until glazy. Serve with polenta.'
    },
    inStock: true,
    stockCount: 42,
    badge: 'Demeter Certified',
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 'aceite-oliva-agrelo-demeter',
    name: 'Aceite de Oliva Extra Virgen Biodinámico',
    subtitle: 'Cold-pressed Arauco & Coratina olives from 80-year-old trees',
    category: 'Olive Oil',
    price: 14200,
    unit: '500ml glass bottle',
    producerId: 'terruño-lujan',
    producerName: 'Terruño Biodinámico Luján',
    location: 'Agrelo, Luján de Cuyo',
    harvestDate: 'May 2024 (Fruit Day)',
    images: [
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541256942802-7b29531f0df8?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Hand-picked at peak ripeness when moon aspect favors oil richness. First cold extraction within 4 hours of harvest to preserve intense polyphenols and peppery finish.',
    biodynamicNotes: 'Inter-row cover crops of red clover and wild brassicas maintained with zero tillage.',
    nutritionFacts: [
      { label: 'Acidity', value: '< 0.2%' },
      { label: 'Polyphenols', value: '540 mg/kg' },
      { label: 'Extraction Method', value: 'Cold Mechanical' }
    ],
    suggestedPairings: ['Heirloom tomatoes', 'Sourdough hearth bread', 'Fresh mountain herbs'],
    inStock: true,
    stockCount: 65,
    badge: 'Limited Harvest',
    rating: 5.0,
    reviewCount: 29
  },
  {
    id: 'miel-silvestre-jarilla',
    name: 'Miel Raw de Flor Silvestre & Jarilla',
    subtitle: 'Unheated Andean mountain honey packed with natural enzymes',
    category: 'Honey',
    price: 7800,
    unit: '500g jar',
    producerId: 'chacra-uco-organica',
    producerName: 'Chacra Organica del Uco',
    location: 'Gualtallary, Tupungato',
    harvestDate: 'February 2024',
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Harvested from biodynamic hives situated near wild alpine Jarilla, Thyme, and Lavender blossoms at 1,400m altitude. Never heated, ultra-filtered, or cut.',
    biodynamicNotes: 'Apiary managed according to Steiner’s natural hive construction principles with zero synthetic antibiotics.',
    inStock: true,
    stockCount: 28,
    badge: 'Raw & Pure',
    rating: 4.8,
    reviewCount: 41
  },
  {
    id: 'cesta-hortalizas-estacion',
    name: 'Cesta de Hortalizas Vivas de Estación',
    subtitle: 'Curated box of fresh roots, leafy greens, and herbs harvested sunrise day of delivery',
    category: 'Fresh Vegetables',
    price: 16500,
    unit: 'Approx. 5kg box',
    producerId: 'terruño-lujan',
    producerName: 'Terruño Biodinámico Luján',
    location: 'Luján de Cuyo',
    harvestDate: 'Morning of Delivery',
    images: [
      'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Includes heirloom carrots, rainbow chard, purple kale, garlic bulbs, mountain radishes, and fresh rosemary grown in living compost-rich soil.',
    biodynamicNotes: 'Grown using Preparation 500 compost soil enhancement. Nutrient density tested 35% higher than conventional store crops.',
    suggestedPairings: ['Extra Virgin Olive Oil', 'Whole grain spelt crust', 'Coarse Andean sea salt'],
    inStock: true,
    stockCount: 15,
    badge: 'Fresh Harvest',
    rating: 4.9,
    reviewCount: 52
  },
  {
    id: 'manzanas-rojas-uco',
    name: 'Manzanas Criollas Biodinámicas de Montaña',
    subtitle: 'Crisp high-altitude apples grown without chemical sprays',
    category: 'Fruits',
    price: 6400,
    unit: '1.5 kg bag',
    producerId: 'chacra-uco-organica',
    producerName: 'Chacra Organica del Uco',
    location: 'Tupungato, Valle de Uco',
    harvestDate: 'March 2024',
    images: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Intense aroma and naturally sweet crunch fostered by cold mountain nights and intense solar radiation at 1,300 meters.',
    biodynamicNotes: 'Orchard protected with Preparation 508 (Horsetail tea) for natural fungal equilibrium.',
    inStock: true,
    stockCount: 30,
    badge: 'Organically Grown',
    rating: 4.7,
    reviewCount: 19
  },
  {
    id: 'harina-centeno-integral-biodinamic',
    name: 'Harina Integral de Centeno de Molino de Piedra',
    subtitle: 'Stone-milled whole grain rye flour enriched with organic vitality',
    category: 'Flours',
    price: 4900,
    unit: '1 kg bag',
    producerId: 'finca-el-sol',
    producerName: 'Finca El Sol & Biodinámica',
    location: 'Tunuyán, Mendoza',
    harvestDate: 'January 2024',
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Milled slowly on granite stones to avoid friction heat, preserving natural wheat germ oils, B vitamins, and active enzymes for wild sourdough starter fermentation.',
    biodynamicNotes: 'Grain field cultivated in crop rotation with legumes and cosmic calendar seeding times.',
    inStock: true,
    stockCount: 50,
    badge: 'Stone Milled',
    rating: 5.0,
    reviewCount: 15
  },
  {
    id: 'infusion-hierbas-andinas',
    name: 'Té Herbal Bio ' + 'Jarilla & Cedrón del Aconcagua',
    subtitle: 'Hand-picked high mountain wild herb tea blend',
    category: 'Tea',
    price: 3800,
    unit: '80g whole leaf bag',
    producerId: 'chacra-uco-organica',
    producerName: 'Chacra Organica del Uco',
    location: 'Tupungato, Valle de Uco',
    harvestDate: 'April 2024 (Flower Day)',
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Gathered by hand along wild arroyos in the Andes foothill environment. Deeply aromatic, calming, and digestion-supporting.',
    biodynamicNotes: 'Harvested exclusively on Flower Days when herbal essential oil concentrations peak.',
    inStock: true,
    stockCount: 40,
    badge: 'Wild Crafted',
    rating: 4.9,
    reviewCount: 22
  },
  {
    id: 'dulce-membrillo-artesanal',
    name: 'Conserva Artesanal de Membrillo Biodinámico',
    subtitle: 'Traditional quince slow-cooked with organic raw cane sugar',
    category: 'Natural Preserves',
    price: 5200,
    unit: '450g glass jar',
    producerId: 'terruño-lujan',
    producerName: 'Terruño Biodinámico Luján',
    location: 'Agrelo, Luján de Cuyo',
    harvestDate: 'March 2024',
    images: [
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Cooked in copper cauldrons according to traditional Mendoza family recipes. Free from artificial pectin, preservatives, or colorings.',
    biodynamicNotes: 'Quince trees grown under natural companion planting with wild lavender and mint.',
    inStock: true,
    stockCount: 24,
    badge: 'Artisanal Batch',
    rating: 4.8,
    reviewCount: 16
  }
];

export const PREPARATIONS: PreparationInfo[] = [
  {
    number: '500',
    name: 'Horn Manure (Boñiga en Cuerno)',
    latinName: 'Preparation 500',
    type: 'Field Spray',
    description: 'Fresh cow manure buried in cow horns in rich humus soil throughout winter. It undergoes a profound transformation into concentrated humic material.',
    ingredients: 'Organic cow manure, cow horn, winter soil burial',
    usage: 'Dynamized in water for 1 hour and sprayed over soil before planting in spring and autumn.',
    benefits: ['Stimulates root depth and branching', 'Increases micro-fauna activity and soil humus', 'Enhances water retention capacity'],
    iconName: 'Sprout'
  },
  {
    number: '501',
    name: 'Horn Silica (Sílice en Cuerno)',
    latinName: 'Preparation 501',
    type: 'Field Spray',
    description: 'Finely ground quartz crystal buried in cow horns during spring and summer to absorb intense sunlight forces.',
    ingredients: 'Ground quartz crystal silica powder, cow horn, summer solar absorption',
    usage: 'Sprayed as a fine fine mist over plant foliage at sunrise during leaf/flowering stage.',
    benefits: ['Enhances photosynthesis & light uptake', 'Improves aroma, sugar balance, and flavor complexity', 'Strengthens crop resistance against fungal diseases'],
    iconName: 'Sun'
  },
  {
    number: '502',
    name: 'Yarrow (Milenrama)',
    latinName: 'Achillea millefolium - Prep 502',
    type: 'Compost Additive',
    description: 'Yarrow flowers encased in stag bladder and hung in summer sun, then buried through winter.',
    ingredients: 'Yarrow flowers, natural bladder membrane',
    usage: 'Added in tiny quantities to compost piles.',
    benefits: ['Regulates sulfur and potassium balance', 'Attracts vital trace minerals', 'Enlivens compost decomposition'],
    iconName: 'Flower2'
  },
  {
    number: '503',
    name: 'Chamomile (Manzanilla)',
    latinName: 'Matricaria recutita - Prep 503',
    type: 'Compost Additive',
    description: 'Chamomile blossoms inserted into cattle intestine and fermented in moist autumn soil.',
    ingredients: 'Wild chamomile flowers, natural digestive casing',
    usage: 'Compost stack inoculation.',
    benefits: ['Stabilizes nitrogen balance', 'Harmonizes calcium processes', 'Prevents plant stress'],
    iconName: 'Leaf'
  },
  {
    number: '504',
    name: 'Stinging Nettle (Ortiga)',
    latinName: 'Urtica dioica - Prep 504',
    type: 'Compost Additive',
    description: 'Whole flowering nettle buried directly in peat-rich soil surrounded by turf for an entire calendar year.',
    ingredients: 'Fresh stinging nettle plants',
    usage: 'Compost additive or liquid plant tonic.',
    benefits: ['Restores iron and nitrogen intelligence in soil', 'Promotes humus stability', 'Enlivens plant immune system'],
    iconName: 'ShieldCheck'
  },
  {
    number: '505',
    name: 'Oak Bark (Corteza de Roble)',
    latinName: 'Quercus robur - Prep 505',
    type: 'Compost Additive',
    description: 'Scraped oak bark placed in a domestic animal skull submerged near water streams through winter.',
    ingredients: 'Oak bark powder, natural skull vessel',
    usage: 'Compost additive.',
    benefits: ['Calcium regulation', 'Protects crops against plant diseases', 'Provides structured vitality'],
    iconName: 'TreeDeciduous'
  },
  {
    number: '506',
    name: 'Dandelion (Diente de León)',
    latinName: 'Taraxacum officinale - Prep 506',
    type: 'Compost Additive',
    description: 'Dandelion flowers wrapped in cattle mesentery and buried over winter.',
    ingredients: 'Dandelion blossoms, mesentery tissue',
    usage: 'Compost inoculant.',
    benefits: ['Harmonizes silicic acid and potassium', 'Opens plant to environmental sensitivity', 'Boosts soil health'],
    iconName: 'Wind'
  },
  {
    number: '507',
    name: 'Valerian (Valeriana)',
    latinName: 'Valeriana officinalis - Prep 507',
    type: 'Compost Additive',
    description: 'Extracted juice of valerian flowers fermented and diluted as a protective warmth wrap.',
    ingredients: 'Fermented valerian flower extract',
    usage: 'Sprayed over compost heaps or foliage during frost threats.',
    benefits: ['Puts a warm blanket effect over frost-susceptible buds', 'Regulates phosphorus processing', 'Calms plant stress'],
    iconName: 'Flame'
  },
  {
    number: '508',
    name: 'Horsetail Tea (Cola de Caballo)',
    latinName: 'Equisetum arvense - Prep 508',
    type: 'Field Spray',
    description: 'Boiled tea or fermented extract of dried horsetail, naturally high in active silica.',
    ingredients: 'Horsetail herb, mountain spring water',
    usage: 'Sprayed over leaves or roots during damp, humid lunar phases.',
    benefits: ['Natural anti-fungal barrier', 'Suppresses mildews and molds organically', 'Strengthens plant cellular walls'],
    iconName: 'Droplet'
  }
];

export const EDU_ARTICLES: EduArticle[] = [
  {
    id: 'what-is-biodynamics',
    title: 'The Farm as a Living Organism: Rudolf Steiner’s Vision',
    category: 'Principles',
    summary: 'Discover how biodynamic farming views soil, crops, livestock, and farmers as interconnected organs in a single self-sustaining body.',
    content: `Biodynamic agriculture was introduced in 1924 through a series of lectures by philosopher and scientist Rudolf Steiner. Unlike industrial farming—which treats soil as an inert sponge to inject synthetic chemicals into—biodynamics treats every farm as a unique, self-contained living organism.

In a biodynamic farm in Mendoza, the vineyard does not exist in isolation. Horses and sheep graze beneath vine rows during winter, returning organic fertility to the earth. Wild bees forage on native Jarilla and Lavender plants between rows. The compost prepared on site with horn manure (Prep 500) enriches the soil's microbial biome, allowing plant roots to penetrate 3 meters deep into Andean gravel.

The result is food and wine of extraordinary purity, expression of terroir, and exceptional nutritional density.`,
    readTime: '5 min read',
    author: 'Dr. Lucas Mendoza',
    date: 'October 12, 2024',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    keyTakeaways: [
      'Zero synthetic inputs: pesticides, glyphosate, or chemical nitrogen fertilizers.',
      'Self-sufficiency: producing seed, compost, and fertility within the farm boundaries.',
      'Rhythm and timing: planting and harvesting according to cosmic and seasonal cycles.',
      'Enhanced microbial soil vitality proven by scientific soil microbiology studies.'
    ]
  },
  {
    id: 'lunar-calendar-guide',
    title: 'How the Moon and Constellations Influence Crop Vitality',
    category: 'Lunar Calendar',
    summary: 'Learn how Maria Thun’s biodynamic astronomical calendar guides planting root crops, foliage, fruits, and seeds.',
    content: `For thousands of years, indigenous agricultural traditions recognized that the gravitational and energetic pull of the moon affects fluid sap movement in plants just as it drives ocean tides.

Maria Thun spent 50 years testing crop growth relative to the moon's position through the 12 zodiacal constellations:

• Root Days (Earth Signs: Taurus, Virgo, Capricorn): Ideal for harvesting beetroot, carrots, potatoes, and pruning vine roots.
• Leaf Days (Water Signs: Cancer, Scorpio, Pisces): Ideal for sowing leafy greens, lettuce, spinach, and irrigation.
• Flower Days (Air Signs: Gemini, Libra, Aquarius): Ideal for gathering flowers, lavender, herbal tea leaves, and olive pruning.
• Fruit Days (Fire Signs: Aries, Leo, Sagittarius): Ideal for harvesting grapes for wine making, tomatoes, apples, and seed collection.`,
    readTime: '7 min read',
    author: 'Maria Soler (Agro-Cosmic Specialist)',
    date: 'November 2, 2024',
    image: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&q=80&w=800',
    keyTakeaways: [
      'Sap rises during waxing moon phases, ideal for leaf and fruit harvests.',
      'Sap moves toward roots during waning moon phases, ideal for root planting and pruning.',
      'Root, Leaf, Flower, and Fruit days optimize specific harvest attributes.'
    ]
  },
  {
    id: 'soil-microbiome-science',
    title: 'Soil Microbes & Human Gut Health: The Scientific Connection',
    category: 'Soil Health',
    summary: 'Recent microbiome studies show that biodynamic soil microflora directly nourish human immunity and digestive health.',
    content: `Healthy human gut microbiomes share an astonishing 70% functional genetic similarity with the rhizosphere—the living microbial zone surrounding biodynamic plant roots.

When soil is sprayed with glyphosate or synthetic nitrogen, mycorrhizal fungi networks collapse. Plants absorb excess water and sugar, losing trace minerals like zinc, magnesium, and selenium.

In contrast, Demeter-certified biodynamic soils in Mendoza showcase:
1. 400% higher fungal-to-bacteria ratios than conventional farmland.
2. Higher concentrations of natural antioxidants (polyphenols, resveratrol).
3. Zero chemical residues, preserving native human gut flora diversity.`,
    readTime: '6 min read',
    author: 'Prof. Sofia Albarracín',
    date: 'December 18, 2024',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800',
    keyTakeaways: [
      'Biodynamic food contains up to 30% higher mineral concentration.',
      'Living soil biology transfers beneficial microorganisms to fresh vegetables.',
      'Soil carbon sequestration in biodynamic farms is 2.4x higher than standard organic farms.'
    ]
  }
];

export const MENDOZA_DELIVERY_ZONES = [
  { id: 'zone-1', name: 'Mendoza Capital & Guaymallén', fee: 0, minOrder: 12000, estimatedHours: '24 hours' },
  { id: 'zone-2', name: 'Godoy Cruz & Las Heras', fee: 1500, minOrder: 12000, estimatedHours: '24 hours' },
  { id: 'zone-3', name: 'Luján de Cuyo & Chacras de Coria', fee: 2200, minOrder: 15000, estimatedHours: '24-48 hours' },
  { id: 'zone-4', name: 'Maipú & Coquimbito', fee: 2500, minOrder: 15000, estimatedHours: '24-48 hours' },
  { id: 'zone-5', name: 'Valle de Uco (Tunuyán, Tupungato, San Carlos)', fee: 3800, minOrder: 25000, estimatedHours: '48-72 hours' },
  { id: 'zone-6', name: 'San Rafael & General Alvear', fee: 4500, minOrder: 30000, estimatedHours: '72 hours' }
];

export const CURRENT_LUNAR_STATUS = {
  phase: 'Waxing Gibbous',
  illumination: '84%',
  zodiacSign: 'Taurus (Earth Sign)',
  dayType: 'Root Day',
  recommendedActivities: [
    'Harvesting root vegetables (carrots, beets, garlic)',
    'Applying Preparation 500 dynamized spray at dusk',
    'Planting perennial fruit trees and olive saplings'
  ],
  avoidActivities: [
    'Pruning delicate fruit blossom branches today',
    'Bottling wine under turbulent wind conditions'
  ]
};