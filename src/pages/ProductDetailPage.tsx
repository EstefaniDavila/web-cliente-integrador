import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Check, ChevronRight, Wrench, Calendar } from 'lucide-react';
import { formatPrice } from '../data/mockData';
import { useCartStore } from '../stores/cartStore';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const backend_host = import.meta.env.VITE_BACKEND_HOST;
        let mappedProduct = null;
        let allProducts = [];

        try {
          const res = await axios.get(`${backend_host}/api/v1/admin/products/${id}`);
          const p = res.data;
          mappedProduct = {
            id: p.id,
            name: p.name,
            description: p.description || 'Sin descripción detallada.',
            shortDescription: p.description?.substring(0, 80) || 'Producto sin descripción corta.',
            price: parseFloat(p.base_price) || 0,
            category: p.product_type === 'spare_part' ? 'repuestos' : p.product_type === 'accessory' ? 'accesorios' : 'maquinaria',
            image: p.product_images?.[0]?.url || 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800',
            inStock: p.active,
            specs: [{ label: 'Código', value: p.code }],
            features: []
          };
        } catch (err) {
          console.warn("Could not load product from backend, using mockData fallback:", err);
        }

        // If backend did not return product, search in mockData
        if (!mappedProduct) {
          const { products: mockProducts } = await import('../data/mockData');
          const mockP = mockProducts.find(item => item.id === id);
          if (mockP) {
            mappedProduct = {
              id: mockP.id,
              name: mockP.name,
              description: mockP.description,
              shortDescription: mockP.shortDescription,
              price: mockP.price,
              category: mockP.category,
              image: mockP.image,
              inStock: mockP.inStock,
              specs: mockP.specs || [],
              features: []
            };
          }
        }

        setProduct(mappedProduct);

        if (mappedProduct) {
          try {
            const resAll = await axios.get(`${backend_host}/api/v1/admin/products`);
            if (resAll.data && Array.isArray(resAll.data.data) && resAll.data.data.length > 0) {
              allProducts = resAll.data.data.map((rp: any) => ({
                id: rp.id,
                name: rp.name,
                price: parseFloat(rp.base_price) || 0,
                category: rp.product_type === 'spare_part' ? 'repuestos' : rp.product_type === 'accessory' ? 'accesorios' : 'maquinaria',
                image: rp.product_images?.[0]?.url || 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800'
              }));
            }
          } catch (err) {
            console.warn("Could not load related products from backend:", err);
          }

          if (allProducts.length === 0) {
            const { products: mockProducts } = await import('../data/mockData');
            allProducts = mockProducts;
          }

          setRelated(allProducts.filter((rp: any) => rp.category === mappedProduct.category && rp.id !== mappedProduct.id).slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>Cargando producto...</main>;
  }

  if (!product) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', marginBottom: '16px' }}>Producto no encontrado</h1>
          <Link to="/productos" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#B89600', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>
            <ArrowLeft size={16} /> Volver al catálogo
          </Link>
        </div>
      </main>
    );
  }

  const isMachinery = product.category === 'maquinaria';
  const isPart = product.category === 'repuestos';

  const handleAddToQuote = () => {
    addItem(product, 'cotizacion');
    // Show a brief notification or navigate to cart
    navigate('/carrito');
  };

  const handleRequestRental = () => {
    addItem(product, 'alquiler');
    navigate('/carrito');
  };

  const handleRequestMaintenance = () => {
    // Navigate to maintenance request page with this product pre-selected
    navigate(`/solicitar-mantenimiento?producto=${product.id}`);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '48px', fontSize: '12px', color: '#9ca3af', fontWeight: 600 }}>
            <Link to="/" style={{ color: '#9ca3af', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Inicio</Link>
            <ChevronRight size={13} />
            <Link to="/productos" style={{ color: '#9ca3af', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Productos</Link>
            <ChevronRight size={13} />
            <span style={{ color: '#1B1B1B', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{product.name}</span>
          </nav>
        </div>
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '48px 40px 80px' }}>

        {/* Main layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', marginBottom: '80px' }} className="detail-grid">

          {/* Image */}
          <div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid #e5e7eb', backgroundColor: 'white', position: 'relative' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
              />
              <span style={{ position: 'absolute', top: '16px', left: '16px', padding: '6px 14px', backgroundColor: '#FFCD11', color: '#1B1B1B', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '6px', boxShadow: '2px 2px 0 0 #B89600' }}>
                {product.category}
              </span>
            </div>
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '12px' }}>
                {product.name}
              </h1>
              <div style={{ width: '40px', height: '4px', backgroundColor: '#FFCD11' }} />
            </div>

            <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.7 }}>{product.description}</p>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', padding: '20px', backgroundColor: '#1B1B1B', borderRadius: '10px' }}>
              <span style={{ fontSize: '40px', fontWeight: 900, color: '#FFCD11', lineHeight: 1 }}>{formatPrice(product.price)}</span>
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: 700 }}>USD</span>
            </div>

            {/* Specs */}
            <div style={{ backgroundColor: 'white', border: '2px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', backgroundColor: '#1B1B1B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 900, color: '#FFCD11', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Especificaciones Técnicas</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: '#e5e7eb' }}>
                {product.specs.map((spec: any) => (
                  <div key={spec.label} style={{ backgroundColor: 'white', padding: '14px 18px' }}>
                    <span style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>{spec.label}</span>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#1B1B1B', marginTop: '4px', display: 'block' }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Primary actions */}
              <div style={{ display: 'grid', gridTemplateColumns: isMachinery ? '1fr 1fr' : '1fr', gap: '12px' }}>
                <button
                  onClick={handleAddToQuote}
                  id="add-to-quote"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 20px', backgroundColor: '#FFCD11', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1B1B1B', boxShadow: '0 4px 0 0 #B89600' }}
                >
                  <ShoppingCart size={18} /> {isPart ? 'Comprar Ahora' : 'Cotizar Compra'}
                </button>

                {isMachinery && (
                  <button
                    onClick={handleRequestRental}
                    id="request-rental"
                    style={{ padding: '14px 20px', backgroundColor: 'white', border: '2px solid #1B1B1B', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1B1B1B', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <Calendar size={18} /> Alquilar
                  </button>
                )}
              </div>

              {/* Maintenance button for machinery */}
              {isMachinery && (
                <button
                  onClick={handleRequestMaintenance}
                  id="request-maintenance"
                  style={{ padding: '14px 20px', backgroundColor: '#10b981', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 0 0 #059669' }}
                >
                  <Wrench size={18} /> Solicitar Mantenimiento
                </button>
              )}
            </div>

            {/* Guarantees */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Garantía extendida incluida',
                'Envío a todo el país',
                isMachinery ? 'Capacitación del operador' : 'Repuesto 100% original'
              ].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#FFCD11', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={12} color="#1B1B1B" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '13px', color: '#374151', fontWeight: 600 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Productos Relacionados</h2>
              <div style={{ width: '32px', height: '3px', backgroundColor: '#FFCD11', marginTop: '8px' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {related.map((p) => (
                <Link key={p.id} to={`/productos/${p.id}`} style={{ textDecoration: 'none', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e5e7eb', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
                >
                  <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', marginBottom: '6px' }}>{p.name}</h3>
                    <p style={{ fontSize: '16px', fontWeight: 900, color: '#1B1B1B' }}>{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}