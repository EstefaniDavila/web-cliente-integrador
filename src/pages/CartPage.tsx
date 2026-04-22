import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, ArrowLeft, Mail, User, Phone, Building2, Send, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { formatPrice } from '../data/mockData';

const inputStyle = {
  width: '100%', padding: '12px 16px 12px 44px', backgroundColor: 'white',
  border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px',
  color: '#374151', outline: 'none', boxSizing: 'border-box' as const,
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const { isAuthenticated, addQuotation } = useAuthStore();
  const navigate = useNavigate();

  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  const handleRequestQuote = () => {
    if (isAuthenticated) {
      addQuotation({ id: `COT-${Date.now()}`, date: new Date().toISOString().split('T')[0], items: [...items], status: 'pendiente' as const, total: getTotal(), notes: '' });
      clearCart();
      navigate('/dashboard');
    } else {
      setShowQuoteForm(true);
    }
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSent(true);
    setTimeout(() => { clearCart(); navigate('/'); }, 3000);
  };

  // Success state
  if (quoteSent) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#1B1B1B', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle, #FFCD11 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div style={{ textAlign: 'center', position: 'relative', maxWidth: '500px' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#FFCD11', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', boxShadow: '0 0 0 12px rgba(255,205,17,0.15)' }}>
            <CheckCircle2 size={40} color="#1B1B1B" />
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '12px' }}>¡Cotización Enviada!</h1>
          <div style={{ width: '40px', height: '4px', backgroundColor: '#FFCD11', margin: '0 auto 20px' }} />
          <p style={{ fontSize: '15px', color: '#9ca3af', lineHeight: 1.7, marginBottom: '8px' }}>
            Hemos recibido su solicitud y la hemos enviado a <strong style={{ color: '#FFCD11' }}>{form.email}</strong>
          </p>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '36px' }}>Nuestro equipo le contactará en las próximas 24 horas.</p>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', backgroundColor: '#FFCD11', color: '#1B1B1B', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', borderRadius: '8px', boxShadow: '0 4px 0 0 #B89600' }}>
            <ArrowLeft size={16} /> Volver al Inicio
          </Link>
        </div>
      </main>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ textAlign: 'center', maxWidth: '420px' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <ShoppingCart size={36} color="#9ca3af" />
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '8px' }}>Carrito Vacío</h1>
          <div style={{ width: '32px', height: '3px', backgroundColor: '#FFCD11', margin: '0 auto 16px' }} />
          <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '28px' }}>No tiene productos en su cotización.</p>
          <Link to="/productos" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: '#1B1B1B', color: 'white', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', borderRadius: '8px' }}>
            <ArrowLeft size={16} /> Ver Catálogo
          </Link>
        </div>
      </main>
    );
  }

  // Quote form
  if (showQuoteForm) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', padding: '60px 20px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '8px' }}>Complete sus Datos</h1>
            <div style={{ width: '40px', height: '4px', backgroundColor: '#FFCD11', margin: '0 auto 12px' }} />
            <p style={{ fontSize: '14px', color: '#6b7280' }}>Para enviarle la cotización por correo electrónico</p>
          </div>

          <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            <form onSubmit={handleSubmitQuote} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { field: 'name', label: 'Nombre Completo', icon: User, type: 'text', placeholder: 'Juan Pérez García' },
                  { field: 'email', label: 'Email', icon: Mail, type: 'email', placeholder: 'correo@empresa.com' },
                  { field: 'phone', label: 'Teléfono', icon: Phone, type: 'tel', placeholder: '+51 999 888 777' },
                  { field: 'company', label: 'Empresa', icon: Building2, type: 'text', placeholder: 'Constructora ABC' },
                ].map(({ field, label, icon: Icon, type, placeholder }) => (
                  <div key={field}>
                    <label style={{ display: 'block', fontSize: '10px', fontWeight: 900, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{label}</label>
                    <div style={{ position: 'relative' }}>
                      <Icon size={16} color="#9ca3af" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input type={type} value={(form as any)[field]} onChange={(e) => update(field, e.target.value)} required={field !== 'company'} placeholder={placeholder} style={inputStyle} />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 900, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Mensaje Adicional</label>
                <textarea value={form.message} onChange={(e) => update('message', e.target.value)} rows={3} placeholder="Coméntenos sobre su proyecto..." style={{ ...inputStyle, padding: '12px 16px', resize: 'none' }} />
              </div>

              {/* Summary box */}
              <div style={{ backgroundColor: '#1B1B1B', borderRadius: '10px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{items.length} producto{items.length !== 1 ? 's' : ''}</p>
                  <p style={{ fontSize: '22px', fontWeight: 900, color: 'white', marginTop: '2px' }}>{formatPrice(getTotal())}</p>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 900, color: '#FFCD11', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '6px 12px', backgroundColor: 'rgba(255,205,17,0.1)', border: '1px solid rgba(255,205,17,0.3)', borderRadius: '4px' }}>
                  Total Est.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setShowQuoteForm(false)} style={{ flex: 1, padding: '13px', backgroundColor: 'white', border: '2px solid #1B1B1B', borderRadius: '8px', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', cursor: 'pointer', color: '#1B1B1B' }}>
                  Volver
                </button>
                <button type="submit" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', backgroundColor: '#FFCD11', border: 'none', borderRadius: '8px', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', cursor: 'pointer', color: '#1B1B1B', boxShadow: '0 4px 0 0 #B89600' }}>
                  <Send size={16} /> Enviar Cotización
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // Main cart
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* Header */}
      <section style={{ backgroundColor: '#1B1B1B', padding: '48px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.12, backgroundImage: 'radial-gradient(circle, #FFCD11 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '60px', backgroundColor: '#FFCD11', clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%)', opacity: 0.9 }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '-0.03em', marginBottom: '6px' }}>
            Mi <span style={{ color: '#FFCD11' }}>Cotización</span>
          </h1>
          <div style={{ width: '40px', height: '4px', backgroundColor: '#FFCD11' }} />
          <p style={{ marginTop: '12px', fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>
            {items.length} producto{items.length !== 1 ? 's' : ''} en su carrito
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px', alignItems: 'start' }} className="cart-layout">

          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {items.map((item) => (
              <div key={item.product.id} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                {/* Image */}
                <img src={item.product.image} alt={item.product.name} style={{ width: '100px', height: '80px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link to={`/productos/${item.product.id}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: '4px' }}>
                      {item.product.name}
                    </h3>
                  </Link>
                  <span style={{ display: 'inline-block', padding: '2px 8px', backgroundColor: 'rgba(255,205,17,0.15)', borderRadius: '3px', fontSize: '10px', fontWeight: 900, color: '#B89600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {item.type === 'cotizacion' ? 'Cotización' : item.type === 'alquiler' ? 'Alquiler' : 'Compra'}
                  </span>
                </div>

                {/* Quantity */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f9f9f9', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '4px' }}>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} style={{ width: '32px', height: '32px', border: 'none', background: 'white', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <Minus size={14} />
                  </button>
                  <span style={{ width: '32px', textAlign: 'center', fontWeight: 900, fontSize: '16px' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ width: '32px', height: '32px', border: 'none', background: 'white', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <Plus size={14} />
                  </button>
                </div>

                {/* Price + remove */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '18px', fontWeight: 900, color: '#1B1B1B', marginBottom: '6px' }}>{formatPrice(item.product.price * item.quantity)}</p>
                  <button onClick={() => removeItem(item.product.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>
                    <Trash2 size={13} /> Eliminar
                  </button>
                </div>
              </div>
            ))}

            <Link to="/productos" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 900, color: '#6b7280', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>
              <ArrowLeft size={14} /> Seguir comprando
            </Link>
          </div>

          {/* Sidebar */}
          <div style={{ backgroundColor: '#1B1B1B', borderRadius: '16px', padding: '32px', position: 'sticky', top: '96px', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', backgroundColor: 'rgba(255,205,17,0.05)', borderRadius: '50%', transform: 'translate(30px, -30px)' }} />

            <h2 style={{ fontSize: '14px', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              Resumen
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>Subtotal</span>
                <span style={{ fontSize: '15px', fontWeight: 900, color: 'white' }}>{formatPrice(getTotal())}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>Logística</span>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#FFCD11', textTransform: 'uppercase' }}>Por Cotizar</span>
              </div>
              <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>Total Est.</span>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '28px', fontWeight: 900, color: '#FFCD11', lineHeight: 1 }}>{formatPrice(getTotal())}</p>
                    <p style={{ fontSize: '9px', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', marginTop: '3px' }}>Sujeto a verificación</p>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={handleRequestQuote} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', backgroundColor: '#FFCD11', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1B1B1B', boxShadow: '0 4px 0 0 #B89600', marginBottom: '12px' }}>
              {isAuthenticated ? 'Solicitar Cotización' : 'Cotizar Sin Registro'}
              <ArrowRight size={16} />
            </button>

            {!isAuthenticated && (
              <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', marginBottom: '12px' }}>
                O{' '}
                <Link to="/login" style={{ color: '#FFCD11', fontWeight: 900 }}>inicie sesión</Link>
                {' '}para su dashboard
              </p>
            )}

            <button onClick={clearCart} style={{ width: '100%', padding: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 900, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}