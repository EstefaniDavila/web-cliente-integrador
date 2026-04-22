import { Link } from 'react-router-dom';
import { Truck, CalendarClock, Cog, Wrench, ArrowRight, Check, Phone } from 'lucide-react';
import { services } from '../data/mockData';

const serviceIcons: Record<string, React.ElementType> = {
  truck: Truck, calendar: CalendarClock, cog: Cog, wrench: Wrench,
};
const serviceImages = [
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop',
];

export default function ServicesPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>

      {/* Header */}
      <section style={{ backgroundColor: '#1B1B1B', padding: '56px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle, #FFCD11 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '60px', backgroundColor: '#FFCD11', clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%)', opacity: 0.9 }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', backgroundColor: 'rgba(255,205,17,0.1)', border: '1px solid rgba(255,205,17,0.3)', borderRadius: '4px', marginBottom: '16px' }}>
            <Cog size={12} color="#FFCD11" />
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#FFCD11', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Servicios</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '12px' }}>
            Nuestros <span style={{ color: '#FFCD11' }}>Servicios</span>
          </h1>
          <div style={{ width: '48px', height: '4px', backgroundColor: '#FFCD11', marginBottom: '16px' }} />
          <p style={{ fontSize: '15px', color: '#9ca3af', maxWidth: '460px', lineHeight: 1.7 }}>
            Soluciones integrales para mantener su operación al máximo rendimiento.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '64px 40px 80px' }}>

        {/* Service items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon] || Cog;
            const isReversed = index % 2 === 1;
            return (
              <div key={service.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="service-row">

                {/* Image */}
                <div style={{ order: isReversed ? 2 : 1 }}>
                  <div style={{ borderRadius: '16px', overflow: 'hidden', border: isReversed ? '3px solid #FFCD11' : '2px solid #e5e7eb', boxShadow: isReversed ? '6px 6px 0 0 #FFCD11' : '0 8px 24px rgba(0,0,0,0.1)', position: 'relative' }}>
                    <img src={serviceImages[index]} alt={service.title} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', transition: 'transform 0.5s', filter: 'grayscale(10%)' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                    />
                    {/* Number overlay */}
                    <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '52px', height: '52px', backgroundColor: '#FFCD11', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '22px', color: '#1B1B1B', boxShadow: '3px 3px 0 0 #1B1B1B' }}>
                      0{index + 1}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ order: isReversed ? 1 : 2 }}>
                  {/* Icon */}
                  <div style={{ width: '60px', height: '60px', backgroundColor: '#1B1B1B', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '4px 4px 0 0 #FFCD11' }}>
                    <Icon size={30} color="#FFCD11" />
                  </div>

                  <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '12px' }}>
                    {service.title}
                  </h2>
                  <div style={{ width: '40px', height: '4px', backgroundColor: '#FFCD11', marginBottom: '20px' }} />
                  <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.7, marginBottom: '28px' }}>{service.description}</p>

                  {/* Features */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '32px' }}>
                    {service.features.map((f) => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '20px', height: '20px', backgroundColor: '#FFCD11', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Check size={12} color="#1B1B1B" strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/contacto" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: '#1B1B1B', color: 'white', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', borderRadius: '8px', border: '2px solid #1B1B1B', transition: 'all 0.15s' }}>
                    Solicitar Información <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div style={{ marginTop: '80px', backgroundColor: '#1B1B1B', borderRadius: '16px', padding: '60px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden', border: '3px solid #FFCD11' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.12, backgroundImage: 'radial-gradient(circle, #FFCD11 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '12px' }}>
              ¿Necesita una Solución <span style={{ color: '#FFCD11' }}>Personalizada?</span>
            </h2>
            <div style={{ width: '48px', height: '4px', backgroundColor: '#FFCD11', margin: '0 auto 20px' }} />
            <p style={{ fontSize: '14px', color: '#9ca3af', maxWidth: '460px', margin: '0 auto 36px', lineHeight: 1.7 }}>
              Contáctenos y nuestro equipo de expertos diseñará un plan a la medida de sus necesidades.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/contacto" style={{ padding: '12px 28px', backgroundColor: '#FFCD11', color: '#1B1B1B', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', borderRadius: '8px', boxShadow: '0 4px 0 0 #B89600' }}>
                Contactar Ahora
              </Link>
              <a href="tel:+5112345678" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: 'transparent', border: '2px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', borderRadius: '8px' }}>
                <Phone size={16} /> +51 (01) 234 5678
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}