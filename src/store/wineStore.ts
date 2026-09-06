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
    name: 'Atardecer',
    line: 'VINO FINO DE MESA',
    description: 'Un rosado que captura la luz del atardecer en el Valle de Uco.',
    tastingNotes: 'Notas de frutos rojos frescos como frutillas y cerezas, con una acidez vibrante y un final refrescante.',
    pairing: 'Perfecto para ensaladas, mariscos y atardeceres de verano.',
    vintage: 2023,
    soil: 'Aluvial, franco arenoso.',
    altitude: '1100 msnm',
    price: 12500,
    image: '/images/wines/atardecer.png',
  },
  {
    id: '2',
    name: 'Divaricata',
    line: 'VINO FINO DE MESA',
    description: 'Un blanco fresco y floral, inspirado en la flora nativa de Mendoza.',
    tastingNotes: 'Aromas a flores blancas, durazno y notas cítricas. En boca es ligero, mineral y con buena persistencia.',
    pairing: 'Ideal con pescados, quesos suaves y platos vegetarianos.',
    vintage: 2023,
    soil: 'Aluvial con presencia de canto rodado.',
    altitude: '1100 msnm',
    price: 12500,
    image: '/images/wines/divaricata.png',
  },
  {
    id: '3',
    name: 'Rubiginosa',
    line: 'VINO FINO DE MESA',
    description: 'Un tinto que evoca la calidez de la tierra y la fruta madura.',
    tastingNotes: 'Notas de ciruela, moras y un toque especiado. Taninos suaves y un final amable.',
    pairing: 'Acompaña bien carnes rojas, pastas y guisos.',
    vintage: 2023,
    soil: 'Franco arenoso con algo de arcilla.',
    altitude: '1100 msnm',
    price: 13500,
    image: '/images/wines/rubiginosa.png',
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
