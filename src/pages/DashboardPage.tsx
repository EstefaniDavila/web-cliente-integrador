import { Link, Navigate } from 'react-router-dom';
import { FileText, Package, Wrench, Clock, ArrowRight, Building2, Mail, Phone } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { formatPrice } from '../data/mockData';

const statusConfig: Record<string, { color: string; bg: string; dot: string; label: string }> = {
  pendiente: { color: '#d97706', bg: 'rgba(217,119,6,0.1)', dot: '#d97706', label: 'Pendiente' },
  en_revision: { color: '#2563eb', bg: 'rgba(37,99,235,0.1)', dot: '#2563eb', label: 'En Revisión' },
  aprobada: { color: '#16a34a', bg: 'rgba(22,163,74,0.1)', dot: '#16a34a', label: 'Aprobada' },
  rechazada: { color: '#dc2626', bg: 'rgba(220,38,38,0.1)', dot: '#dc2626', label: 'Rechazada' },
  procesando: { color: '#d97706', bg: 'rgba(217,119,6,0.1)', dot: '#d97706', label: 'Procesando' },
  confirmada: { color: '#2563eb', bg: 'rgba(37,99,235,0.1)', dot: '#2563eb', label: 'Confirmada' },
  en_camino: { color: '#7c3aed', bg: 'rgba(124,58,237,0.1)', dot: '#7c3aed', label: 'En Camino' },
  entregada: { color: '#16a34a', bg: 'rgba(22,163,74,0.1)', dot: '#16a34a', label: 'Entregada' },
  programada: { color: '#2563eb', bg: 'rgba(37,99,235,0.1)', dot: '#2563eb', label: 'Programada' },
  en_proceso: { color: '#ea580c', bg: 'rgba(234,88,12,0.1)', dot: '#ea580c', label: 'En Proceso' },
  completada: { color: '#16a34a', bg: 'rgba(22,163,74,0.1)', dot: '#16a34a', label: 'Completada' },
};

const StatusBadge = ({ status }: { status: string }) => {
  const st = statusConfig[status] || statusConfig.pendiente;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', backgroundColor: st.bg, borderRadius: '4px', fontSize: '10px', fontWeight: 900, color: st.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: st.dot, flexShrink: 0 }} />
      {st.label}
    </span>
  );
};

export default function DashboardPage() {
  const { isAuthenticated, user, quotations, orders, serviceRequests } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login?redirect=dashboard" />;

  const stats = [
    { icon: FileText, label: 'Cotizaciones', value: quotations.length, accent: '#FFCD11' },
    { icon: Package, label: 'Órdenes', value: orders.length, accent: '#3b82f6' },
    { icon: Wrench, label: 'Servicios', value: serviceRequests.length, accent: '#10b981' },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>

      {/* Header */}
      <section style={{ backgroundColor: '#1B1B1B', padding: '40px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.12, backgroundImage: 'radial-gradient(circle, #FFCD11 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '60px', backgroundColor: '#FFCD11', clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%)', opacity: 0.9 }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 900, color: '#FFCD11', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Panel de Control</p>
            <h1 style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1 }}>
              Bienvenido, {user?.name.split(' ')[0]}
            </h1>
          </div>
          <Link to="/productos" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#FFCD11', color: '#1B1B1B', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', borderRadius: '6px', boxShadow: '0 3px 0 0 #B89600' }}>
            Nueva Cotización <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '36px 40px 80px' }}>

        {/* Top row: profile + stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 1fr 1fr', gap: '20px', marginBottom: '40px' }} className="dash-top">

          {/* Profile card */}
          <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: '#FFCD11' }} />
            <div style={{ width: '56px', height: '56px', backgroundColor: '#1B1B1B', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 900, color: '#FFCD11', marginBottom: '16px' }}>
              {user?.name.charAt(0)}
            </div>
            <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '14px' }}>{user?.name}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: Building2, text: user?.company },
                { icon: Mail, text: user?.email },
                { icon: Phone, text: user?.phone },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={14} color="#FFCD11" />
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stat cards */}
          {stats.map((s) => (
            <div key={s.label} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: s.accent }} />
              <div style={{ width: '52px', height: '52px', backgroundColor: '#1B1B1B', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <s.icon size={26} color={s.accent} />
              </div>
              <div>
                <p style={{ fontSize: '40px', fontWeight: 900, color: '#1B1B1B', lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: '10px', fontWeight: 900, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quotations table */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#1B1B1B', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={18} color="#FFCD11" />
            </div>
            <h2 style={{ fontSize: '16px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Mis Cotizaciones</h2>
          </div>

          <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1B1B1B' }}>
                    {['ID de Solicitud', 'Fecha', 'Productos', 'Valor Est.', 'Estado'].map((h, i) => (
                      <th key={h} style={{ padding: '14px 20px', fontSize: '10px', fontWeight: 900, color: '#FFCD11', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: i === 4 ? 'right' : 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {quotations.map((q, i) => (
                    <tr key={q.id} style={{ borderTop: '1px solid #f3f4f6', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 900, color: '#1B1B1B' }}>{q.id}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>{q.date}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>{q.items.length} items</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 900, color: '#1B1B1B' }}>{formatPrice(q.total)}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}><StatusBadge status={q.status} /></td>
                    </tr>
                  ))}
                  {quotations.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ padding: '48px 20px', textAlign: 'center', fontSize: '13px', color: '#9ca3af', fontStyle: 'italic' }}>
                        No tiene cotizaciones registradas actualmente.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Orders + Services grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="dash-bottom">

          {/* Orders */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '36px', height: '36px', backgroundColor: '#1B1B1B', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Package size={18} color="#3b82f6" />
              </div>
              <h2 style={{ fontSize: '16px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Órdenes de Compra</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {orders.map((o) => (
                <div key={o.id} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#1B1B1B' }}>{o.id}</span>
                    <StatusBadge status={o.status} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
                    <Clock size={12} /> {o.date}
                    <span>·</span>
                    <span>Ref: {o.quotationId}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f3f4f6' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>{o.items.length} Productos</span>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#1B1B1B' }}>{formatPrice(o.total)}</span>
                  </div>
                </div>
              ))}
              {orders.length === 0 && <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '40px', textAlign: 'center', fontSize: '13px', color: '#9ca3af', fontStyle: 'italic' }}>Sin órdenes activas.</div>}
            </div>
          </section>

          {/* Services */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '36px', height: '36px', backgroundColor: '#1B1B1B', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wrench size={18} color="#10b981" />
              </div>
              <h2 style={{ fontSize: '16px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Soporte Técnico</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {serviceRequests.map((sr) => (
                <div key={sr.id} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ padding: '4px 10px', backgroundColor: '#1B1B1B', color: '#FFCD11', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '4px' }}>
                      {sr.type}
                    </span>
                    <StatusBadge status={sr.status} />
                  </div>
                  <h4 style={{ fontSize: '13px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', marginBottom: '6px' }}>{sr.machineInfo}</h4>
                  <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{sr.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f3f4f6' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>
                      <Clock size={11} /> {sr.date}
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 900, color: '#B89600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ticket: {sr.id}</span>
                  </div>
                </div>
              ))}
              {serviceRequests.length === 0 && <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '40px', textAlign: 'center', fontSize: '13px', color: '#9ca3af', fontStyle: 'italic' }}>Sin solicitudes pendientes.</div>}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}