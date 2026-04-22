import type { Product, Service, Quotation, Order, ServiceRequest } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Excavadora Hidráulica 320',
    slug: 'excavadora-hidraulica-320',
    category: 'maquinaria',
    description: 'La Excavadora Hidráulica 320 ofrece un rendimiento superior con mayor eficiencia de combustible. Diseñada para trabajos de excavación de mediana escala, esta máquina combina potencia, precisión y durabilidad para enfrentar los desafíos más exigentes del sitio de trabajo.',
    shortDescription: 'Excavadora de alto rendimiento para proyectos de construcción medianos y grandes.',
    price: 285000,
    image: 'https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=600&h=400&fit=crop',
    specs: [
      { label: 'Peso Operativo', value: '22,200 kg' },
      { label: 'Potencia del Motor', value: '162 HP' },
      { label: 'Profundidad de Excavación', value: '6.7 m' },
      { label: 'Capacidad del Cucharón', value: '1.19 m³' },
    ],
    featured: true,
    inStock: true,
  },
  {
    id: '2',
    name: 'Cargador Frontal 950M',
    slug: 'cargador-frontal-950m',
    category: 'maquinaria',
    description: 'El Cargador Frontal 950M establece el estándar en productividad y eficiencia operativa. Con su avanzado sistema de transmisión y controles intuitivos, maximiza la carga útil mientras reduce los costos por tonelada.',
    shortDescription: 'Cargador frontal versátil ideal para minería y construcción pesada.',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1648824874498-78ee242aeaa4?w=600&h=400&fit=crop',
    specs: [
      { label: 'Peso Operativo', value: '19,800 kg' },
      { label: 'Potencia del Motor', value: '215 HP' },
      { label: 'Capacidad del Cucharón', value: '3.4 m³' },
      { label: 'Fuerza de Desprendimiento', value: '18,500 kg' },
    ],
    featured: true,
    inStock: true,
  },
  {
    id: '3',
    name: 'Bulldozer D6',
    slug: 'bulldozer-d6',
    category: 'maquinaria',
    description: 'El Bulldozer D6 es la combinación perfecta de potencia y tecnología. Con su sistema de tren de rodaje duradero y la tecnología de control de pendientes, este tractor sobre orugas entrega un rendimiento de nivelación incomparable.',
    shortDescription: 'Tractor sobre orugas para nivelación y movimiento de tierras.',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
    specs: [
      { label: 'Peso Operativo', value: '20,390 kg' },
      { label: 'Potencia del Motor', value: '183 HP' },
      { label: 'Capacidad de la Hoja', value: '3.89 m³' },
      { label: 'Ancho de la Hoja', value: '3.26 m' },
    ],
    featured: true,
    inStock: true,
  },
  {
    id: '4',
    name: 'Retroexcavadora 420F2',
    slug: 'retroexcavadora-420f2',
    category: 'maquinaria',
    description: 'La Retroexcavadora 420F2 es la máquina más versátil de nuestro catálogo. Perfecta para trabajos de construcción urbana, servicios públicos y paisajismo. Su diseño compacto permite trabajar en espacios reducidos sin sacrificar potencia.',
    shortDescription: 'Máquina versátil para construcción urbana y servicios públicos.',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1621922688758-9a3a2e4a8e3b?w=600&h=400&fit=crop',
    specs: [
      { label: 'Peso Operativo', value: '10,950 kg' },
      { label: 'Potencia del Motor', value: '93 HP' },
      { label: 'Profundidad de Excavación', value: '4.3 m' },
      { label: 'Capacidad del Cucharón', value: '1.0 m³' },
    ],
    featured: true,
    inStock: true,
  },
  {
    id: '5',
    name: 'Filtro Hidráulico CAT 1R-0751',
    slug: 'filtro-hidraulico-1r-0751',
    category: 'repuestos',
    description: 'Filtro hidráulico original CAT de alta eficiencia. Diseñado para atrapar partículas microscópicas y proteger los componentes hidráulicos críticos de su maquinaria. Rendimiento garantizado de 500 horas.',
    shortDescription: 'Filtro hidráulico original para protección del sistema.',
    price: 85,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
    specs: [
      { label: 'Tipo', value: 'Hidráulico' },
      { label: 'Eficiencia', value: '99.9%' },
      { label: 'Intervalo de Cambio', value: '500 horas' },
      { label: 'Compatibilidad', value: 'Serie 300, 900' },
    ],
    featured: false,
    inStock: true,
  },
  {
    id: '6',
    name: 'Kit de Sellos para Cilindro',
    slug: 'kit-sellos-cilindro',
    category: 'repuestos',
    description: 'Kit completo de sellos para cilindro hidráulico. Incluye sellos de pistón, sellos de vástago, anillos de respaldo y juntas tóricas. Fabricados con materiales de alta resistencia para condiciones extremas.',
    shortDescription: 'Kit completo de sellos para cilindros hidráulicos.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop',
    specs: [
      { label: 'Componentes', value: '12 piezas' },
      { label: 'Material', value: 'Poliuretano/NBR' },
      { label: 'Resistencia Temp.', value: '-40°C a 110°C' },
      { label: 'Compatibilidad', value: 'Universal CAT' },
    ],
    featured: false,
    inStock: true,
  },
  {
    id: '7',
    name: 'Dientes de Cucharón GET',
    slug: 'dientes-cucharon-get',
    category: 'repuestos',
    description: 'Dientes de cucharón del sistema Ground Engaging Tools (GET). Fabricados con acero de alta resistencia al desgaste para maximizar la vida útil en condiciones de excavación severas.',
    shortDescription: 'Dientes de alta resistencia para cucharones de excavadoras.',
    price: 250,
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=400&fit=crop',
    specs: [
      { label: 'Material', value: 'Acero aleado' },
      { label: 'Cantidad', value: '5 unidades' },
      { label: 'Sistema', value: 'K Series' },
      { label: 'Durabilidad', value: '+30% vs estándar' },
    ],
    featured: false,
    inStock: true,
  },
  {
    id: '8',
    name: 'Sistema GPS de Precisión',
    slug: 'sistema-gps-precision',
    category: 'accesorios',
    description: 'Sistema de guía GPS de alta precisión para maquinaria pesada. Permite nivelación automática, mapeo del sitio en tiempo real y control de pendientes. Compatible con todas las excavadoras y bulldozers de la serie.',
    shortDescription: 'Control GPS de alta precisión para nivelación automatizada.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    specs: [
      { label: 'Precisión', value: '±2 cm' },
      { label: 'Conectividad', value: 'Satellite + 4G' },
      { label: 'Pantalla', value: '10" Touchscreen' },
      { label: 'Compatibilidad', value: 'Serie 300-900' },
    ],
    featured: false,
    inStock: true,
  },
  {
    id: '9',
    name: 'Cámara de Seguridad 360°',
    slug: 'camara-seguridad-360',
    category: 'accesorios',
    description: 'Sistema de cámara panorámica 360° para maquinaria pesada. Elimina puntos ciegos y mejora la seguridad del operador. Incluye visión nocturna y detección de proximidad con alertas sonoras.',
    shortDescription: 'Sistema de cámara 360° para máxima seguridad del operador.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop',
    specs: [
      { label: 'Cámaras', value: '4 HD' },
      { label: 'Visión Nocturna', value: 'Infrarroja' },
      { label: 'Pantalla', value: '7" LCD' },
      { label: 'Protección', value: 'IP69K' },
    ],
    featured: false,
    inStock: true,
  },
];

export const services: Service[] = [
  {
    id: '1',
    title: 'Venta de Maquinaria',
    description: 'Amplio catálogo de maquinaria pesada nueva y certificada. Excavadoras, cargadores, bulldozers, retroexcavadoras y más. Financiamiento disponible y garantía extendida.',
    icon: 'truck',
    features: [
      'Maquinaria nueva y certificada',
      'Planes de financiamiento flexibles',
      'Garantía extendida incluida',
      'Entrega e instalación en sitio',
    ],
  },
  {
    id: '2',
    title: 'Alquiler de Equipos',
    description: 'Servicio de alquiler a corto y largo plazo con mantenimiento incluido. Ideal para proyectos temporales o para probar antes de comprar. Flota siempre disponible.',
    icon: 'calendar',
    features: [
      'Alquiler diario, semanal o mensual',
      'Mantenimiento preventivo incluido',
      'Operador certificado disponible',
      'Seguro integral',
    ],
  },
  {
    id: '3',
    title: 'Repuestos Originales',
    description: 'Catálogo completo de repuestos originales CAT. Filtros, sellos, dientes, cadenas, rodillos y más. Envío express y asesoría técnica para identificar la pieza correcta.',
    icon: 'cog',
    features: [
      'Repuestos 100% originales',
      'Envío express a todo el país',
      'Asesoría técnica especializada',
      'Precios competitivos',
    ],
  },
  {
    id: '4',
    title: 'Mantenimiento y Reparación',
    description: 'Servicio técnico especializado con técnicos certificados. Mantenimiento preventivo programado, reparaciones mayores, diagnóstico por computadora y atención en sitio.',
    icon: 'wrench',
    features: [
      'Técnicos certificados CAT',
      'Mantenimiento preventivo programado',
      'Diagnóstico computarizado',
      'Servicio en sitio disponible',
    ],
  },
];

export const mockQuotations: Quotation[] = [
  {
    id: 'COT-2024-001',
    date: '2024-03-15',
    items: [
      {
        product: products[0],
        quantity: 1,
        type: 'cotizacion',
      },
      {
        product: products[4],
        quantity: 10,
        type: 'cotizacion',
      },
    ],
    status: 'aprobada',
    total: 285850,
    notes: 'Incluye entrega en obra y capacitación del operador.',
  },
  {
    id: 'COT-2024-002',
    date: '2024-03-20',
    items: [
      {
        product: products[1],
        quantity: 2,
        type: 'cotizacion',
      },
    ],
    status: 'en_revision',
    total: 640000,
    notes: 'Solicitud de financiamiento a 36 meses.',
  },
  {
    id: 'COT-2024-003',
    date: '2024-03-25',
    items: [
      {
        product: products[7],
        quantity: 3,
        type: 'cotizacion',
      },
    ],
    status: 'pendiente',
    total: 45000,
    notes: 'Para proyecto en zona norte.',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    quotationId: 'COT-2024-001',
    date: '2024-03-18',
    items: [
      {
        product: products[0],
        quantity: 1,
        type: 'compra',
      },
    ],
    status: 'en_camino',
    total: 285000,
  },
  {
    id: 'ORD-2024-002',
    quotationId: 'COT-2023-015',
    date: '2024-02-10',
    items: [
      {
        product: products[5],
        quantity: 5,
        type: 'compra',
      },
    ],
    status: 'entregada',
    total: 600,
  },
];

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: 'SRV-2024-001',
    type: 'mantenimiento',
    machineInfo: 'Excavadora 320 — Serie: CAT320-2024-A1',
    date: '2024-04-05',
    status: 'programada',
    description: 'Mantenimiento preventivo de 2000 horas. Cambio de aceites, filtros y revisión general.',
  },
  {
    id: 'SRV-2024-002',
    type: 'reparacion',
    machineInfo: 'Cargador 950M — Serie: CAT950-2023-B7',
    date: '2024-03-28',
    status: 'en_proceso',
    description: 'Reparación del sistema hidráulico. Fuga detectada en cilindro de levante.',
  },
  {
    id: 'SRV-2024-003',
    type: 'inspeccion',
    machineInfo: 'Bulldozer D6 — Serie: CATD6-2024-C3',
    date: '2024-04-15',
    status: 'pendiente',
    description: 'Inspección pre-compra solicitada. Verificar estado general de tren de rodaje.',
  },
];

export const categoryLabels: Record<string, string> = {
  maquinaria: 'Maquinaria Pesada',
  repuestos: 'Repuestos',
  accesorios: 'Accesorios',
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
