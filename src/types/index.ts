export interface ProducerContact {
  phone: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  website?: string;
  instagram?: string;
}

export interface FarmExperience {
  title: string;
  description: string;
  tag?: string;
}

export interface Producer {
  id: string;
  name: string;
  category: 'Winery' | 'Biodynamic Farm';
  status?: 'Open' | 'Temporarily Closed';
  tagline: string;
  region: 'Uco Valley' | 'Luján de Cuyo' | 'Maipú' | 'San Rafael' | 'Valle de Uco' | 'Lavalle';
  location: string;
  coordinates: { lat: number; lng: number };
  yearsFarming: number;
  certification: string;
  description: string;
  story: string;
  philosophy: string;
  heroImage: string;
  portraitImage: string;
  galleryImages: string[];
  practices: string[];
  sizeHectares: number;
  familyHistory: string;
  contact: ProducerContact;
  experiences?: FarmExperience[];
  produceCategories?: { name: string; description: string; icon: string }[];
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Fresh Vegetables' | 'Fruits' | 'Eggs' | 'Honey' | 'Olive Oil' | 'Wine' | 'Herbs' | 'Grains' | 'Flours' | 'Seeds' | 'Natural Preserves' | 'Tea' | 'Natural Cosmetics';
  price: number; // in ARS display
  unit: string;
  producerId: string;
  producerName: string;
  location: string;
  harvestDate: string;
  images: string[];
  story: string;
  biodynamicNotes: string;
  preparationUsed?: string;
  ingredients?: string[];
  nutritionFacts?: { label: string; value: string }[];
  suggestedPairings?: string[];
  recipeIdea?: { title: string; instructions: string };
  inStock: boolean;
  stockCount: number;
  badge?: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface EduArticle {
  id: string;
  title: string;
  category: 'Principles' | 'Preparations' | 'Lunar Calendar' | 'Soil Health' | 'Biodiversity' | 'Science';
  summary: string;
  content: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
  keyTakeaways: string[];
}

export interface PreparationInfo {
  number: string;
  name: string;
  latinName?: string;
  type: 'Field Spray' | 'Compost Additive';
  description: string;
  ingredients: string;
  usage: string;
  benefits: string[];
  iconName: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalPrice: number;
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  deliveryAddress: string;
  deliveryZone: string;
  deliveryDate: string;
  paymentMethod: 'Mercado Pago' | 'Credit Card' | 'Bank Transfer';
  trackingCode: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  deliveryZone: string;
  avatar: string;
  memberTier: 'Socio Biodinámico' | 'Socio Recolector' | 'Gran Reserva';
  memberSince: string;
  favorites: string[];
}