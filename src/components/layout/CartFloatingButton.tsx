import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X, ChevronRight } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';

const formatPrice = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function CartFloatingButton() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const getTotal = useCartStore((s) => s.getTotal);
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  const totalCount = items.reduce((c, i) => c + i.quantity, 0);

  return (
    <>
      {/* Backdrop al expandir */}
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 998, background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(2px)' }}
        />
      )}

      <div style={{ position: 'fixed', bottom: '28px', right: '28px', zIndex: 999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>

        {/* Panel expandido */}
        {expanded && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
            width: '340px',
            overflow: 'hidden',
            animation: 'slideUp 0.2s ease',
            border: '1px solid #e5e7eb'
          }}>
            {/* Header */}
            <div style={{ backgroundColor: '#1B1B1B', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingCart size={16} color="#FFCD11" />
                <span style={{ color: 'white', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Tu Cotización
                </span>
              </div>
              <span style={{ backgroundColor: '#FFCD11', color: '#1B1B1B', fontWeight: 900, fontSize: '11px', borderRadius: '999px', padding: '2px 8px' }}>
                {totalCount} {totalCount === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Items */}
            <div style={{ maxHeight: '260px', overflowY: 'auto', padding: '12px 0' }}>
              {items.map((item) => (
                <div key={item.product.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 20px', transition: 'background 0.15s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#f9f9f9'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}>
                  {/* Imagen */}
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb' }}>
                    <img src={(item.product as any).image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '12px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.product.name}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#6b7280' }}>
                        x{item.quantity}
                      </span>
                      <span style={{ fontSize: '10px', color: '#d1d5db' }}>·</span>
                      <span style={{ fontSize: '11px', fontWeight: 900, color: '#1B1B1B' }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <span style={{ 
                        fontSize: '9px', 
                        padding: '2px 6px', 
                        borderRadius: '4px', 
                        backgroundColor: item.type === 'cotizacion' ? 'rgba(255,205,17,0.15)' : item.type === 'alquiler' ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)', 
                        color: item.type === 'cotizacion' ? '#B89600' : item.type === 'alquiler' ? '#059669' : '#2563eb', 
                        fontWeight: 900, 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em', 
                        marginLeft: 'auto' 
                      }}>
                        {item.type === 'cotizacion' ? 'Cotizar' : item.type === 'alquiler' ? 'Alquiler' : 'Mantenimiento'}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button onClick={() => removeItem(item.product.id)}
                    style={{ width: '24px', height: '24px', borderRadius: '50%', border: 'none', backgroundColor: '#fee2e2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.15s' }}
                    title="Quitar">
                    <X size={12} color="#ef4444" strokeWidth={3} />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ borderTop: '2px solid #f3f4f6', padding: '14px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 700 }}>Total estimado</span>
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#1B1B1B' }}>{formatPrice(getTotal())}</span>
              </div>
              <Link to="/carrito" onClick={() => setExpanded(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%', padding: '12px', backgroundColor: '#FFCD11', borderRadius: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '0.08em', boxShadow: '0 3px 0 0 #B89600', boxSizing: 'border-box' }}>
                Ver Carrito <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {/* Botón flotante principal */}
        <button
          id="floating-cart-btn"
          onClick={() => setExpanded(!expanded)}
          style={{
            width: '60px', height: '60px', borderRadius: '50%',
            backgroundColor: '#1B1B1B', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3), 0 4px 0 0 #FFCD11',
            position: 'relative', transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => { const el = e.currentTarget; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 12px 32px rgba(0,0,0,0.35), 0 4px 0 0 #FFCD11'; }}
          onMouseLeave={(e) => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3), 0 4px 0 0 #FFCD11'; }}
        >
          <ShoppingCart size={24} color="white" />
          {/* Badge */}
          <span style={{
            position: 'absolute', top: '-4px', right: '-4px',
            backgroundColor: '#FFCD11', color: '#1B1B1B',
            width: '22px', height: '22px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: 900, border: '2px solid white',
            animation: 'cartPulse 0.4s ease',
          }}>
            {totalCount > 9 ? '9+' : totalCount}
          </span>
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cartPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.35); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
}
