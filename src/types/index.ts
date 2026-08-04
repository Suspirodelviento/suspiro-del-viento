export interface Producer {
  id: string;
  name: string;
  tagline: string;
  region: 'Uco Valley' | 'Luján de Cuyo' | 'Maipú' | 'San Rafael' | 'Valle de Uco';
  location: string;
  coordinates: { lat: number; lng: number };
  yearsFarming: number;
  certification: string; // e.g. "Demeter Certified Biodynamic"
  story: string;
  philosophy: string;
  heroImage: string;
  portraitImage: string;
  galleryImages: string[];
  practices: string[];
  sizeHectares: number;
  familyHistory: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Fresh Vegetables' | 'Fruits' | 'Eggs' | 'Honey' | 'Olive Oil' | 'Wine' | 'Herbs' | 'Grains' | 'Flours' | 'Seeds' | 'Natural Preserves' | 'Tea';
  price: number; // in ARS or USD display
  unit: string;
  producerId: string;
  producerName: string;
  location: string;
  harvestDate: string;
  images: string[];
  story: string;
  biodynamicNotes: string;
  preparationUsed?: string; // e.g. "Prep 500 Horn Manure"
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