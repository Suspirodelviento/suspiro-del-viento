import { Producer, Product, EduArticle, PreparationInfo } from '../types';

export const PREPARATIONS: PreparationInfo[] = [
  {
    number: '500',
    name: 'Preparado de Boñiga en Cuerno (Horn Manure)',
    latinName: 'Preparation 500',
    type: 'Field Spray',
    description: 'Estiércol vacuno fresco introducido en cuernos de vaca y enterrado durante el invierno. Tras su extracción en primavera, se dinamiza en agua durante 1 hora y se pulveriza en gotas finas al atardecer.',
    ingredients: 'Estiércol de vaca nodriza de finca propia, cuerno vacuno.',
    usage: 'Se pulveriza en el suelo al comienzo de la primavera y otoño en días de Tierra o Raíz.',
    benefits: [
      'Multiplica la densidad de hongos micorricicos en la rizosfera',
      'Estimula la profundización del sistema radicular hasta un 300%',
      'Mejora la estructura coloidal y la humus del suelo'
    ],
    iconName: 'Sprout'
  },
  {
    number: '501',
    name: 'Preparado de Sílice en Cuerno (Horn Silica)',
    latinName: 'Preparation 501',
    type: 'Field Spray',
    description: 'Cuarzo de cristal pulverizado en polvo fino, enterrado en cuernos durante la primavera y el verano para absorber la máxima luz solar. Se aplica como niebla fina al amanecer.',
    ingredients: 'Cuarzo puro pulverizado (dióxido de silicio), cuerno vacuno.',
    usage: 'Se rocía sobre el follaje de los cultivos al amanecer en días de Fruto o Flor.',
    benefits: [
      'Intensifica la fotosíntesis vegetal y el metabolismo foliar',
      'Aumenta los grados Brix, azúcares naturales y polifenoles en uvas y frutas',
      'Refuerza la epidermis foliar contra ataques de hongos patógenos'
    ],
    iconName: 'Sun'
  },
  {
    number: '502',
    name: 'Preparado de Milenrama (Yarrow)',
    latinName: 'Achillea millefolium',
    type: 'Compost Additive',
    description: 'Flores de milenrama introducidas en vejiga de ciervo y expuestas al sol durante el verano antes de enterrarse durante el invierno.',
    ingredients: 'Flores silvestres de milenrama, vejiga de ciervo.',
    usage: 'Se inocula en pequeñas dosis dentro de la pila de compost biodinámico.',
    benefits: [
      'Regula los ciclos de azufre y potasio en el compost',
      'Permite la asimilación eficiente de micronutrientes traza'
    ],
    iconName: 'Flower2'
  },
  {
    number: '503',
    name: 'Preparado de Manzanilla (Chamomile)',
    latinName: 'Matricaria recutita',
    type: 'Compost Additive',
    description: 'Flores de manzanilla fermentadas en intestino vacuno durante el invierno en tierra fértil.',
    ingredients: 'Cabezuelas florales de manzanilla, tripa vacuna.',
    usage: 'Se introduce en la pila de compostaje para estabilizar el nitrógeno.',
    benefits: [
      'Retiene el nitrógeno volátil evitando pérdidas en forma de amoníaco',
      'Estimula el crecimiento vegetal armónico y saludable'
    ],
    iconName: 'Leaf'
  },
  {
    number: '504',
    name: 'Preparado de Ortiga (Stinging Nettle)',
    latinName: 'Urtica dioica',
    type: 'Compost Additive',
    description: 'Hojas y tallos de ortiga silvestre enterrados directamente en la tierra rodeados de turba durante un año completo.',
    ingredients: 'Ortiga mayor silvestre recolectada en floración.',
    usage: 'Se inocula en el compost para equilibrar el hierro y la estructura del suelo.',
    benefits: [
      'Aporta sensibilidad y equilibrio al suelo',
      'Favorece la formación de humus estable y esponjoso'
    ],
    iconName: 'ShieldCheck'
  },
  {
    number: '505',
    name: 'Preparado de Corteza de Roble (Oak Bark)',
    latinName: 'Quercus robur',
    type: 'Compost Additive',
    description: 'Corteza de roble rallada enterrada dentro del cráneo de un animal doméstico en contacto con agua corriente invernal.',
    ingredients: 'Corteza rica en calcio de roble, cráneo animal.',
    usage: 'Aditivo esencial en el compostaje biodinámico.',
    benefits: [
      'Aporta calcio estructural a las paredes celulares de las plantas',
      'Protege contra enfermedades fúngicas excesivas'
    ],
    iconName: 'TreeDeciduous'
  },
  {
    number: '506',
    name: 'Preparado de Diente de León (Dandelion)',
    latinName: 'Taraxacum officinale',
    type: 'Compost Additive',
    description: 'Flores amarillas de diente de león envueltas en mesenterio vacuno y fermentadas bajo tierra en invierno.',
    ingredients: 'Flores de diente de león, mesenterio vacuno.',
    usage: 'Inoculante del compost para regular el sílice celular.',
    benefits: [
      'Conecta la planta con la luz ambiental y el silicio',
      'Atrae microorganismos beneficiosos al suelo'
    ],
    iconName: 'Wind'
  },
  {
    number: '507',
    name: 'Preparado de Valeriana (Valerian)',
    latinName: 'Valeriana officinalis',
    type: 'Compost Additive',
    description: 'Jugo exprimido de flores de valeriana diluido en agua tibia y rociado como manto térmico sobre la pila de compost.',
    ingredients: 'Flores frescas de valeriana silvestre.',
    usage: 'Se asperja sobre la superficie exterior del compost recién armado.',
    benefits: [
      'Crea un manto de protección térmica alrededor del compost',
      'Regula los procesos de fósforo en el abono'
    ],
    iconName: 'Flame'
  },
  {
    number: '508',
    name: 'Preparado de Cola de Caballo (Horsetail)',
    latinName: 'Equisetum arvense',
    type: 'Field Spray',
    description: 'Té decocido de cola de caballo rica en sílice vegetal, hervido durante 20 minutos y pulverizado en primavera y verano.',
    ingredients: 'Tallos secos o frescos de Equisetum arvense.',
    usage: 'Se rocía directamente sobre las hojas durante períodos de alta humedad.',
    benefits: [
      'Prevención natural contra oídio, mildiu y botritis en viñedos',
      'Fortalece los tejidos vegetales contra ataques fúngicos'
    ],
    iconName: 'Droplet'
  }
];

export const PRODUCERS: Producer[] = [
  {
    id: 'finca-biodinamica-cosmos',
    name: 'Finca Biodinámica Cosmos',
    category: 'Biodynamic Farm',
    status: 'Open',
    tagline: 'Oasis biodinámico artesanal, finca viva y bodega natural en Lavalle, Mendoza',
    region: 'Lavalle',
    location: 'Lavalle, Mendoza, Argentina',
    coordinates: { lat: -32.7214, lng: -68.5942 },
    yearsFarming: 15,
    certification: 'Certified Biodynamic Farm & Demeter Standards',
    description: 'Proyecto familiar agroecológico y bodega artesanal ubicado en el oasis norte de Lavalle, Mendoza. Finca Biodinámica Cosmos cultiva la tierra de desierto como un organismo vivo autosostenible que produce alimentos puros, vinos artesanales naturales, hortalizas de estación, plantas medicinales, olivas y cosmética natural.',
    story: 'Finca Biodinámica Cosmos es un proyecto familiar arraigado en Lavalle, Mendoza, nacido de la convicción de regenerar el suelo de desierto andino mediante la agricultura biodinámica. A través de la integración de compostaje vivo, animales de granja, cultivos de cobertura y el uso cuidadoso de las preparaciones biodinámicas (500–508), la finca ha transformado su paisaje en un refugio lleno de biodiversidad, plantas aromáticas y viñedos de cultivo limpio.',
    philosophy: 'Concebir la finca como un organismo holístico donde la tierra viva, los ritmos astronómicos, los animales y la comunidad humana se nutren mutuamente para generar alimentos puros e inspirar el aprendizaje consciente.',
    heroImage: '/producers/cosmos/casa.jpg',
    portraitImage: '/producers/cosmos/casa.jpg',
    galleryImages: [
      '/producers/cosmos/casa.jpg',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800'
    ],
    practices: [
      'Dinamización y aplicación ritmada de Preparado 500 (Boñiga) y 501 (Sílice)',
      'Inoculación de compost vegetal e integración animal para suelo vivo',
      'Siembra y cosecha guiada por el calendario astronómico lunar',
      'Conservación de floras nativas de lavanda, jarilla y aromáticas silvestres',
      'Vinificación artesanal sin aditivos sintéticos ni clarificantes industriales'
    ],
    sizeHectares: 20,
    familyHistory: 'Iniciada como un emprendimiento familiar de regeneración ecológica en Lavalle, Finca Biodinámica Cosmos se ha consolidado como un faro de aprendizaje biodinámico y producción artesanal en Mendoza.',
    contact: {
      phone: '+54 261 497 3201',
      email: 'contacto@fincacosmos.com.ar',
      address: 'Lavalle, Mendoza, Argentina',
      googleMapsUrl: 'https://maps.google.com/?q=-32.7214,-68.5942',
      website: 'https://www.fincacosmos.com.ar',
      instagram: 'https://www.instagram.com/fincacosmos/?hl=en'
    },
    experiences: [
      {
        title: 'Visitas Guiadas & Recorrido Biodinámico',
        description: 'Caminata guiada por la huerta viva, la bodega artesanal y los corrales de animales, comprendiendo los principios de la agricultura de Rudolf Steiner.',
        tag: 'Experiencia Educativa'
      },
      {
        title: 'Experiencia de Bodega Artesanal & Catas',
        description: 'Degustación de vinos naturales artesanales producidos en partidas limitadas acompañados de productos de la propia huerta de la finca.',
        tag: 'Vinos & Sabores'
      },
      {
        title: 'Talleres de Agricultura & Plantas Medicinales',
        description: 'Jornadas de aprendizaje sobre elaboración de compost biodinámico, uso de plantas aromáticas y cosmética botánica natural.',
        tag: 'Talleres'
      },
      {
        title: 'Paseos por la Huerta Organismo & Biodiversidad',
        description: 'Recorrido vivencial apreciando los cultivos de hortalizas reliquia, frótales ancestrales y los corredores biológicos nativos.',
        tag: 'Naturaleza'
      }
    ],
    produceCategories: [
      { name: 'Vinos Naturales & Artesanales', description: 'Cosechas de viñedo propio vinificadas sin aditivos sintéticos.', icon: 'Wine' },
      { name: 'Hortalizas Frescas de Estación', description: 'Verduras vivas cultivadas en huerta biodinámica compostada.', icon: 'Sprout' },
      { name: 'Frutas & Frutales Ancestrales', description: 'Cosechas de montaña en su punto astronómico de madurez.', icon: 'Leaf' },
      { name: 'Plantas Medicinales & Hierbas', description: 'Aromáticas secadas al sol para infusión y botica natural.', icon: 'Flower2' },
      { name: 'Aceite de Oliva Extra Virgen', description: 'Prensado en frío de olivares cuidados ecológicamente.', icon: 'Sun' },
      { name: 'Conservas Artesanales & Miel', description: 'Elaboraciones artesanales puras sin conservantes químicos.', icon: 'Sparkles' },
      { name: 'Cosmética Botánica Natural', description: 'Extractos vegetales e hidrolatos elaborados con hierbas de la finca.', icon: 'ShieldCheck' }
    ]
  },
  {
    id: 'bodega-stella-crinita',
    name: 'Bodega Stella Crinita',
    category: 'Winery',
    status: 'Temporarily Closed',
    tagline: 'Vinos biodinámicos naturales nacidos en la libertad del Valle de Uco',
    region: 'Valle de Uco',
    location: 'Vista Flores, Tunuyán, Mendoza',
    coordinates: { lat: -33.6391, lng: -69.1685 },
    yearsFarming: 14,
    certification: 'Demeter Certified Biodynamic & Natural Wine',
    description: 'Proyecto artesanal biodinámico de Joanna Foster y Ernesto Catena dedicado a vinos naturales sin sulfitos agregados, fermentados con levaduras indígenas bajo ritmos astronómicos.',
    story: 'Fundada por Joanna Foster y Ernesto Catena en Vista Flores, Bodega Stella Crinita nació con el propósito de cultivar viñedos sin intervención de agroquímicos, respetando el organismo de la finca y embotellando sin clarificantes ni sulfitos.',
    philosophy: 'Escuchar el ritmo cósmico de la uva, cultivar suelos vivos mediante preparados biodinámicos y permitir fermentaciones espontáneas puras.',
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600',
    portraitImage: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&q=80&w=800'
    ],
    practices: [
      'Aplicación sistemática del Preparado 500 (Boñiga en Cuerno) en otoño',
      'Fermentación espontánea con levaduras autóctonas del viñedo',
      'Cero sulfitos añadidos ni filtración industrial',
      'Siembra de cultivos de cobertura florales entre hileras'
    ],
    sizeHectares: 25,
    familyHistory: 'Inspirados por la filosofía biodinámica y el amor al terruño del Valle de Uco, Joanna y Ernesto transformaron la finca en un refugio agroecológico.',
    contact: {
      phone: '+54 261 482 1900',
      email: 'contacto@stellacrinita.com',
      address: 'Camino a Vista Flores s/n, Tunuyán, Mendoza',
      googleMapsUrl: 'https://maps.google.com/?q=-33.6391,-69.1685',
      website: 'https://stellacrinita.com',
      instagram: 'https://instagram.com/stellacrinita'
    }
  },
  {
    id: 'la-guadalupana-finca',
    name: 'La Guadalupana Finca',
    category: 'Biodynamic Farm',
    status: 'Open',
    tagline: 'Santuario agroecológico de hortalizas vivas, huevos de pastoreo y aceites del Valle de Uco',
    region: 'Valle de Uco',
    location: 'Tupungato, Valle de Uco, Mendoza',
    coordinates: { lat: -33.3751, lng: -69.1432 },
    yearsFarming: 11,
    certification: 'Demeter Certified Biodynamic Farm',
    description: 'Chacra autosuficiente dedicada al cultivo de verduras de estación, frutales ancestrales, producción de miel silvestre y huevos de gallinas criadas libres en pastura viva.',
    story: 'La Guadalupana Finca se concibió como un organismo granja completo donde la rotación de cultivos, la apicultura en jarilla silvestre y el pastoreo regenerativo alimentan la biología del suelo.',
    philosophy: 'Cultivar alimentos vivos con densidad nutricional superior mediante compost biodinámico maduro y agua pura de deshielo andino.',
    heroImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1600',
    portraitImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800'
    ],
    practices: [
      'Inoculación de compost propio con preparados de hierbas 502 al 507',
      'Pastoreo de gallinas ponedoras en parcelas rotativas',
      'Cero uso de plaguicidas sintéticos ni fertilizantes químicos',
      'Cosecha matutina el mismo día de distribución'
    ],
    sizeHectares: 30,
    familyHistory: 'Tres generaciones dedicadas a la horticultura de montaña que realizaron la transición biodinámica integral.',
    contact: {
      phone: '+54 261 512 8830',
      email: 'hola@laguadalupanafinca.com',
      address: 'Ruta Provincial 89, Gualtallary, Tupungato, Mendoza',
      googleMapsUrl: 'https://maps.google.com/?q=-33.3751,-69.1432',
      website: 'https://laguadalupanafinca.com',
      instagram: 'https://instagram.com/laguadalupanafinca'
    }
  },
  {
    id: 'cosmos-finca-biodinamica',
    name: 'Cosmos Finca Biodinámica - Bodega Artesanal',
    category: 'Winery',
    status: 'Open',
    tagline: 'Vinos artesanales nacidos en sintonía con las constelaciones en Maipú',
    region: 'Maipú',
    location: 'Coquimbito, Maipú, Mendoza',
    coordinates: { lat: -32.9812, lng: -68.7521 },
    yearsFarming: 16,
    certification: 'Demeter Certified Biodynamic Winery',
    description: 'Bodega artesanal pionera en Maipú enfocada en vinos criollos, Malbec de parcela y blancos expresivos fermentados en vasijas de barro y huevos de hormigón.',
    story: 'Cosmos Finca Biodinámica integra la producción vitivinícola artesanal con principios astronómicos antiguos. Sus viñedos centenarios de Maipú se cosechan exclusivamente en días de Fruto y Flor.',
    philosophy: 'Conectar la energía cósmica de las constelaciones con la vitalidad microbiana de los suelos históricos de Mendoza.',
    heroImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1600',
    portraitImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&q=80&w=800'
    ],
    practices: [
      'Dinamización de Preparado 501 (Sílice en Cuerno) al amanecer',
      'Cosecha manual alineada con el calendario astronómico Thun',
      'Crianza en vasijas de barro y hormigón neutro',
      'Conservación de flora silvestre de aromáticas nativas'
    ],
    sizeHectares: 18,
    familyHistory: 'Finca familiar recuperada con olivos y viñedos de 1940 reconvertida a agricultura biodinámica.',
    contact: {
      phone: '+54 261 497 3201',
      email: 'info@cosmosbiodinamica.com',
      address: 'Carril Urquiza 2100, Coquimbito, Maipú, Mendoza',
      googleMapsUrl: 'https://maps.google.com/?q=-32.9812,-68.7521',
      website: 'https://cosmosbiodinamica.com',
      instagram: 'https://instagram.com/cosmosbiodinamica'
    }
  },
  {
    id: 'bodega-alpamanta',
    name: 'Bodega Alpamanta',
    category: 'Winery',
    status: 'Open',
    tagline: 'Sustentabilidad y arquitectura biomimética en la Primera Zona de Mendoza',
    region: 'Luján de Cuyo',
    location: 'Ugarteche, Luján de Cuyo, Mendoza',
    coordinates: { lat: -33.1952, lng: -68.8912 },
    yearsFarming: 19,
    certification: 'Demeter Certified Biodynamic Estate',
    description: 'Bodega biodinámica emblemática en Ugarteche, Luján de Cuyo. Diseñada bajo conceptos de arquitectura bio-sustentable y certificada por Demeter.',
    story: 'Fundada en 2005 por tres amigos europeos (Patrick Blousson, Andrej Razumumovsky y Jean-Estephe Uston), Alpamanta significa "Amor a la Tierra" en idioma nativo Cuyo.',
    philosophy: 'Transformar el viñedo en un organismo equilibrado donde animales, plantas y seres humanos conviven en armonía ecológica.',
    heroImage: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=1600',
    portraitImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&q=80&w=800'
    ],
    practices: [
      'Tratamiento de efluentes mediante lagunas de fitoremediación',
      'Paneles solares y edificación bio-sustentable',
      'Llama y pastoreo ovino entre hileras de vid',
      'Uso estricto de preparados biodinámicos Demeter'
    ],
    sizeHectares: 35,
    familyHistory: 'Pionera en el desarrollo de la vitivinicultura biodinámica de gran escala en Luján de Cuyo.',
    contact: {
      phone: '+54 261 334 9102',
      email: 'visitas@alpamanta.com',
      address: 'Calle Cobos s/n, Ugarteche, Luján de Cuyo, Mendoza',
      googleMapsUrl: 'https://maps.google.com/?q=-33.1952,-68.8912',
      website: 'https://alpamanta.com',
      instagram: 'https://instagram.com/alpamanta'
    }
  },
  {
    id: 'germen-de-vida',
    name: 'Germen de Vida',
    category: 'Biodynamic Farm',
    status: 'Open',
    tagline: 'Granja biodinámica regenerativa de hortalizas, aceites y plantas medicinales',
    region: 'Luján de Cuyo',
    location: 'Agrelo, Luján de Cuyo, Mendoza',
    coordinates: { lat: -33.1189, lng: -68.8789 },
    yearsFarming: 13,
    certification: 'Demeter Certified Biodynamic Farm & Herbs',
    description: 'Granja agrícola regenerativa especializada en cultivos hortícolas orgánicos, hierbas aromáticas medicinales, olivo Arauco y harinas integrales molidas en piedra.',
    story: 'Germen de Vida nació como un proyecto comunitario enfocado en la soberanía alimentaria y la sanación del suelo mediante principios biodinámicos y agroecológicos.',
    philosophy: 'La salud humana refleja directamente la biodiversidad y nutrición del suelo donde germina el alimento.',
    heroImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1600',
    portraitImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800'
    ],
    practices: [
      'Molienda artesanal en muelas de granito para cereales enteros',
      'Elaboración de tés herbales preparados en días de Flor',
      'Sistemas de riego eficiente por goteo con agua de vertiente',
      'Compostaje enriquecido con preparado de ortiga 504'
    ],
    sizeHectares: 22,
    familyHistory: 'Emprendimiento regenerativo enfocado en la multiplicación de semillas nativas y bio-alimentos.',
    contact: {
      phone: '+54 261 681 4050',
      email: 'contacto@germendevida.com',
      address: 'Ruta 15 Km 32, Agrelo, Luján de Cuyo, Mendoza',
      googleMapsUrl: 'https://maps.google.com/?q=-33.1189,-68.8789',
      website: 'https://germendevida.com',
      instagram: 'https://instagram.com/germendevida'
    }
  }
];

export const PRODUCTS: Product[] = [
  // Finca Biodinámica Cosmos (Lavalle, Mendoza)
  {
    id: 'finca-cosmos-vino-artesanal-criolla',
    name: 'Finca Cosmos Criolla Grande Natural 2023',
    subtitle: 'Vino artesanal de viñedo centenario en Lavalle, fermentado en tinaja',
    category: 'Wine',
    price: 18400,
    unit: 'Botella 750ml',
    producerId: 'finca-biodinamica-cosmos',
    producerName: 'Finca Biodinámica Cosmos',
    location: 'Lavalle, Mendoza',
    harvestDate: 'Marzo 2023 (Día de Fruto)',
    images: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Elaborado artesanalmente en Lavalle a partir de uvas criollas centenarias de la finca viva. Fermentación silvestre sin agregados químicos.',
    biodynamicNotes: 'Cultivado bajo el organismo granja biodinámico en el oasis norte de Lavalle.',
    suggestedPairings: ['Empanadas mendocinas', 'Verduras asadas a las brasas', 'Quesos de cabra'],
    inStock: true,
    stockCount: 16,
    badge: 'Artisan Winery • Lavalle',
    rating: 5.0,
    reviewCount: 38
  },
  {
    id: 'finca-cosmos-cesta-hortalizas',
    name: 'Cesta de Hortalizas Biodinámicas Cosmos',
    subtitle: 'Verduras vivas de la huerta viva en Lavalle, cosechadas en día de raíz',
    category: 'Fresh Vegetables',
    price: 15800,
    unit: 'Caja de 5kg',
    producerId: 'finca-biodinamica-cosmos',
    producerName: 'Finca Biodinámica Cosmos',
    location: 'Lavalle, Mendoza',
    harvestDate: 'Día de Entrega',
    images: [
      'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Cosechadas al amanecer en la huerta de Lavalle. Incluye raíces, lechugas reliquia y acelga cultivadas con compost enriquecido.',
    biodynamicNotes: 'Libre de pesticidas sintéticos y regada con cuidado biológico.',
    inStock: true,
    stockCount: 18,
    badge: 'Cosecha Fresca de Huerta',
    rating: 4.9,
    reviewCount: 29
  },
  {
    id: 'finca-cosmos-infusion-medicinal',
    name: 'Infusión Botánica de Hierbas & Plantas Medicinales',
    subtitle: 'Mezcla de lavanda, jarilla y cedrón de la huerta aromática de Lavalle',
    category: 'Tea',
    price: 4200,
    unit: 'Bolsa 100g',
    producerId: 'finca-biodinamica-cosmos',
    producerName: 'Finca Biodinámica Cosmos',
    location: 'Lavalle, Mendoza',
    harvestDate: 'Febrero 2024 (Día de Flor)',
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Plantas medicinales y aromáticas cultivadas y secadas a la sombra en Finca Biodinámica Cosmos.',
    biodynamicNotes: 'Recolectadas en la fase lunar óptima para preservar aceites esenciales.',
    inStock: true,
    stockCount: 24,
    badge: 'Botica Natural',
    rating: 4.9,
    reviewCount: 22
  },
  {
    id: 'finca-cosmos-aceite-oliva',
    name: 'Aceite de Oliva Extra Virgen Cosmos Arauco',
    subtitle: 'Prensado en frío de olivares agroecológicos de Lavalle',
    category: 'Olive Oil',
    price: 13900,
    unit: 'Botella de vidrio 500ml',
    producerId: 'finca-biodinamica-cosmos',
    producerName: 'Finca Biodinámica Cosmos',
    location: 'Lavalle, Mendoza',
    harvestDate: 'Mayo 2024',
    images: [
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Olivas maduradas al sol de Lavalle, cosechadas a mano e inmediatamente prensadas mecánicamente.',
    biodynamicNotes: 'Suelo de olivar protegido con abonos verdes y biodiversidad animal.',
    inStock: true,
    stockCount: 30,
    badge: 'Prensado en Frío',
    rating: 5.0,
    reviewCount: 31
  },
  {
    id: 'finca-cosmos-cosmetica-hidrolato',
    name: 'Hidrolato Orgánico de Lavanda & Jarilla',
    subtitle: 'Cosmética botánica pura extraída por destilación al vapor',
    category: 'Natural Cosmetics',
    price: 6500,
    unit: 'Frasco de vidrio con brumizador 100ml',
    producerId: 'finca-biodinamica-cosmos',
    producerName: 'Finca Biodinámica Cosmos',
    location: 'Lavalle, Mendoza',
    harvestDate: 'Marzo 2024',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Tónico facial y corporal 100% vegetal elaborado con flores y hojas destiladas de Finca Biodinámica Cosmos.',
    biodynamicNotes: 'Extractos puros libres de aromas sintéticos, parabenos o derivados del petróleo.',
    inStock: true,
    stockCount: 15,
    badge: 'Cosmética Botánica',
    rating: 4.9,
    reviewCount: 19
  },

  // Bodega Stella Crinita (Winery)
  {
    id: 'stella-crinita-malbec',
    name: 'Stella Crinita Malbec Natural 2022',
    subtitle: 'Malbec sin sulfitos fermentado con levaduras indígenas de Vista Flores',
    category: 'Wine',
    price: 19500,
    unit: 'Botella 750ml',
    producerId: 'bodega-stella-crinita',
    producerName: 'Bodega Stella Crinita',
    location: 'Vista Flores, Valle de Uco',
    harvestDate: 'Abril 2022 (Día de Fruto)',
    images: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Elaborado por Joanna Foster y Ernesto Catena. Cero sulfitos agregados, fermentación salvaje y crianza en piletas neutras.',
    biodynamicNotes: 'Viñedo dinamizado con Preparado 500 y cultivado según el calendario de Maria Thun.',
    suggestedPairings: ['Hongos salteados', 'Quesos de montaña', 'Verduras grilladas'],
    inStock: false,
    stockCount: 0,
    badge: 'Sin Sulfitos • Demeter',
    rating: 4.9,
    reviewCount: 28
  },
  {
    id: 'stella-crinita-cabernet-franc',
    name: 'Stella Crinita Cabernet Franc 2021',
    subtitle: 'Cabernet Franc de parcela alta con perfil herbal y floral',
    category: 'Wine',
    price: 21000,
    unit: 'Botella 750ml',
    producerId: 'bodega-stella-crinita',
    producerName: 'Bodega Stella Crinita',
    location: 'Vista Flores, Valle de Uco',
    harvestDate: 'Marzo 2021 (Día de Fruto)',
    images: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Cosechado a mano en el pico de madurez foliar. Expresión pura de Cabernet Franc de montaña.',
    biodynamicNotes: 'Preparado 501 aplicado al amanecer para maximizar la síntesis aromática.',
    inStock: false,
    stockCount: 0,
    badge: 'Natural Wine',
    rating: 5.0,
    reviewCount: 19
  },
  {
    id: 'stella-crinita-rose',
    name: 'Stella Crinita Rosé de Barbera 2023',
    subtitle: 'Rosado natural fresco y vibrante con notas de cereza y lavanda',
    category: 'Wine',
    price: 16800,
    unit: 'Botella 750ml',
    producerId: 'bodega-stella-crinita',
    producerName: 'Bodega Stella Crinita',
    location: 'Vista Flores, Valle de Uco',
    harvestDate: 'Febrero 2023',
    images: [
      'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Prensado directo de racimos enteros. Fermentado suavemente a baja temperatura.',
    biodynamicNotes: 'Procesado exclusivamente en días de Flor.',
    inStock: false,
    stockCount: 0,
    badge: 'Edición Limitada',
    rating: 4.8,
    reviewCount: 14
  },

  // La Guadalupana Finca (Farm)
  {
    id: 'guadalupana-cesta-hortalizas',
    name: 'Cajón de Hortalizas Vivas de Estación',
    subtitle: 'Cesta fresca de raíces, lechugas y aromáticas cosechadas al amanecer',
    category: 'Fresh Vegetables',
    price: 16500,
    unit: 'Cajón de 5kg aprox.',
    producerId: 'la-guadalupana-finca',
    producerName: 'La Guadalupana Finca',
    location: 'Gualtallary, Tupungato',
    harvestDate: 'Día de la Entrega',
    images: [
      'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Incluye kale morado, zanahorias reliquia, rabanitos y espinaca andina cultivados en suelo enriquecido con compost propio.',
    biodynamicNotes: 'Cultivadas con inoculación de compost Preparado 502 al 507.',
    inStock: true,
    stockCount: 20,
    badge: 'Cosecha del Día',
    rating: 4.9,
    reviewCount: 45
  },
  {
    id: 'guadalupana-huevos-pastoreo',
    name: 'Huevos Agroecológicos de Pastoreo',
    subtitle: 'Huevos de gallinas criadas en praderas abiertas sin antibióticos',
    category: 'Eggs',
    price: 5200,
    unit: 'Docena de huevos frescos',
    producerId: 'la-guadalupana-finca',
    producerName: 'La Guadalupana Finca',
    location: 'Tupungato, Valle de Uco',
    harvestDate: 'Diario',
    images: [
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Gallinas ponedoras con acceso constante a pasturas verdes, lombrices y granos orgánicos.',
    biodynamicNotes: 'Gallineros rotativos alineados con el bienestar animal biodinámico.',
    inStock: true,
    stockCount: 35,
    badge: '100% Pastoreo',
    rating: 5.0,
    reviewCount: 62
  },
  {
    id: 'guadalupana-miel-jarilla',
    name: 'Miel Pura Cruda de Flor de Jarilla',
    subtitle: 'Miel silvestre sin pasteurizar cosechada a 1.300 metros',
    category: 'Honey',
    price: 7800,
    unit: 'Frasco de 500g',
    producerId: 'la-guadalupana-finca',
    producerName: 'La Guadalupana Finca',
    location: 'Gualtallary, Tupungato',
    harvestDate: 'Febrero 2024',
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Cosechada de colmenas biodinámicas entre flores silvestres de jarilla y tomillo andino.',
    biodynamicNotes: 'Cuidado apícola natural sin tratamientos químicos sintéticos.',
    inStock: true,
    stockCount: 25,
    badge: 'Cruda y Pura',
    rating: 4.9,
    reviewCount: 33
  },

  // Cosmos Finca Biodinámica (Winery)
  {
    id: 'cosmos-chardonnay-reserva',
    name: 'Cosmos Chardonnay Biodinámico 2022',
    subtitle: 'Chardonnay de fermentación lenta en vasijas de barro sin roble tostado',
    category: 'Wine',
    price: 17200,
    unit: 'Botella 750ml',
    producerId: 'cosmos-finca-biodinamica',
    producerName: 'Cosmos Finca Biodinámica',
    location: 'Coquimbito, Maipú',
    harvestDate: 'Marzo 2022 (Día de Fruto)',
    images: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Un Chardonnay mineral y fresco fermentado en tinajas de arcilla ancestrales.',
    biodynamicNotes: 'Uvas recolectadas durante el tránsito lunar por la constelación de Leo.',
    inStock: true,
    stockCount: 18,
    badge: 'Fermentación en Barro',
    rating: 4.8,
    reviewCount: 21
  },
  {
    id: 'cosmos-espumante-biodinamico',
    name: 'Cosmos Nature Espumante Pét-Nat 2023',
    subtitle: 'Espumante natural ancestral méthode ancestrale sin filtrar',
    category: 'Wine',
    price: 18900,
    unit: 'Botella 750ml',
    producerId: 'cosmos-finca-biodinamica',
    producerName: 'Cosmos Finca Biodinámica',
    location: 'Maipú, Mendoza',
    harvestDate: 'Febrero 2023',
    images: [
      'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Espumante Pét-Nat elaborado con Criolla Chica de viñedos de 1940. Burbuja fina y fruta viva.',
    biodynamicNotes: 'Embotellado en Luna Menguante para mayor claridad natural.',
    inStock: true,
    stockCount: 15,
    badge: 'Pét-Nat Ancestral',
    rating: 5.0,
    reviewCount: 17
  },

  // Bodega Alpamanta (Winery)
  {
    id: 'alpamanta-breva-malbec',
    name: 'Alpamanta Breva Malbec Biodinámico 2021',
    subtitle: 'Malbec sin filtrar criado en esferas de hormigón biodinámicas',
    category: 'Wine',
    price: 22500,
    unit: 'Botella 750ml',
    producerId: 'bodega-alpamanta',
    producerName: 'Bodega Alpamanta',
    location: 'Ugarteche, Luján de Cuyo',
    harvestDate: 'Abril 2021',
    images: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Nacido en la finca certificada por Demeter en Ugarteche. Expresión pura de violetas y ciruela silvestre.',
    biodynamicNotes: 'Viñedo certificado Demeter con manejo de animales y energía solar integral.',
    inStock: true,
    stockCount: 30,
    badge: 'Demeter Certified',
    rating: 4.9,
    reviewCount: 52
  },
  {
    id: 'alpamanta-cabernet-franc',
    name: 'Alpamanta Natal Cabernet Franc 2022',
    subtitle: 'Cabernet Franc biodinámico con crianza en piletas subterráneas',
    category: 'Wine',
    price: 19800,
    unit: 'Botella 750ml',
    producerId: 'bodega-alpamanta',
    producerName: 'Bodega Alpamanta',
    location: 'Luján de Cuyo, Mendoza',
    harvestDate: 'Marzo 2022',
    images: [
      'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Estructura elegante, taninos sedosos y notas a pimiento rojo asado y grafito.',
    biodynamicNotes: 'Dinamización de Preparado 500 en primavera.',
    inStock: true,
    stockCount: 22,
    badge: 'Luján de Cuyo Terroir',
    rating: 4.8,
    reviewCount: 31
  },

  // Germen de Vida (Farm)
  {
    id: 'germen-aceite-oliva-arauco',
    name: 'Aceite de Oliva Extra Virgen Arauco Demeter',
    subtitle: 'Olivas de árboles antiguos prensadas en frío mecánicamente',
    category: 'Olive Oil',
    price: 14200,
    unit: 'Botella de vidrio 500ml',
    producerId: 'germen-de-vida',
    producerName: 'Germen de Vida',
    location: 'Agrelo, Luján de Cuyo',
    harvestDate: 'Mayo 2024',
    images: [
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Primera extracción en frío dentro de las 4 horas de cosecha manual en Agrelo.',
    biodynamicNotes: 'Suelo mantenido con cultivos de trébol rojo sin arado.',
    inStock: true,
    stockCount: 40,
    badge: 'Extracción en Frío',
    rating: 5.0,
    reviewCount: 44
  },
  {
    id: 'germen-harina-centeno',
    name: 'Harina Integral de Centeno Molida a Piedra',
    subtitle: 'Molienda lenta en muelas de granito para preservar germen de trigo',
    category: 'Flours',
    price: 4900,
    unit: 'Paquete 1kg',
    producerId: 'germen-de-vida',
    producerName: 'Germen de Vida',
    location: 'Agrelo, Luján de Cuyo',
    harvestDate: 'Enero 2024',
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Cereales biodinámicos molidos suavemente a baja temperatura para conservar nutrientes y enzimas activas.',
    biodynamicNotes: 'Rotación con leguminosas según el calendario cósmico.',
    inStock: true,
    stockCount: 50,
    badge: 'Grano Entero',
    rating: 4.9,
    reviewCount: 20
  },
  {
    id: 'germen-hierbas-medicinales',
    name: 'Té Herbal Bio Cedrón & Jarilla del Aconcagua',
    subtitle: 'Mezcla de hierbas aromáticas recolectadas a mano en día de Flor',
    category: 'Tea',
    price: 3800,
    unit: 'Bolsa 80g en hebras',
    producerId: 'germen-de-vida',
    producerName: 'Germen de Vida',
    location: 'Agrelo, Mendoza',
    harvestDate: 'Abril 2024 (Día de Flor)',
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Hierbas digestivas y aromáticas secadas a la sombra bajo brisa andina.',
    biodynamicNotes: 'Recolectadas en Días de Flor cuando los aceites alcanzan su pico.',
    inStock: true,
    stockCount: 30,
    badge: 'Cosecha Silvestre',
    rating: 4.8,
    reviewCount: 16
  }
];

export const EDU_ARTICLES: EduArticle[] = [
  {
    id: 'what-is-biodynamics',
    title: 'La Finca como un Organismo Vivo: La Visión de Rudolf Steiner',
    category: 'Principles',
    summary: 'Descubrí cómo la agricultura biodinámica concibe al suelo, cultivos, animales y agricultores como órganos interconectados de un solo ser vivo.',
    content: `La agricultura biodinámica fue introducida en 1924 a través del ciclo de conferencias del científico y filósofo Rudolf Steiner...`,
    readTime: 'Lectura de 5 min',
    author: 'Dr. Lucas Mendoza',
    date: '12 de Octubre, 2024',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    keyTakeaways: [
      'Cero agroquímicos sintéticos: sin glifosato ni fertilizantes nitrogenados de síntesis.',
      'Autosuficiencia: generación propia de semillas, abono y compost en la propia finca.',
      'Ritmo y sincronía: siembra y cosecha según los ciclos astronómicos y las estaciones.'
    ]
  }
];

export const MENDOZA_DELIVERY_ZONES = [
  { id: 'zone-1', name: 'Mendoza Capital y Guaymallén', fee: 0, minOrder: 12000, estimatedHours: '24 horas' },
  { id: 'zone-2', name: 'Godoy Cruz y Las Heras', fee: 1500, minOrder: 12000, estimatedHours: '24 horas' },
  { id: 'zone-3', name: 'Luján de Cuyo y Chacras de Coria', fee: 2200, minOrder: 15000, estimatedHours: '24-48 horas' },
  { id: 'zone-4', name: 'Maipú y Coquimbito', fee: 2500, minOrder: 15000, estimatedHours: '24-48 horas' },
  { id: 'zone-5', name: 'Valle de Uco (Tunuyán, Tupungato, San Carlos)', fee: 3800, minOrder: 25000, estimatedHours: '48-72 horas' }
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