import { create } from 'zustand';

export interface Wine {
  id: string;
  name: string;
  line: 'VINO FINO DE MESA' | 'CRUZA';
  description: string;
  tastingNotes: string;
  pairing: string;
  vintage: number;
  soil: string;
  altitude: string;
  price: number;
  image: string;
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
    name: 'Vino Fino de Mesa',
    line: 'VINO FINO DE MESA',
    description: 'Un vino que expresa la amistad y la pasión por el hacer.',
    tastingNotes: 'Notas de frutos rojos, especias y un toque mineral. En boca es fluido, elegante y con un final persistente.',
    pairing: 'Ideal para acompañar carnes asadas, pastas con salsas intensas y quesos curados.',
    vintage: 2023,
    soil: 'Aluvial, franco arenoso con presencia de canto rodado.',
    altitude: '1100 msnm',
    price: 12500,
    image: '/placeholder.svg',
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
