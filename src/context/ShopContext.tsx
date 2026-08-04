import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order } from '../types';
import { PRODUCTS, MENDOZA_DELIVERY_ZONES } from '../data/mockData';
import { showSuccess, showError } from '../utils/toast';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  favorites: string[]; // product IDs
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  selectedProductModal: Product | null;
  setSelectedProductModal: (p: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedZoneId: string;
  setSelectedZoneId: (zoneId: string) => void;
  cartSubtotal: number;
  deliveryFee: number;
  cartTotal: number;
  orders: Order[];
  placeOrder: (paymentMethod: 'Mercado Pago' | 'Credit Card' | 'Bank Transfer', address: string) => Order;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('biomendoza_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('biomendoza_favs');
    return saved ? JSON.parse(saved) : ['malbec-biodinamico-2022', 'aceite-oliva-agrelo-demeter'];
  });
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('biomendoza_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'BM-98214',
        date: '2024-11-10',
        items: [{ product: PRODUCTS[0], quantity: 2 }, { product: PRODUCTS[1], quantity: 1 }],
        totalPrice: 51200,
        status: 'Delivered',
        deliveryAddress: 'Av. Arístides Villanueva 420, Mendoza Capital',
        deliveryZone: 'Mendoza Capital & Guaymallén',
        deliveryDate: '2024-11-11',
        paymentMethod: 'Mercado Pago',
        trackingCode: 'MP-MDZ-889102'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('biomendoza_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('biomendoza_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('biomendoza_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
    showSuccess(`Added ${product.name} to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showSuccess('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showSuccess('Added to wishlist');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const activeZone = MENDOZA_DELIVERY_ZONES.find((z) => z.id === selectedZoneId) || MENDOZA_DELIVERY_ZONES[0];
  const deliveryFee = cartSubtotal >= activeZone.minOrder ? 0 : activeZone.fee;
  const cartTotal = cartSubtotal + deliveryFee;

  const placeOrder = (
    paymentMethod: 'Mercado Pago' | 'Credit Card' | 'Bank Transfer',
    address: string
  ): Order => {
    if (cart.length === 0) {
      showError('Cart is empty!');
      throw new Error('Cart empty');
    }

    const newOrder: Order = {
      id: `BM-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      totalPrice: cartTotal,
      status: 'Preparing',
      deliveryAddress: address || 'Chacras de Coria, Luján de Cuyo',
      deliveryZone: activeZone.name,
      deliveryDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      paymentMethod,
      trackingCode: `MDZ-EXPRESS-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showSuccess('Order successfully placed! Tracking code generated.');
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        isFavorite,
        selectedProductModal,
        setSelectedProductModal,
        isCartOpen,
        setIsCartOpen,
        selectedZoneId,
        setSelectedZoneId,
        cartSubtotal,
        deliveryFee,
        cartTotal,
        orders,
        placeOrder,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};