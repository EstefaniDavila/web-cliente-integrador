import { create } from 'zustand';
import type { User, Quotation, Order, ServiceRequest } from '../types';
import { mockQuotations, mockOrders, mockServiceRequests } from '../data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  quotations: Quotation[];
  orders: Order[];
  serviceRequests: ServiceRequest[];
  login: (email: string, password: string) => boolean;
  register: (data: { name: string; email: string; password: string; company: string; phone: string }) => boolean;
  logout: () => void;
  addQuotation: (quotation: Quotation) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  quotations: [],
  orders: [],
  serviceRequests: [],

  login: (email: string, _password: string) => {
    // Mock login - in production this would call the API
    const mockUser: User = {
      id: '1',
      name: 'Carlos Mendoza',
      email: email,
      company: 'Constructora del Pacífico S.A.',
      phone: '+57 300 123 4567',
    };

    set({
      user: mockUser,
      isAuthenticated: true,
      quotations: mockQuotations,
      orders: mockOrders,
      serviceRequests: mockServiceRequests,
    });

    return true;
  },

  register: (data) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
    };

    set({
      user: newUser,
      isAuthenticated: true,
      quotations: [],
      orders: [],
      serviceRequests: [],
    });

    return true;
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      quotations: [],
      orders: [],
      serviceRequests: [],
    });
  },

  addQuotation: (quotation) => {
    set({ quotations: [quotation, ...get().quotations] });
  },
}));
