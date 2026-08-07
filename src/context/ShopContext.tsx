import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserProfile, Producer } from '../types';
import { PRODUCTS, PRODUCERS, MENDOZA_DELIVERY_ZONES } from '../data/mockData';
import { getDefaultUser, MOCK_USERS, createMockUserFromInput } from '../utils/mockAuth';
import { showSuccess, showError } from '../utils/toast';

interface ShopContextType {
  products: Product[];
  producers: Producer[];
  cart: CartItem[];
  favorites: string[];
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
  // Auth state & mock methods
  isLoggedIn: boolean;
  user: UserProfile;
  login: (email: string, name?: string) => void;
  switchUser: (userId: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  availableMockUsers: UserProfile[];
  // Import Center actions
  addProducer: (producer: Producer) => void;
  addProducts: (newProducts: Product[]) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [producers, setProducers] = useState<Producer[]>(() => {
    const saved = localStorage.getItem('biomendoza_producers');
    return saved ? JSON.parse(saved) : PRODUCERS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('biomendoza_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });
  
  // Dynamic User State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('biomendoza_user');
    return saved ? JSON.parse(saved) : getDefaultUser();
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('biomendoza_logged_in');
    return saved !== null ? saved === 'true' : true;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('biomendoza_favs');
    return saved ? JSON.parse(saved) : user.favorites;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('biomendoza_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Initial Mock Orders using user's real address
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('biomendoza_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'BM-98214',
        date: '2024-11-10',
        items: [{ product: PRODUCTS[0], quantity: 2 }, { product: PRODUCTS[1], quantity: 1 }],
        totalPrice: 51200,
        status: 'Delivered',
        deliveryAddress: user.address,
        deliveryZone: user.deliveryZone,
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

  useEffect(() => {
    localStorage.setItem('biomendoza_producers', JSON.stringify(producers));
  }, [producers]);

  useEffect(() => {
    localStorage.setItem('biomendoza_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('biomendoza_logged_in', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('biomendoza_user', JSON.stringify(user));
  }, [user]);

  const addProducer = (newProducer: Producer) => {
    setProducers((prev) => {
      const idx = prev.findIndex((p) => p.id === newProducer.id || p.name.toLowerCase() === newProducer.name.toLowerCase());
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = newProducer;
        return copy;
      }
      return [newProducer, ...prev];
    });
  };

  const addProducts = (newProducts: Product[]) => {
    setProducts((prev) => {
      const updated = [...prev];
      newProducts.forEach((p) => {
        const existingIdx = updated.findIndex((item) => item.id === p.id);
        if (existingIdx >= 0) {
          updated[existingIdx] = p;
        } else {
          updated.unshift(p);
        }
      });
      return updated;
    });
  };

  const login = (email: string, name?: string) => {
    const existing = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    const newUser = existing ? existing : createMockUserFromInput(email, name);

    setUser(newUser);
    setFavorites(newUser.favorites);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    showSuccess(`¡Bienvenido de nuevo, ${newUser.name}!`);
  };

  const switchUser = (userId: string) => {
    const targetUser = MOCK_USERS.find((u) => u.id === userId) || MOCK_USERS[0];
    setUser(targetUser);
    setFavorites(targetUser.favorites);
    setIsLoggedIn(true);
    showSuccess(`Sesión cambiada a ${targetUser.name}`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    showSuccess('Sesión cerrada correctamente');
  };

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
    showSuccess(`Añadido ${product.name} al carrito`);
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
        showSuccess('Eliminado de tus favoritos');
        return prev.filter((id) => id !== productId);
      } else {
        showSuccess('Guardado en tus favoritos');
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
      showError('El carrito está vacío');
      throw new Error('Cart empty');
    }

    const newOrder: Order = {
      id: `BM-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      totalPrice: cartTotal,
      status: 'Preparing',
      deliveryAddress: address || user.address,
      deliveryZone: activeZone.name,
      deliveryDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      paymentMethod,
      trackingCode: `MDZ-EXPRESS-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showSuccess('¡Pedido realizado con éxito!');
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        producers,
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
        setSelectedCategory,
        isLoggedIn,
        user,
        login,
        switchUser,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        availableMockUsers: MOCK_USERS,
        addProducer,
        addProducts
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