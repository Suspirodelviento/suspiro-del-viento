import { Producer, Product, EduArticle, PreparationInfo } from '../types';

export const PRODUCERS: Producer[] = [
  {
    id: 'finca-el-sol',
    name: 'Finca El Sol & Biodinámica',
    tagline: 'Cultivando suelos vivos al pie de la Cordillera de los Andes',
    region: 'Uco Valley',
    location: 'Vista Flores, Tunuyán, Mendoza',
    coordinates: { lat: -33.6401, lng: -69.1724 },
    yearsFarming: 18,
    certification: 'Certificación Demeter Biodinámica (100%)',
    story: 'Fundada en 2006 por la familia Mendoza, Finca El Sol transformó 45 hectáreas de suelo pedregoso de alta montaña en un santuario agrícola autosostenible. Aquí conviven vacas, caballos, lavanda silvestre y olivos junto a viñedos patrimoniales.',
    philosophy: 'Tratar la finca como un organismo vivo y único que respira con los ciclos cósmicos y regenera su propio suelo de forma natural.',
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600',
    portraitImage: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800'
    ],
    practices: [
      'Preparación de compost propio utilizando bosta en cuerno (Preparado 500)',
      'Cosecha 100% manual en consonancia con las fases lunares',
      'Cero pesticidas sintéticos o fertilizantes industriales',
      'Cultivos de cobertura con flora nativa para fijación de nitrógeno y polinización'
    ],
    sizeHectares: 45,
    familyHistory: '3 generaciones de tradición agrícola en Tunuyán, realizando la transición completa a métodos biodinámicos Demeter en 2011.'
  },
  {
    id: 'chacra-uco-organica',
    name: 'Chacra Orgánica del Uco',
    tagline: 'Cultivos ancestrales y miel pura de jarilla de montaña',
    region: 'Valle de Uco',
    location: 'Gualtallary, Tupungato, Mendoza',
    coordinates: { lat: -33.3712, lng: -69.1415 },
    yearsFarming: 12,
    certification: 'Certificado Demeter & Argencert Biodinámico',
    story: 'Ubicada a 1.300 metros sobre el nivel del mar en Gualtallary, la Chacra Orgánica se especializa en frutales antiguos, apicultura silvestre de flor de jarilla y aceite de oliva virgen extra prensado en frío.',
    philosophy: 'Agua pura de deshielo andino que nutre nuestros suelos vivos sin intervención industrial.',
    heroImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1600',
    portraitImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800'
    ],
    practices: [
      'Corredores de protección para abejas silvestres con arbustos de Jarilla',
      'Aplicación del preparado 501 (Sílice en cuerno) al amanecer',
      'Sin labranza para preservar las redes subterráneas de hongos micorrizas'
    ],
    sizeHectares: 28,
    familyHistory: 'Transformó tierras secas en un oasis biodinámico repleto de biodiversidad y vida silvestre nativa.'
  },
  {
    id: 'terruño-lujan',
    name: 'Terruño Biodinámico Luján',
    tagline: 'Olivares centenarios y hortalizas nativas de estación',
    region: 'Luján de Cuyo',
    location: 'Agrelo, Luján de Cuyo, Mendoza',
    coordinates: { lat: -33.1205, lng: -68.8801 },
    yearsFarming: 22,
    certification: 'Demeter Certified Biodynamic',
    story: 'Olivos de más de ochenta años conviven con huertas herbales orgánicas y hortalizas de raíz en Agrelo.',
    philosophy: 'El suelo no es un recipiente inerte de nutrientes; es un organismo vivo que rebosa de microorganismos.',
    heroImage: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=1600',
    portraitImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=800'
    ],
    practices: [
      'Pastoreo de ovejas durante el otoño para fertilizar los olivares orgánicamente',
      'Preparados 502-507 integrados en el compost maduro',
      'Harinas molidas en piedra y aceites prensados en frío'
    ],
    sizeHectares: 60,
    familyHistory: 'Pioneros en la producción de aceite de oliva biodinámico en el terruño de Agrelo.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'malbec-biodinamico-2022',
    name: 'Reserva Malbec Biodinámico 2022',
    subtitle: 'Malbec de parcela de alta montaña cosechado bajo luna llena',
    category: 'Wine',
    price: 18500,
    unit: 'Botella 750ml',
    producerId: 'finca-el-sol',
    producerName: 'Finca El Sol & Biodinámica',
    location: 'Vista Flores, Valle de Uco',
    harvestDate: 'Abril 2022 (Día de Raíz)',
    images: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Fermentado naturalmente con levaduras indígenas nativas del viñedo. Criado durante 14 meses en piletas de hormigón sin sulfitos añadidos ni clarificantes.',
    biodynamicNotes: 'Viñedo dinamizado con Preparado 500 (Boñiga en Cuerno) en otoño y Preparado 501 (Sílice en Cuerno) en el envero bajo la constelación de Tauro.',
    suggestedPairings: ['Verduras de raíz asadas a las brasas', 'Quesos de montaña estacionados', 'Nueces de Mendoza'],
    recipeIdea: {
      title: 'Hongos de pino salteados con reducción de Malbec',
      instructions: 'Saltear hongos silvestres con ajo, tomillo fresco y reducir 100ml de Malbec hasta glasear. Servir con polenta cremosa.'
    },
    inStock: true,
    stockCount: 42,
    badge: 'Certificado Demeter',
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 'aceite-oliva-agrelo-demeter',
    name: 'Aceite de Oliva Extra Virgen Biodinámico',
    subtitle: 'Olivas Arauco y Coratina de árboles octogenarios prensadas en frío',
    category: 'Olive Oil',
    price: 14200,
    unit: 'Botella de vidrio 500ml',
    producerId: 'terruño-lujan',
    producerName: 'Terruño Biodinámico Luján',
    location: 'Agrelo, Luján de Cuyo',
    harvestDate: 'Mayo 2024 (Día de Fruto)',
    images: [
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541256942802-7b29531f0df8?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Recolectado a mano en el punto óptimo de maduración. Primera extracción en frío dentro de las 4 horas de cosecha para preservar polifenoles intensos y retrogusto picante.',
    biodynamicNotes: 'Cultivos de cobertura entre hileras de trébol rojo y brásicas silvestres mantenidos sin labranza.',
    nutritionFacts: [
      { label: 'Acidez', value: '< 0.2%' },
      { label: 'Polifenoles', value: '540 mg/kg' },
      { label: 'Método de Extracción', value: 'Mecánico en Frío' }
    ],
    suggestedPairings: ['Tomates reliquia', 'Pan de masa madre', 'Hierbas de montaña'],
    inStock: true,
    stockCount: 65,
    badge: 'Cosecha Limitada',
    rating: 5.0,
    reviewCount: 29
  },
  {
    id: 'miel-silvestre-jarilla',
    name: 'Miel Pura de Flor Silvestre & Jarilla',
    subtitle: 'Miel sin calentar de flores andinas repleta de enzimas vivas',
    category: 'Honey',
    price: 7800,
    unit: 'Frasco de 500g',
    producerId: 'chacra-uco-organica',
    producerName: 'Chacra Orgánica del Uco',
    location: 'Gualtallary, Tupungato',
    harvestDate: 'Febrero 2024',
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Cosechada de colmenas biodinámicas situadas entre flores de Jarilla silvestre, Tomillo y Lavanda a 1.400m de altura. Jamás pasteurizada ni filtrada térmicamente.',
    biodynamicNotes: 'Manejo apícola según principios de construcción natural de panal de Steiner sin antibióticos sintéticos.',
    inStock: true,
    stockCount: 28,
    badge: '100% Pura y Cruda',
    rating: 4.8,
    reviewCount: 41
  },
  {
    id: 'cesta-hortalizas-estacion',
    name: 'Cajón de Hortalizas Vivas de Estación',
    subtitle: 'Cesta fresca de raíces, hojas verdes y aromáticas cosechadas al amanecer del día de entrega',
    category: 'Fresh Vegetables',
    price: 16500,
    unit: 'Cajón de 5kg aprox.',
    producerId: 'terruño-lujan',
    producerName: 'Terruño Biodinámico Luján',
    location: 'Luján de Cuyo',
    harvestDate: 'Mañana de la Entrega',
    images: [
      'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Incluye zanahorias reliquia, acelga de colores, kale morado, ajos de montaña, rabanitos y romero fresco cultivados en suelo enriquecido con compost vivo.',
    biodynamicNotes: 'Cultivadas con enriquecimiento de compost Preparado 500. Densidad nutricional 35% superior a cultivos convencionales.',
    suggestedPairings: ['Aceite de oliva extra virgen', 'Masa de espelta', 'Sal gruesa andina'],
    inStock: true,
    stockCount: 15,
    badge: 'Cosecha Fresca del Día',
    rating: 4.9,
    reviewCount: 52
  },
  {
    id: 'manzanas-rojas-uco',
    name: 'Manzanas Criollas Biodinámicas de Montaña',
    subtitle: 'Manzanas crujientes de altura cultivadas sin agroquímicos',
    category: 'Fruits',
    price: 6400,
    unit: 'Bolsa de 1.5 kg',
    producerId: 'chacra-uco-organica',
    producerName: 'Chacra Orgánica del Uco',
    location: 'Tupungato, Valle de Uco',
    harvestDate: 'Marzo 2024',
    images: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Sabor intenso y dulzura natural favorecidos por las noches frías de montaña y la radiación solar pura a 1.300 metros.',
    biodynamicNotes: 'Monte frutal protegido con Preparado 508 (Té de Cola de Caballo) para un equilibrio fúngico natural.',
    inStock: true,
    stockCount: 30,
    badge: 'Cultivo Limpio',
    rating: 4.7,
    reviewCount: 19
  },
  {
    id: 'harina-centeno-integral-biodinamic',
    name: 'Harina Integral de Centeno Molida a Piedra',
    subtitle: 'Harina de centeno de grano entero molida lentamente para preservar aceites germinales',
    category: 'Flours',
    price: 4900,
    unit: 'Paquete de 1 kg',
    producerId: 'finca-el-sol',
    producerName: 'Finca El Sol & Biodinámica',
    location: 'Tunuyán, Mendoza',
    harvestDate: 'Enero 2024',
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Molida suavemente en muelas de granito para evitar el calentamiento por fricción, preservando aceites naturales y enzimas activas ideales para masa madre.',
    biodynamicNotes: 'Campo de cereales cultivado en rotación con leguminosas y siembra según el calendario cósmico.',
    inStock: true,
    stockCount: 50,
    badge: 'Molienda a Piedra',
    rating: 5.0,
    reviewCount: 15
  },
  {
    id: 'infusion-hierbas-andinas',
    name: 'Té Herbal Bio Jarilla & Cedrón del Aconcagua',
    subtitle: 'Mezcla de hierbas silvestres recolectadas a mano en la precordillera',
    category: 'Tea',
    price: 3800,
    unit: 'Bolsa de 80g en hebras',
    producerId: 'chacra-uco-organica',
    producerName: 'Chacra Orgánica del Uco',
    location: 'Tupungato, Valle de Uco',
    harvestDate: 'Abril 2024 (Día de Flor)',
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Recolectado a mano a lo largo de arroyos silvestres en las laderas andinas. Profundamente aromático, digestivo y reconfortante.',
    biodynamicNotes: 'Cosechado exclusivamente en Días de Flor cuando los aceites esenciales alcanzan su máxima concentración.',
    inStock: true,
    stockCount: 40,
    badge: 'Cosecha Silvestre',
    rating: 4.9,
    reviewCount: 22
  },
  {
    id: 'dulce-membrillo-artesanal',
    name: 'Dulce Artesanal de Membrillo Biodinámico',
    subtitle: 'Membrillos cocinados lentamente en paila de cobre con azúcar de caña orgánica',
    category: 'Natural Preserves',
    price: 5200,
    unit: 'Frasco de vidrio 450g',
    producerId: 'terruño-lujan',
    producerName: 'Terruño Biodinámico Luján',
    location: 'Agrelo, Luján de Cuyo',
    harvestDate: 'Marzo 2024',
    images: [
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Elaborado según la receta tradicional mendocina. Sin pectina artificial, conservantes ni colorantes sintéticos.',
    biodynamicNotes: 'Frutales de membrillo cultivados en asociación vegetal con lavanda y menta silvestre.',
    inStock: true,
    stockCount: 24,
    badge: 'Lote Artesanal',
    rating: 4.8,
    reviewCount: 16
  }
];

export const PREPARATIONS: PreparationInfo[] = [
  {
    number: '500',
    name: 'Boñiga en Cuerno (Preparado 500)',
    latinName: 'Preparado 500',
    type: 'Field Spray',
    description: 'Bosta fresca de vaca enterrada dentro de cuernos en suelo rico durante el invierno. Se transforma en material húmico altamente concentrado.',
    ingredients: 'Bosta de vaca orgánica, cuerno de vaca, entierro invernal',
    usage: 'Dinamizado en agua durante 1 hora y pulverizado sobre el suelo antes de la siembra en primavera u otoño.',
    benefits: ['Estimula la profundidad y ramificación radicular', 'Aumenta la actividad de la microfauna y humus', 'Mejora la capacidad de retención de agua'],
    iconName: 'Sprout'
  },
  {
    number: '501',
    name: 'Sílice en Cuerno (Preparado 501)',
    latinName: 'Preparado 501',
    type: 'Field Spray',
    description: 'Cuarzo molido fino enterrado en cuernos durante primavera y verano para absorber las fuerzas de la luz solar.',
    ingredients: 'Polvo de cuarzo cristalino, cuerno de vaca, absorción solar de verano',
    usage: 'Pulverizado como una niebla fina sobre el follaje al amanecer.',
    benefits: ['Potencia la fotosíntesis y asimilación de luz', 'Mejora el aroma, azúcar y complejidad de sabor', 'Fortalece la resistencia foliar ante hongos'],
    iconName: 'Sun'
  },
  {
    number: '502',
    name: 'Milenrama (Achillea millefolium)',
    latinName: 'Achillea millefolium - Prep 502',
    type: 'Compost Additive',
    description: 'Flores de milenrama envueltas en vejiga de ciervo, expuestas al sol estival y enterradas en invierno.',
    ingredients: 'Flores de milenrama, membrana natural',
    usage: 'Incorporado en diminutas cantidades a las pilas de compost.',
    benefits: ['Regula el azufre y el potasio', 'Atrae oligoelementos vitales', 'Dinamiza la descomposición del compost'],
    iconName: 'Flower2'
  },
  {
    number: '503',
    name: 'Manzanilla (Matricaria recutita)',
    latinName: 'Matricaria recutita - Prep 503',
    type: 'Compost Additive',
    description: 'Flores de manzanilla introducidas en intestino vacuno y fermentadas en suelo húmedo de otoño.',
    ingredients: 'Flores silvestres de manzanilla, envoltura natural',
    usage: 'Inoculación de pilas de abono.',
    benefits: ['Estabiliza los procesos del nitrógeno', 'Armoniza la asimilación del calcio', 'Reduce el estrés vegetal'],
    iconName: 'Leaf'
  },
  {
    number: '504',
    name: 'Ortiga (Urtica dioica)',
    latinName: 'Urtica dioica - Prep 504',
    type: 'Compost Additive',
    description: 'Ortigas enteras enterradas directamente en suelo rodeado de turba durante un año solar completo.',
    ingredients: 'Plantas frescas de ortiga',
    usage: 'Aditivo para compost o tónico foliar líquido.',
    benefits: ['Restaura la inteligencia del hierro y nitrógeno en el suelo', 'Promueve la estabilidad del humus', 'Estimula el sistema inmune vegetal'],
    iconName: 'ShieldCheck'
  },
  {
    number: '505',
    name: 'Corteza de Roble (Quercus robur)',
    latinName: 'Quercus robur - Prep 505',
    type: 'Compost Additive',
    description: 'Corteza de roble raspada colocada en un cráneo animal sumergido cerca de corrientes de agua durante el invierno.',
    ingredients: 'Polvo de corteza de roble, receptáculo natural',
    usage: 'Aditivo para compost.',
    benefits: ['Regulación del calcio', 'Protege a los cultivos contra enfermedades', 'Estructura la vitalidad del cultivo'],
    iconName: 'TreeDeciduous'
  },
  {
    number: '506',
    name: 'Diente de León (Taraxacum officinale)',
    latinName: 'Taraxacum officinale - Prep 506',
    type: 'Compost Additive',
    description: 'Flores de diente de león envueltas en mesenterio vacuno y enterradas durante el invierno.',
    ingredients: 'Flores de diente de león, tejido natural',
    usage: 'Inoculante de abono.',
    benefits: ['Armoniza el ácido silícico y el potasio', 'Abre a la planta a la sensibilidad ambiental', 'Potencia la salud del suelo'],
    iconName: 'Wind'
  },
  {
    number: '507',
    name: 'Valeriana (Valeriana officinalis)',
    latinName: 'Valeriana officinalis - Prep 507',
    type: 'Compost Additive',
    description: 'Jugo de flores de valeriana fermentado y diluido como manto de calor protector.',
    ingredients: 'Extracto fermentado de flor de valeriana',
    usage: 'Pulverizado sobre compost o vegetación ante amenazas de heladas.',
    benefits: ['Crea un manto protector térmico ante heladas', 'Regula los procesos del fósforo', 'Calma el estrés térmico vegetal'],
    iconName: 'Flame'
  },
  {
    number: '508',
    name: 'Cola de Caballo (Equisetum arvense)',
    latinName: 'Equisetum arvense - Prep 508',
    type: 'Field Spray',
    description: 'Decocción o infusión de cola de caballo seca, naturalmente rica en sílice activa.',
    ingredients: 'Planta de cola de caballo, agua pura de vertiente',
    usage: 'Pulverizado sobre hojas o suelo en periodos de humedad o luna llena.',
    benefits: ['Barrera antifúngica natural', 'Previene mildiu y oídio orgánicamente', 'Fortalece las paredes celulares de la planta'],
    iconName: 'Droplet'
  }
];

export const EDU_ARTICLES: EduArticle[] = [
  {
    id: 'what-is-biodynamics',
    title: 'La Finca como un Organismo Vivo: La Visión de Rudolf Steiner',
    category: 'Principles',
    summary: 'Descubrí cómo la agricultura biodinámica concibe al suelo, cultivos, animales y agricultores como órganos interconectados de un solo ser vivo.',
    content: `La agricultura biodinámica fue introducida en 1924 a través del ciclo de conferencias del científico y filósofo Rudolf Steiner. A diferencia de la agricultura industrial —que trata al suelo como un soporte inerte para inyectar fertilizantes químicos— la biodinámica concibe a cada finca como un organismo vivo único y autosostenible.

En una finca biodinámica en Mendoza, el viñedo no existe de forma aislada. Cabalgaduras y ovejas pastan bajo los renuevos en invierno fertilizando la tierra. Las abejas silvestres forrajean sobre jarillas y lavandas entre hileras. El compost preparado en la propia finca con preparado 500 (Boñiga en Cuerno) enriquece el microbioma del suelo, permitiendo a las raíces profundizar más de 3 metros en el pedregal andino.

El resultado son alimentos y vinos de una pureza extraordinaria, expresión genuina del terruño y una densidad nutricional excepcional.`,
    readTime: 'Lectura de 5 min',
    author: 'Dr. Lucas Mendoza',
    date: '12 de Octubre, 2024',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    keyTakeaways: [
      'Cero agroquímicos sintéticos: sin glifosato ni fertilizantes nitrogenados de síntesis.',
      'Autosuficiencia: generación propia de semillas, abono y compost en la propia finca.',
      'Ritmo y sincronía: siembra y cosecha según los ciclos astronómicos y las estaciones.',
      'Microbioma del suelo enriquecido probado en análisis microbiológicos.'
    ]
  },
  {
    id: 'lunar-calendar-guide',
    title: 'Cómo la Luna y las Constelaciones Influyen en la Vitalidad de los Cultivos',
    category: 'Lunar Calendar',
    summary: 'Conocé cómo el calendario astronómico biodinámico de Maria Thun guía la siembra de raíces, hojas, frutos y semillas.',
    content: `Durante milenios, las tradiciones agrícolas milenarias reconocieron que la atracción gravitacional y energética de la luna afecta el ascenso de la savia en las plantas, al igual que rige las mareas de los océanos.

Maria Thun investigó durante 50 años el desarrollo de los cultivos según el paso de la luna por las 12 constelaciones del zodíaco:

• Días de Raíz (Signos de Tierra: Tauro, Virgo, Capricornio): Ideal para cosechar zanahorias, remolachas, ajos y poda de raíces.
• Días de Hoja (Signos de Agua: Cáncer, Escorpio, Piscis): Ideal para sembrar hortalizas de hoja, lechugas, acelgas y riego.
• Días de Flor (Signos de Aire: Géminis, Libra, Acuario): Ideal para recolectar flores, lavanda, aromáticas y poda de olivares.
• Días de Fruto (Signos de Fuego: Aries, Leo, Sagitario): Ideal para vendimiar uvas, tomates, manzanas y recolección de semillas.`,
    readTime: 'Lectura de 7 min',
    author: 'Maria Soler (Especialista en Agroastronomía)',
    date: '2 de Noviembre, 2024',
    image: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&q=80&w=800',
    keyTakeaways: [
      'La savia asciende en luna creciente, ideal para recolección de hojas y frutos.',
      'La savia desciende a las raíces en luna menguante, ideal para siembra de raíces y poda.',
      'Los días de Raíz, Hoja, Flor y Fruto optimizan atributos específicos de cada cosecha.'
    ]
  },
  {
    id: 'soil-microbiome-science',
    title: 'Microbioma del Suelo y Salud Intestinal: La Conexión Científica',
    category: 'Soil Health',
    summary: 'Estudios recientes demuestran que la microflora de los suelos biodinámicos nutre directamente la inmunidad y salud digestiva humana.',
    content: `El microbioma intestinal humano comparte un asombroso 70% de similitud genética funcional con la rizosfera: la zona microbiana viva que rodea las raíces de las plantas biodinámicas.

Cuando el suelo se pulveriza con glifosato o fertilizantes de síntesis, las redes de hongos micorrizas colapsan. Las plantas absorben agua en exceso perdiendo minerales clave como zinc, magnesio y selenio.

En contraste, los suelos certificados por Demeter en Mendoza exhiben:
1. Ratios de hongos a bacterias un 400% superiores a campos convencionales.
2. Mayores concentraciones de antioxidantes naturales (polifenoles, resveratrol).
3. Cero residuos químicos, preservando la diversidad microbiana intestinal.`,
    readTime: 'Lectura de 6 min',
    author: 'Dra. Sofía Albarracín',
    date: '18 de Diciembre, 2024',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800',
    keyTakeaways: [
      'Alimentos biodinámicos con hasta un 30% más de concentración mineral.',
      'Biología viva del suelo que transfiere microorganismos beneficiosos.',
      'Secuestro de carbono en suelos biodinámicos 2.4 veces superior a campos estándar.'
    ]
  }
];

export const MENDOZA_DELIVERY_ZONES = [
  { id: 'zone-1', name: 'Mendoza Capital y Guaymallén', fee: 0, minOrder: 12000, estimatedHours: '24 horas' },
  { id: 'zone-2', name: 'Godoy Cruz y Las Heras', fee: 1500, minOrder: 12000, estimatedHours: '24 horas' },
  { id: 'zone-3', name: 'Luján de Cuyo y Chacras de Coria', fee: 2200, minOrder: 15000, estimatedHours: '24-48 horas' },
  { id: 'zone-4', name: 'Maipú y Coquimbito', fee: 2500, minOrder: 15000, estimatedHours: '24-48 horas' },
  { id: 'zone-5', name: 'Valle de Uco (Tunuyán, Tupungato, San Carlos)', fee: 3800, minOrder: 25000, estimatedHours: '48-72 horas' },
  { id: 'zone-6', name: 'San Rafael y General Alvear', fee: 4500, minOrder: 30000, estimatedHours: '72 horas' }
];

export const CURRENT_LUNAR_STATUS = {
  phase: 'Gibosa Creciente',
  illumination: '84%',
  zodiacSign: 'Tauro (Signo de Tierra)',
  dayType: 'Día de Raíz',
  recommendedActivities: [
    'Cosecha de hortalizas de raíz (zanahorias, remolachas, ajos)',
    'Aplicación de Preparado 500 dinamizado al atardecer',
    'Plantación de frótales perennes y retoños de olivo'
  ],
  avoidActivities: [
    'Poda de ramas con brotes florales delicados hoy',
    'Embotellado de vino bajo condiciones de viento zonda'
  ]
};