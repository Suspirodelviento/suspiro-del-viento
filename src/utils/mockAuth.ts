import { UserProfile } from '../types';

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'user-001',
    name: 'Mateo Paz',
    email: 'mateo.paz@biomendoza.com',
    phone: '+54 261 482 1904',
    address: 'Av. Belgrano 1150, Mendoza Capital',
    deliveryZone: 'Mendoza Capital y Guaymallén',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    memberTier: 'Socio Biodinámico',
    memberSince: '2023',
    favorites: ['malbec-biodinamico-2022', 'aceite-oliva-agrelo-demeter']
  },
  {
    id: 'user-002',
    name: 'Camila Navarro',
    email: 'camila.navarro@biomendoza.com',
    phone: '+54 261 639 8812',
    address: 'Italia 520, Chacras de Coria, Luján de Cuyo',
    deliveryZone: 'Luján de Cuyo y Chacras de Coria',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    memberTier: 'Gran Reserva',
    memberSince: '2022',
    favorites: ['miel-silvestre-jarilla', 'cesta-hortalizas-estacion']
  },
  {
    id: 'user-003',
    name: 'Lucas Giménez',
    email: 'lucas.gimenez@biomendoza.com',
    phone: '+54 261 310 7745',
    address: 'Paso de los Andes 890, Godoy Cruz',
    deliveryZone: 'Godoy Cruz y Las Heras',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    memberTier: 'Socio Recolector',
    memberSince: '2024',
    favorites: ['harina-centeno-integral-biodinamic', 'infusion-hierbas-andinas']
  },
  {
    id: 'user-004',
    name: 'Valentina Silva',
    email: 'valentina.silva@biomendoza.com',
    phone: '+54 261 519 2301',
    address: 'Calle San Martín 1420, Maipú, Mendoza',
    deliveryZone: 'Maipú y Coquimbito',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    memberTier: 'Gran Reserva',
    memberSince: '2021',
    favorites: ['malbec-biodinamico-2022', 'dulce-membrillo-artesanal']
  }
];

export const getRandomMockUser = (): UserProfile => {
  const index = Math.floor(Math.random() * MOCK_USERS.length);
  return MOCK_USERS[index];
};

export const getDefaultUser = (): UserProfile => {
  return MOCK_USERS[0];
};

export const createMockUserFromInput = (email: string, name?: string): UserProfile => {
  const generatedName = name && name.trim() !== '' ? name : email.split('@')[0].replace('.', ' ');
  const formattedName = generatedName.charAt(0).toUpperCase() + generatedName.slice(1);

  return {
    id: `user-${Date.now()}`,
    name: formattedName,
    email: email.toLowerCase(),
    phone: '+54 261 ' + Math.floor(1000000 + Math.random() * 9000000),
    address: 'Calle Las Heras 340, Mendoza Capital',
    deliveryZone: 'Mendoza Capital y Guaymallén',
    avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200`,
    memberTier: 'Socio Biodinámico',
    memberSince: new Date().getFullYear().toString(),
    favorites: ['malbec-biodinamico-2022']
  };
};