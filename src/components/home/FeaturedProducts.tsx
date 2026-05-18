import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingCart } from 'lucide-react';
import { formatPrice, products as mockProducts } from '../../data/mockData';
import { useCartStore } from '../../stores/cartStore';
import axios from 'axios';

export default function FeaturedProducts() {
  const [featured, setFeatured] = useState<any[]>([]);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const fetchFeatured = async () => {
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
            image: p.product_images?.[0]?.url || 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800',
            inStock: p.active,
            specs: { 'Código': p.code },
            features: []
          }));
        }
        
        if (mappedProducts.length === 0) {
          setFeatured(mockProducts.slice(0, 4));
        } else {
          setFeatured(mappedProducts.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching featured products from backend:", error);
        setFeatured(mockProducts.slice(0, 4));
      }
    };
    
    fetchFeatured();
  }, []);

  return (
    <section style={{ backgroundColor: '#f9f9f9', padding: '80px 0', position: 'relative', overflow: 'hidden' }} id="featured-products">
      {/* Dot pattern */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', opacity: 0.03, backgroundImage: 'radial-gradient(circle, #1B1B1B 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '56px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', backgroundColor: 'rgba(255,205,17,0.15)', border: '1px solid rgba(255,205,17,0.4)', borderRadius: '4px', marginBottom: '14px' }}>
              <Star size={13} color="#B89600" fill="#B89600" />
              <span style={{ fontSize: '10px', fontWeight: 900, color: '#B89600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Productos Destacados</span>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1 }}>
              Lo Mejor del Catálogo
            </h2>
            <div style={{ width: '48px', height: '4px', backgroundColor: '#FFCD11', marginTop: '12px' }} />
          </div>
          <Link to="/productos" id="view-all-products" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 900, color: '#1B1B1B', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '10px 20px', border: '2px solid #1B1B1B', borderRadius: '6px' }}>
            Ver Todo <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="products-grid">
          {featured.map((product) => (
            <div key={product.id} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
            >
              {/* Image */}
              <Link to={`/productos/${product.id}`} style={{ display: 'block', position: 'relative', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
                {/* Category */}
                <span style={{ position: 'absolute', top: '12px', left: '12px', padding: '4px 10px', backgroundColor: '#FFCD11', color: '#1B1B1B', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '4px' }}>
                  {product.category}
                </span>
                {/* Star badge */}
                <div style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
                  <Star size={16} color="#FFCD11" fill="#FFCD11" />
                </div>
              </Link>

              {/* Info */}
              <div style={{ padding: '20px' }}>
                <Link to={`/productos/${product.id}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.5em' }}>
                    {product.name}
                  </h3>
                </Link>
                <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {product.shortDescription}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '2px solid #f3f4f6' }}>
                  <div>
                    <span style={{ fontSize: '20px', fontWeight: 900, color: '#1B1B1B' }}>{formatPrice(product.price)}</span>
                    <span style={{ fontSize: '11px', color: '#9ca3af', marginLeft: '4px', fontWeight: 700 }}>USD</span>
                  </div>
                  <button
                    onClick={() => addItem(product, 'cotizacion')}
                    style={{ width: '38px', height: '38px', backgroundColor: '#FFCD11', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 0 0 #B89600', transition: 'all 0.15s' }}
                    title="Agregar a cotización"
                  >
                    <ShoppingCart size={18} color="#1B1B1B" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}