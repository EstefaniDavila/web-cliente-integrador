export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'maquinaria' | 'repuestos' | 'accesorios';
  description: string;
  shortDescription: string;
  price: number;
  image: string;
  specs: { label: string; value: string }[];
  featured: boolean;
  inStock: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  type: 'compra' | 'cotizacion' | 'alquiler';
}

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  dni?: string;
  address?: string;
}

export interface Quotation {
  id: string;
  date: string;
  items: CartItem[];
  status: 'pendiente' | 'en_revision' | 'aprobada' | 'rechazada';
  total: number;
  notes: string;
}

export interface Order {
  id: string;
  quotationId: string;
  date: string;
  items: CartItem[];
  status: 'procesando' | 'confirmada' | 'en_camino' | 'entregada';
  total: number;
}

export interface ServiceRequest {
  id: string;
  type: 'mantenimiento' | 'reparacion' | 'inspeccion';
  machineInfo: string;
  date: string;
  status: 'pendiente' | 'programada' | 'en_proceso' | 'completada';
  description: string;
}
