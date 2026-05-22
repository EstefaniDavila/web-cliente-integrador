import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, SlidersHorizontal } from 'lucide-react';
import { formatPrice, categoryLabels, products as mockProducts } from '../data/mockData';
import { useCartStore } from '../stores/cartStore';
import axios from 'axios';

const categories = ['todos', 'maquinaria', 'repuestos', 'accesorios'] as const;

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const backend_host = import.meta.env.VITE_BACKEND_HOST;
        const res = await axios.get(`${backend_host}/api/v1/admin/products`);

        let mappedProducts = [];
        if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          mappedProducts = res.data.data.map((p: any) => ({
            id: p.id,
            name: p.name,
            description: p.description || 'Sin descripción detallada.',
            shortDescription: p.description?.substring(0, 80) || 'Producto sin descripción corta.',
            price: parseFloat(p.base_price) || 0,
            category: p.product_type === 'spare_part' ? 'repuestos' : p.product_type === 'accessory' ? 'accesorios' : 'maquinaria',
            image: p.product_images?.[0]?.url || 'https://img.magnific.com/foto-gratis/excavadora-cavando-suelo-luz-dia_23-2149194775.jpg?semt=ais_hybrid&w=740&q=80', // fallback image
            inStock: p.active,
            specs: { 'Código': p.code },
            features: []
          }));
        }

        if (mappedProducts.length === 0) {
          setProducts(mockProducts);
        } else {
          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Error fetching products from backend:", error);
        setProducts(mockProducts);
      }
    };

    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'todos' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, products]);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>

      {/* Header - dark split */}
      <section style={{ backgroundColor: '#1B1B1B', padding: '56px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle, #FFCD11 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '60px', backgroundColor: '#FFCD11', clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%)', opacity: 0.9 }} />

        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', backgroundColor: 'rgba(255,205,17,0.1)', border: '1px solid rgba(255,205,17,0.3)', borderRadius: '4px', marginBottom: '16px' }}>
            <SlidersHorizontal size={12} color="#FFCD11" />
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#FFCD11', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Catálogo Completo</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '12px' }}>
            Nuestros <span style={{ color: '#FFCD11' }}>Productos</span>
          </h1>
          <div style={{ width: '48px', height: '4px', backgroundColor: '#FFCD11', marginBottom: '16px' }} />
          <p style={{ fontSize: '15px', color: '#9ca3af', maxWidth: '500px', lineHeight: 1.7 }}>
            Maquinaria pesada, repuestos originales y accesorios de última generación.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 40px 80px' }}>

        {/* Filters bar */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="product-search"
              style={{ width: '100%', paddingLeft: '44px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px', backgroundColor: 'white', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#FFCD11'; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'; }}
            />
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                id={`filter-${cat}`}
                style={{
                  padding: '10px 20px', borderRadius: '6px', fontSize: '11px', fontWeight: 900,
                  textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', border: '2px solid',
                  transition: 'all 0.15s',
                  backgroundColor: activeCategory === cat ? '#FFCD11' : 'white',
                  borderColor: activeCategory === cat ? '#FFCD11' : '#e5e7eb',
                  color: activeCategory === cat ? '#1B1B1B' : '#6b7280',
                  boxShadow: activeCategory === cat ? '0 3px 0 0 #B89600' : 'none',
                }}
              >
                {cat === 'todos' ? 'Todos' : categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>
            Mostrando <strong style={{ color: '#1B1B1B', fontWeight: 900 }}>{filtered.length}</strong> producto{filtered.length !== 1 ? 's' : ''}
            {searchQuery && ` para "${searchQuery}"`}
          </span>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {filtered.map((product) => (
            <div key={product.id}
              style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 10px 24px rgba(0,0,0,0.1)'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; }}
            >
              <Link to={`/productos/${product.id}`} style={{ display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: '4/3', backgroundColor: '#f3f4f6' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.07)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
                <span style={{ position: 'absolute', top: '12px', left: '12px', padding: '4px 10px', backgroundColor: '#FFCD11', color: '#1B1B1B', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '4px' }}>
                  {product.category}
                </span>
                {product.inStock && (
                  <span style={{ position: 'absolute', top: '12px', right: '12px', padding: '4px 10px', backgroundColor: '#16a34a', color: 'white', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', borderRadius: '4px' }}>
                    En Stock
                  </span>
                )}
              </Link>

              <div style={{ padding: '20px' }}>
                <Link to={`/productos/${product.id}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.4em' }}>
                    {product.name}
                  </h3>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '2px solid #f3f4f6' }}>
                  <div>
                    <span style={{ fontSize: '20px', fontWeight: 900, color: '#1B1B1B' }}>{formatPrice(product.price)}</span>
                    <span style={{ fontSize: '11px', color: '#9ca3af', marginLeft: '4px', fontWeight: 700 }}>USD</span>
                  </div>
                  <button
                    onClick={() => addItem(product, 'cotizacion')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', backgroundColor: '#FFCD11', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1B1B1B', boxShadow: '0 3px 0 0 #B89600' }}
                  >
                    <ShoppingCart size={14} /> Cotizar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <Search size={36} color="#d1d5db" />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#374151', textTransform: 'uppercase', marginBottom: '8px' }}>Sin resultados</h3>
            <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px' }}>No se encontraron productos que coincidan con su búsqueda.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('todos'); }} style={{ padding: '12px 24px', backgroundColor: '#1B1B1B', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', cursor: 'pointer' }}>
              Limpiar Filtros
            </button>
          </div>
        )}
      </div>
    </main>
  );
}