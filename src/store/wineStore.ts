import { create } from 'zustand';

export interface Wine {
  id: string;
  slug: string;
  name: string;
  line: 'VINO FINO DE MESA' | 'CRUZA';
  variety: string;
  vintage: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  history: string;
  region: string;
  province: string;
  price: number;
  stock: number;
  status: 'available' | 'unavailable';
  isFeatured: boolean;
}

export interface CartItem extends Wine {
  quantity: number;
  isBox: boolean;
}

interface WineStoreState {
  wines: Wine[];
  cart: CartItem[];
  addToCart: (wine: Wine, isBox: boolean) => void;
  removeFromCart: (wineId: string, isBox: boolean) => void;
  updateQuantity: (wineId: string, isBox: boolean, quantity: number) => void;
  clearCart: () => void;
}

const initialWines: Wine[] = [
  {
    id: '1',
    slug: 'atardecer-rosado',
    name: 'Atardecer',
    line: 'VINO FINO DE MESA',
    variety: 'Rosado',
    vintage: 2023,
    image: '/images/wines/atardecer.png',
    gallery: [],
    shortDescription: 'Un rosado que captura la luz del atardecer en el Valle de Uco.',
    history: 'Nacido de la búsqueda de un vino fresco y expresivo, Atardecer es nuestro homenaje a los colores del cielo mendocino.',
    region: 'Tunuyán, Valle de Uco',
    province: 'Mendoza',
    price: 12500,
    stock: 100,
    status: 'available',
    isFeatured: true,
  },
  {
    id: '2',
    slug: 'divaricata-blanco',
    name: 'Divaricata',
    line: 'VINO FINO DE MESA',
    variety: 'Blanco',
    vintage: 2023,
    image: '/images/wines/divaricata.png',
    gallery: [],
    shortDescription: 'Un blanco fresco y floral, inspirado en la flora nativa de Mendoza.',
    history: 'Divaricata es el nombre de una flor silvestre que crece en nuestros viñedos, un símbolo de la biodiversidad que buscamos preservar.',
    region: 'Tunuyán, Valle de Uco',
    province: 'Mendoza',
    price: 12500,
    stock: 100,
    status: 'available',
    isFeatured: true,
  },
  {
    id: '3',
    slug: 'rubiginosa-tinto',
    name: 'Rubiginosa',
    line: 'VINO FINO DE MESA',
    variety: 'Tinto',
    vintage: 2023,
    image: '/images/wines/rubiginosa.png',
    gallery: [],
    shortDescription: 'Un tinto que evoca la calidez de la tierra y la fruta madura.',
    history: 'Rubiginosa, o rosa mosqueta, crece salvaje en los Andes. Este vino comparte su carácter resiliente y su encanto rústico.',
    region: 'Tunuyán, Valle de Uco',
    province: 'Mendoza',
    price: 13500,
    stock: 100,
    status: 'available',
    isFeatured: true,
  },
];

export const useWineStore = create<WineStoreState>((set) => ({
  wines: initialWines,
  cart: [],
  addToCart: (wine, isBox) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === wine.id && item.isBox === isBox);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === wine.id && item.isBox === isBox
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...wine, quantity: 1, isBox }] };
    }),
  removeFromCart: (wineId, isBox) =>
    set((state) => ({ cart: state.cart.filter((item) => !(item.id === wineId && item.isBox === isBox)) })),
  updateQuantity: (wineId, isBox, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === wineId && item.isBox === isBox ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
}));
