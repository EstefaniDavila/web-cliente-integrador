import { Shield, Award, Headphones, Clock } from 'lucide-react';

const reasons = [
  { icon: Shield, title: 'Garantía Total', desc: 'Todos nuestros productos cuentan con garantía extendida y respaldo técnico completo.' },
  { icon: Award, title: 'Calidad Certificada', desc: 'Repuestos y maquinaria 100% original con certificación de fábrica.' },
  { icon: Headphones, title: 'Soporte 24/7', desc: 'Equipo de especialistas disponible las 24 horas para resolver cualquier emergencia.' },
  { icon: Clock, title: 'Entrega Rápida', desc: 'Red logística propia para entregar su pedido en el menor tiempo posible.' },
];

export default function WhyChooseUs() {
  return (
    <section style={{ backgroundColor: '#1B1B1B', padding: '80px 0', position: 'relative', overflow: 'hidden' }} id="why-choose-us">
      {/* Dot pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.12, backgroundImage: 'radial-gradient(circle, #FFCD11 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' }} />

      {/* Yellow accent bar left */}
      <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '4px', backgroundColor: '#FFCD11' }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>

        {/* Header */}
        <div style={{ marginBottom: '56px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', backgroundColor: 'rgba(255,205,17,0.1)', border: '1px solid rgba(255,205,17,0.25)', borderRadius: '4px', marginBottom: '14px' }}>
              <span style={{ fontSize: '10px', fontWeight: 900, color: '#FFCD11', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Nosotros</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1 }}>
              ¿Por Qué Elegirnos?
            </h2>
            <div style={{ width: '48px', height: '4px', backgroundColor: '#FFCD11', marginTop: '12px' }} />
          </div>
          <p style={{ fontSize: '14px', color: '#6b7280', maxWidth: '300px', lineHeight: 1.6, textAlign: 'right' }}>
            Más de 20 años de experiencia nos respaldan como líderes del sector.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="why-grid">
          {reasons.map((r, i) => (
            <div key={r.title}
              style={{ padding: '32px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', transition: 'all 0.2s' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(255,205,17,0.35)';
                el.style.backgroundColor = 'rgba(255,205,17,0.04)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(255,255,255,0.08)';
                el.style.backgroundColor = 'rgba(255,255,255,0.03)';
              }}
            >
              {/* Number + Icon */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ width: '52px', height: '52px', backgroundColor: '#FFCD11', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <r.icon size={26} color="#1B1B1B" />
                </div>
                <span style={{ fontSize: '48px', fontWeight: 900, color: 'rgba(255,255,255,0.05)', lineHeight: 1 }}>0{i + 1}</span>
              </div>

              <h3 style={{ fontSize: '14px', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>{r.title}</h3>
              <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}