import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#1B1B1B', color: '#9ca3af', borderTop: '4px solid #FFCD11' }}>
      {/* Dot pattern strip */}
      <div style={{ height: '3px', background: 'repeating-linear-gradient(90deg, #FFCD11 0px, #FFCD11 20px, #B89600 20px, #B89600 24px)' }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '64px 40px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }} className="grid-footer">

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '24px' }}>
              <div style={{ backgroundColor: '#FFCD11', padding: '4px 10px', fontWeight: 900, color: '#1B1B1B', fontSize: '18px', lineHeight: 1 }}>CAT</div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{ fontWeight: 900, fontSize: '15px', letterSpacing: '-0.04em', textTransform: 'uppercase', color: 'white' }}>MACHINERY</span>
                <span style={{ fontSize: '8px', color: '#FFCD11', fontWeight: 700, letterSpacing: '0.1em' }}>PERÚ</span>
              </div>
            </Link>
            <p style={{ fontSize: '13px', lineHeight: 1.7, marginBottom: '24px', color: '#6b7280' }}>
              Líderes en maquinaria pesada, repuestos originales y servicios de mantenimiento. Más de 20 años de experiencia.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: FaInstagram, href: '#' },
                { icon: FaFacebookF, href: '#' },
                { icon: FaLinkedinIn, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} style={{ width: '38px', height: '38px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', textDecoration: 'none', transition: 'all 0.15s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#FFCD11'; (e.currentTarget as HTMLAnchorElement).style.color = '#1B1B1B'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLAnchorElement).style.color = '#9ca3af'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ color: 'white', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid #FFCD11', display: 'inline-block' }}>
              Enlaces Rápidos
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { to: '/productos', label: 'Catálogo de Productos' },
                { to: '/servicios', label: 'Nuestros Servicios' },
                { to: '/contacto', label: 'Contáctenos' },
                { to: '/login', label: 'Acceso Clientes' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7280', textDecoration: 'none', fontWeight: 600 }}>
                    <span style={{ width: '6px', height: '6px', backgroundColor: '#FFCD11', borderRadius: '1px', flexShrink: 0 }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ color: 'white', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid #FFCD11', display: 'inline-block' }}>
              Servicios
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Venta de Maquinaria', 'Alquiler de Equipos', 'Repuestos Originales', 'Mantenimiento Especializado'].map((s) => (
                <li key={s}>
                  <Link to="/servicios" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7280', textDecoration: 'none', fontWeight: 600 }}>
                    <span style={{ width: '6px', height: '6px', backgroundColor: '#FFCD11', borderRadius: '1px', flexShrink: 0 }} />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: 'white', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid #FFCD11', display: 'inline-block' }}>
              Contacto
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: MapPin, text: 'Av. Industrial 2850\nLima, Perú' },
                { icon: Phone, text: '+51 (01) 234 5678' },
                { icon: Mail, text: 'ventas@catmachinery.pe' },
                { icon: Clock, text: 'Lun–Vie: 7AM–6PM\nSáb: 8AM–1PM' },
              ].map(({ icon: Icon, text }, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Icon size={16} color="#FFCD11" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, fontWeight: 600 }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', maxWidth: '1440px', margin: '0 auto', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <p style={{ fontSize: '12px', color: '#4b5563', fontWeight: 600 }}>
          © {currentYear} CAT Machinery Perú. Todos los derechos reservados.
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Términos y Condiciones', 'Política de Privacidad'].map((t) => (
            <a key={t} href="#" style={{ fontSize: '12px', color: '#4b5563', textDecoration: 'none', fontWeight: 600 }}>{t}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}