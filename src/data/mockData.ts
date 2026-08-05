import { Producer, Product, EduArticle, PreparationInfo } from '../types';

export const PRODUCERS: Producer[] = [
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