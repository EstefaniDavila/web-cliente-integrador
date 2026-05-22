import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Headphones, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section style={{ backgroundColor: '#1B1B1B', position: 'relative', overflow: 'hidden', minHeight: 'calc(100vh - 72px)' }} id="hero">
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #FFCD11 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />
      <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '80px', backgroundColor: '#FFCD11', clipPath: 'polygon(30px 0, 100% 0, 100% 100%, 0 100%)', opacity: 0.9, zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '-100px', right: '80px', width: '500px', height: '500px', backgroundColor: 'rgba(255,205,17,0.08)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', minHeight: 'calc(100vh - 72px)', paddingTop: '48px', paddingBottom: '48px' }} className="hero-grid">

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', backgroundColor: 'rgba(255,205,17,0.1)', border: '1px solid rgba(255,205,17,0.3)', borderRadius: '4px', width: 'fit-content' }}>
              <ShieldCheck size={14} color="#FFCD11" />
              <span style={{ fontSize: '10px', fontWeight: 900, color: '#FFCD11', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Distribuidor Autorizado CAT®</span>
            </div>

            <div>
              <h1 style={{ fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 900, color: 'white', lineHeight: 0.95, textTransform: 'uppercase', letterSpacing: '-0.03em', marginBottom: '12px' }}>
                Potencia que
              </h1>
              <h1 style={{ fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 900, color: '#FFCD11', lineHeight: 0.95, textTransform: 'uppercase', letterSpacing: '-0.03em', marginBottom: '12px' }}>
                construye
              </h1>
              <h1 style={{ fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 900, color: 'white', lineHeight: 0.95, textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
                el futuro
              </h1>
            </div>

            <div style={{ width: '48px', height: '4px', backgroundColor: '#FFCD11' }} />

            <p style={{ fontSize: '16px', color: '#9ca3af', lineHeight: 1.7, maxWidth: '480px', fontWeight: 500 }}>
              Maquinaria pesada de clase mundial, repuestos originales y servicios de mantenimiento especializados para sus proyectos más ambiciosos.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/productos" id="hero-cta-products" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '14px 28px', backgroundColor: '#FFCD11', color: '#1B1B1B',
                fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em',
                textDecoration: 'none', borderRadius: '8px', boxShadow: '0 4px 0 0 #B89600',
              }}>
                Ver Catálogo Completo <ArrowRight size={16} />
              </Link>
              <Link to="/servicios" id="hero-cta-services" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '14px 28px', backgroundColor: 'transparent', color: 'white',
                fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em',
                textDecoration: 'none', borderRadius: '8px', border: '2px solid rgba(255,255,255,0.15)',
              }}>
                Nuestros Servicios
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {[
                { value: '20+', label: 'Años de experiencia' },
                { value: '500+', label: 'Clientes satisfechos' },
                { value: '1,200+', label: 'Equipos vendidos' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p style={{ fontSize: '32px', fontWeight: 900, color: '#FFCD11', lineHeight: 1 }}>{stat.value}</p>
                  <p style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600, marginTop: '4px' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div style={{ position: 'relative' }} className="hidden lg:block">
            {/* Main image */}
            <div style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', border: '3px solid rgba(255,205,17,0.2)' }}>
              <img
                src="https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=800&h=600&fit=crop"
                alt="Excavadora CAT"
                style={{ width: '100%', height: '440px', objectFit: 'cover', display: 'block', filter: 'grayscale(20%)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(27,27,27,0.6) 0%, transparent 50%)' }} />
            </div>

            {/* Floating card */}
            <div style={{
              position: 'absolute', bottom: '-20px', left: '-20px',
              backgroundColor: '#FFCD11', padding: '20px 24px', borderRadius: '12px',
              boxShadow: '6px 6px 0 0 #1B1B1B', border: '2px solid #1B1B1B',
              display: 'flex', alignItems: 'center', gap: '14px',
            }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: '#1B1B1B', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={24} color="#FFCD11" />
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', lineHeight: 1 }}>Cotización</p>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#5c4900', marginTop: '3px' }}>Respuesta en 24h</p>
              </div>
            </div>

            {/* Decorative corner */}
            <div style={{ position: 'absolute', top: '-16px', right: '-16px', width: '80px', height: '80px', border: '3px solid #FFCD11', borderRadius: '12px', opacity: 0.3 }} />
          </div>
        </div>
      </div>

      {/* Bottom feature bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', backgroundColor: 'rgba(0,0,0,0.3)', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0' }}>
            {[
              { icon: Truck, text: 'Envío a todo el país', desc: 'Logística propia' },
              { icon: ShieldCheck, text: 'Garantía extendida', desc: 'En todos los equipos' },
              { icon: Headphones, text: 'Soporte 24/7', desc: 'Asistencia técnica' },
            ].map(({ icon: Icon, text, desc }, i) => (
              <div key={text} style={{
                display: 'flex', alignItems: 'center', gap: '14px', padding: '20px 24px',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,205,17,0.1)', border: '1px solid rgba(255,205,17,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} color="#FFCD11" />
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: 'white' }}>{text}</p>
                  <p style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}