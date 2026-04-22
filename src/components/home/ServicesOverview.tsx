import { Link } from 'react-router-dom';
import { Truck, CalendarClock, Cog, Wrench, ArrowRight } from 'lucide-react';
import { services } from '../../data/mockData';

const serviceIcons: Record<string, React.ElementType> = {
  truck: Truck, calendar: CalendarClock, cog: Cog, wrench: Wrench,
};

export default function ServicesOverview() {
  return (
    <section style={{ backgroundColor: 'white', padding: '80px 0', borderTop: '1px solid #e5e7eb' }} id="services-overview">
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>

        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', backgroundColor: 'rgba(255,205,17,0.12)', border: '1px solid rgba(255,205,17,0.35)', borderRadius: '4px', marginBottom: '14px' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#B89600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Servicios</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1 }}>
            Soluciones Integrales
          </h2>
          <div style={{ width: '48px', height: '4px', backgroundColor: '#FFCD11', marginTop: '12px' }} />
          <p style={{ fontSize: '15px', color: '#6b7280', marginTop: '16px', maxWidth: '520px', lineHeight: 1.7 }}>
            Portafolio completo de servicios para mantener su operación funcionando al máximo rendimiento.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="services-grid">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon] || Cog;
            return (
              <div key={service.id}
                style={{ border: '2px solid #e5e7eb', borderRadius: '12px', padding: '28px', backgroundColor: 'white', transition: 'all 0.2s', cursor: 'default', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = '#FFCD11';
                  el.style.boxShadow = '4px 4px 0 0 #FFCD11';
                  el.style.transform = 'translate(-2px, -2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = '#e5e7eb';
                  el.style.boxShadow = 'none';
                  el.style.transform = 'translate(0, 0)';
                }}
              >
                {/* Icon */}
                <div style={{ width: '52px', height: '52px', backgroundColor: '#1B1B1B', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Icon size={26} color="#FFCD11" />
                </div>

                <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '10px' }}>{service.title}</h3>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, marginBottom: '18px' }}>
                  {service.description.substring(0, 110)}...
                </p>

                {/* Features */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {service.features.slice(0, 3).map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#374151', fontWeight: 600 }}>
                      <span style={{ width: '5px', height: '5px', backgroundColor: '#FFCD11', borderRadius: '1px', flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link to="/servicios" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 900, color: '#1B1B1B', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Más información <ArrowRight size={13} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}