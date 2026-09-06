import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/integrations/supabase/client";

export interface Wine {
  id: string;
  slug: string;
  name: string;
  line: string;
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
  status: "available" | "unavailable";
  isFeatured: boolean;
  technicalData: string;
}

export interface CartItem extends Wine {
  quantity: number;
  isBox: boolean;
}

interface ProductImageRow {
  image_url: string;
  position: number;
}

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  collection: string;
  variety: string;
  vintage: number;
  description: string;
  price: number;
  stock: number;
  active: boolean;
  featured: boolean;
  technical_data: string | null;
  product_images: ProductImageRow[] | null;
}

interface WineStoreState {
  wines: Wine[];
  cart: CartItem[];
  catalogLoading: boolean;
  catalogError: string | null;
  fetchProducts: () => Promise<void>;
  addToCart: (wine: Wine, isBox: boolean, quantity?: number) => void;
  removeFromCart: (wineId: string, isBox: boolean) => void;
  updateQuantity: (wineId: string, isBox: boolean, quantity: number) => void;
  clearCart: () => void;
}

const mapProduct = (product: ProductRow): Wine => {
  const gallery = [...(product.product_images ?? [])]
    .sort((a, b) => a.position - b.position)
    .map((image) => image.image_url);

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    line: product.collection,
    variety: product.variety,
    vintage: product.vintage,
    image: gallery[0] ?? "/placeholder.svg",
    gallery,
    shortDescription: product.description,
    history: product.description,
    region: "Tunuyán, Valle de Uco",
    province: "Mendoza",
    price: Number(product.price),
    stock: product.stock,
    status: product.active && product.stock > 0 ? "available" : "unavailable",
    isFeatured: product.featured,
    technicalData: product.technical_data ?? '',
  };
};

export const useWineStore = create<WineStoreState>()(
  persist(
    (set, get) => ({
      wines: [],
      cart: [],
      catalogLoading: true,
      catalogError: null,
      fetchProducts: async () => {
        set({ catalogLoading: true, catalogError: null });
        const { data, error } = await supabase
          .from("products")
          .select("*, product_images(image_url, position)")
          .eq("active", true)
          .order("created_at", { ascending: true });

        if (error) {
          set({ catalogLoading: false, catalogError: "No pudimos cargar los vinos." });
          return;
        }

        const wines = (data as ProductRow[]).map(mapProduct);
        set((state) => ({
          wines,
          catalogLoading: false,
          cart: state.cart.flatMap((item) => {
            const currentWine = wines.find((wine) => wine.slug === item.slug);
            return currentWine ? [{ ...currentWine, quantity: item.quantity, isBox: item.isBox }] : [];
          }),
        }));
      },
      addToCart: (wine, isBox, quantity = 1) =>
        set((state) => {
          const requested = Math.max(1, Math.floor(quantity));
          const existingItem = state.cart.find((item) => item.id === wine.id && item.isBox === isBox);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === wine.id && item.isBox === isBox
                  ? { ...item, quantity: item.quantity + requested }
                  : item,
              ),
            };
          }
          return { cart: [...state.cart, { ...wine, quantity: requested, isBox }] };
        }),
      removeFromCart: (wineId, isBox) =>
        set((state) => ({
          cart: state.cart.filter((item) => !(item.id === wineId && item.isBox === isBox)),
        })),
      updateQuantity: (wineId, isBox, quantity) =>
        set((state) => ({
          cart:
            quantity < 1
              ? state.cart.filter((item) => !(item.id === wineId && item.isBox === isBox))
              : state.cart.map((item) =>
                  item.id === wineId && item.isBox === isBox ? { ...item, quantity } : item,
                ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "suspiro-del-viento-cart",
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);
