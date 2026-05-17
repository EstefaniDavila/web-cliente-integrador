import { Link, Navigate } from 'react-router-dom';
import { FileText, Package, Wrench, Clock, ArrowRight, Building2, Mail, Phone, Eye, X } from 'lucide-react';
import { useAuth } from '../providers/UserProvider';
import { formatPrice } from '../data/mockData';
import useCrud from '../hooks/useCrud';
import { useEffect, useState } from 'react';

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
  sent: { color: '#2563eb', bg: 'rgba(37,99,235,0.1)', dot: '#2563eb', label: 'Recibida / Por Aprobar' },
  pending_area_review: { color: '#d97706', bg: 'rgba(217,119,6,0.1)', dot: '#d97706', label: 'Procesando en Área Técnica' },
  pending_approval: { color: '#d97706', bg: 'rgba(217,119,6,0.1)', dot: '#d97706', label: 'Procesando Aprobación' },
  client_approved: { color: '#0d9488', bg: 'rgba(13,148,136,0.1)', dot: '#0d9488', label: 'Aprobada por Cliente' },
  client_rejected: { color: '#b91c1c', bg: 'rgba(185,28,28,0.1)', dot: '#b91c1c', label: 'Rechazada por Cliente' },
};

const typeLabel: Record<string, string> = {
  machinery_sale: 'Venta Maquinaria',
  parts_sale: 'Venta Repuestos',
  sale: 'Venta',
  spare_parts: 'Venta Repuestos',
  maintenance: 'Mantenimiento',
  rental: 'Alquiler',
  Alquiler: 'Alquiler',
  Mantenimiento: 'Mantenimiento',
  Venta: 'Venta'
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
  const { user } = useAuth();

  const [quotations, setQuotations] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  const [selectedQuotation, setSelectedQuotation] = useState<any | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { getModel: getQuotations } = useCrud('/api/v1/client/portal/quotations');
  const { getModel: getOrders } = useCrud('/api/v1/client/portal/orders');
  const { getModel: getMaintenances } = useCrud('/api/v1/client/portal/maintenances');

  const resolvedUser = user || (() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  })();

  useEffect(() => {
    if (!resolvedUser) return;

    const roleable = resolvedUser.roleable;
    const clientId = roleable?.id || resolvedUser.roleable_id || '1';

    console.log('[Dashboard] resolvedUser:', resolvedUser);
    console.log('[Dashboard] clientId:', clientId);

    getQuotations(`/api/v1/client/portal/quotations?client_id=${clientId}`).then(data => {
      console.log("=== DEBUG INFO DEL BACKEND ===", data.debug_info);
      setQuotations(data.quotations || []);
    }).catch(console.error);
    getOrders(`/api/v1/client/portal/orders?client_id=${clientId}`).then(data => {
      const allOrders = [...(data.sales_orders || []), ...(data.rentals || [])].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      const mappedOrders = allOrders.map((o: any) => ({
        ...o,
        id: o.code || o.id,
        date: new Date(o.created_at).toLocaleDateString(),
        quotationId: o.quotation_id || 'N/A'
      }));
      setOrders(mappedOrders);
    }).catch(console.error);
    getMaintenances(`/api/v1/client/portal/maintenances?client_id=${clientId}`).then(data => setServiceRequests(data.maintenances || [])).catch(console.error);
  }, [resolvedUser?.roleable?.id || resolvedUser?.roleable_id]);

  const { updateModel: updateQuotation, insertModel: insertComment } = useCrud();

  const commentQuotation = (id: string) => {
    const comment = window.prompt("Ingresa tu comentario o pregunta para esta cotización:");
    if (!comment) return;
    
    insertComment({ comment }, `/api/v1/client/portal/quotations/${id}/comments`)
      .then(() => alert("✅ Comentario enviado correctamente"))
      .catch(console.error);
  };

  const approveQuotation = (id: string) => {
    updateQuotation({}, `/api/v1/client/portal/quotations/${id}/approve`)
      .then(() => {
        alert("✅ Cotización aprobada exitosamente");
        // Reload quotations
        const roleable = resolvedUser?.roleable;
        const clientId = roleable?.id || resolvedUser?.roleable_id || '1';
        getQuotations(`/api/v1/client/portal/quotations?client_id=${clientId}`).then(data => setQuotations(data.quotations || [])).catch(console.error);
      })
      .catch(console.error);
  };

  const rejectQuotation = (id: string) => {
    updateQuotation({}, `/api/v1/client/portal/quotations/${id}/reject`)
      .then(() => {
        alert("❌ Cotización rechazada");
        // Reload quotations
        const roleable = resolvedUser?.roleable;
        const clientId = roleable?.id || resolvedUser?.roleable_id || '1';
        getQuotations(`/api/v1/client/portal/quotations?client_id=${clientId}`).then(data => setQuotations(data.quotations || [])).catch(console.error);
      })
      .catch(console.error);
  };

  if (!resolvedUser) return <Navigate to="/login?redirect=dashboard" />;

  const pendingQuotes = quotations.filter((q: any) => q.status === 'sent');
  const otherQuotes = quotations.filter((q: any) => q.status !== 'sent');

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
              Bienvenido, {(user?.full_name || user?.email || 'Usuario').split(' ')[0]}
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
              {(user?.full_name || user?.email || 'U').charAt(0).toUpperCase()}
            </div>
            <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '14px' }}>{user?.full_name || user?.email}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: Building2, text: user?.company || 'Sin Empresa' },
                { icon: Mail, text: user?.email },
                { icon: Phone, text: user?.phone || 'Sin Teléfono' },
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

        {/* Cotizaciones Pendientes de Aprobación */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#1B1B1B', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={18} color="#FFCD11" />
            </div>
            <h2 style={{ fontSize: '16px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Cotizaciones Pendientes de tu Aprobación</h2>
          </div>

          <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1B1B1B' }}>
                    {['ID de Cotización', 'Fecha', 'Tipo', 'Productos', 'Total', 'Estado', 'Acciones'].map((h, i) => (
                      <th key={h} style={{ padding: '14px 20px', fontSize: '10px', fontWeight: 900, color: '#FFCD11', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: (h === 'Estado' || h === 'Acciones' || h === 'Total') ? 'right' : 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pendingQuotes.map((q, i) => (
                    <tr key={q.id} style={{ borderTop: '1px solid #f3f4f6', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 900, color: '#1B1B1B' }}>{q.id.substring(0,8).toUpperCase()}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>{q.date}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#1B1B1B', fontWeight: 600 }}>
                        <span style={{ backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', textTransform: 'uppercase' }}>
                          {typeLabel[q.quotation_type] || q.quotation_type || 'Solicitud'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {q.items?.map((it: any, idx: number) => (
                            <span key={idx} style={{ display: 'inline-block' }}>
                              <strong style={{ color: '#1B1B1B' }}>{it.quantity}x</strong> {it.product?.name || it.description}
                              <span style={{ fontSize: '10px', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px', textTransform: 'uppercase' }}>{it.item_type || it.type}</span>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 900, color: '#1B1B1B' }}>{formatPrice(q.total)}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}><StatusBadge status={q.status} /></td>
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => {
                              setSelectedQuotation(q);
                              setIsDetailModalOpen(true);
                            }}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 2px 0 0 #2563eb' }}
                          >
                            <Eye size={14} /> Ver
                          </button>
                          <button
                            onClick={() => approveQuotation(q.id)}
                            style={{ padding: '8px 16px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 2px 0 0 #117a37' }}
                          >
                            Aprobar
                          </button>
                          <button
                            onClick={() => rejectQuotation(q.id)}
                            style={{ padding: '8px 16px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 2px 0 0 #b91c1c' }}
                          >
                            Rechazar
                          </button>
                          <button
                            onClick={() => commentQuotation(q.id)}
                            style={{ padding: '8px 16px', backgroundColor: '#4b5563', color: 'white', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 2px 0 0 #374151' }}
                          >
                            Comentar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {pendingQuotes.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ padding: '48px 20px', textAlign: 'center', fontSize: '13px', color: '#9ca3af', fontStyle: 'italic' }}>
                        No tienes cotizaciones pendientes de aprobar.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Cotizaciones Aprobadas y Solicitudes */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#1B1B1B', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={18} color="#10b981" />
            </div>
            <h2 style={{ fontSize: '16px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Mis Aprobaciones e Historial de Solicitudes</h2>
          </div>

          <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1B1B1B' }}>
                    {['ID de Solicitud', 'Fecha', 'Tipo', 'Productos', 'Valor Est.', 'Estado', 'Acciones'].map((h, i) => (
                      <th key={h} style={{ padding: '14px 20px', fontSize: '10px', fontWeight: 900, color: '#FFCD11', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: (h === 'Estado' || h === 'Acciones' || h === 'Valor Est.') ? 'right' : 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {otherQuotes.map((q, i) => (
                    <tr key={q.id} style={{ borderTop: '1px solid #f3f4f6', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 900, color: '#1B1B1B' }}>{q.id}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>{q.date}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#1B1B1B', fontWeight: 600 }}>
                        <span style={{ backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', textTransform: 'uppercase' }}>
                          {typeLabel[q.quotation_type] || q.quotation_type || 'Solicitud'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {q.items?.map((it: any, idx: number) => (
                            <span key={idx} style={{ display: 'inline-block' }}>
                              <strong style={{ color: '#1B1B1B' }}>{it.quantity}x</strong> {it.product?.name || it.description}
                              <span style={{ fontSize: '10px', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px', textTransform: 'uppercase' }}>{it.item_type || it.type}</span>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 900, color: '#1B1B1B' }}>{formatPrice(q.total)}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}><StatusBadge status={q.status} /></td>
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => {
                              setSelectedQuotation(q);
                              setIsDetailModalOpen(true);
                            }}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 2px 0 0 #2563eb' }}
                          >
                            <Eye size={14} /> Ver
                          </button>
                          <button
                            onClick={() => commentQuotation(q.id)}
                            style={{ padding: '8px 16px', backgroundColor: '#4b5563', color: 'white', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 2px 0 0 #374151' }}
                          >
                            Comentar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {otherQuotes.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ padding: '48px 20px', textAlign: 'center', fontSize: '13px', color: '#9ca3af', fontStyle: 'italic' }}>
                        No tienes solicitudes o cotizaciones procesadas.
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
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>{o.items?.length || 0} Productos</span>
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

      {/* Quotation Detail Modal */}
      {isDetailModalOpen && selectedQuotation && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{
              backgroundColor: '#1B1B1B',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '4px solid #FFCD11'
            }}>
              <div>
                <p style={{ fontSize: '10px', fontWeight: 900, color: '#FFCD11', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Detalles del Documento</p>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'white', margin: 0, textTransform: 'uppercase' }}>
                  Cotización {selectedQuotation.code || selectedQuotation.id.substring(0,8).toUpperCase()}
                </h3>
              </div>
              <button 
                onClick={() => {
                  setIsDetailModalOpen(false);
                  setSelectedQuotation(null);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Metadata Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '10px',
                border: '1px solid #f3f4f6'
              }}>
                <div>
                  <p style={{ fontSize: '10px', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '4px' }}>Fecha de Emisión</p>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#1B1B1B', margin: 0 }}>{selectedQuotation.date}</p>
                </div>
                <div>
                  <p style={{ fontSize: '10px', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '4px' }}>Tipo de Operación</p>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#1B1B1B', margin: 0, textTransform: 'uppercase' }}>
                    {typeLabel[selectedQuotation.quotation_type] || selectedQuotation.quotation_type}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '10px', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '4px' }}>Estado Actual</p>
                  <div><StatusBadge status={selectedQuotation.status} /></div>
                </div>
                <div>
                  <p style={{ fontSize: '10px', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '4px' }}>Monto Total</p>
                  <p style={{ fontSize: '16px', fontWeight: 900, color: '#1B1B1B', margin: 0 }}>{formatPrice(selectedQuotation.total)}</p>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>Productos / Servicios Incluidos</h4>
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 800, color: '#4b5563' }}>Descripción</th>
                        <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 800, color: '#4b5563', width: '80px' }}>Cant.</th>
                        <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 800, color: '#4b5563', width: '120px' }}>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedQuotation.items?.map((it: any, idx: number) => (
                        <tr key={idx} style={{ borderBottom: idx < selectedQuotation.items.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                          <td style={{ padding: '10px 14px', fontWeight: 700, color: '#1B1B1B' }}>
                            {it.product?.name || it.description}
                            <span style={{ display: 'inline-block', fontSize: '9px', backgroundColor: '#e5e7eb', padding: '1px 5px', borderRadius: '3px', marginLeft: '6px', textTransform: 'uppercase', fontWeight: 800 }}>{it.item_type || it.type}</span>
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700, color: '#4b5563' }}>{it.quantity}</td>
                          <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 900, color: '#1B1B1B' }}>{formatPrice(it.total_price || (it.unit_price * it.quantity) || 0)}</td>
                        </tr>
                      ))}
                      {(!selectedQuotation.items || selectedQuotation.items.length === 0) && (
                        <tr>
                          <td colSpan={3} style={{ padding: '20px', textAlign: 'center', color: '#9ca3af', fontStyle: 'italic' }}>
                            Sin detalles disponibles (En análisis técnico)
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals Summary */}
              {selectedQuotation.total > 0 && (
                <div style={{
                  alignSelf: 'flex-end',
                  width: '240px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '13px',
                  borderTop: '2px solid #FFCD11',
                  paddingTop: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280', fontWeight: 700 }}>Subtotal:</span>
                    <span style={{ fontWeight: 800, color: '#1B1B1B' }}>{formatPrice(selectedQuotation.total / 1.18)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280', fontWeight: 700 }}>IGV (18%):</span>
                    <span style={{ fontWeight: 800, color: '#1B1B1B' }}>{formatPrice(selectedQuotation.total - (selectedQuotation.total / 1.18))}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', marginTop: '4px', borderTop: '1px dashed #e5e7eb', paddingTop: '6px' }}>
                    <span style={{ color: '#1B1B1B', fontWeight: 900 }}>Total General:</span>
                    <span style={{ fontWeight: 950, color: '#1B1B1B' }}>{formatPrice(selectedQuotation.total)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div style={{
              backgroundColor: '#f9fafb',
              padding: '16px 24px',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    const backend_host = import.meta.env.VITE_BACKEND_HOST || 'http://localhost:3000';
                    window.open(`${backend_host}/api/v1/client/portal/quotations/${selectedQuotation.id}/pdf`, '_blank');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 3px 0 0 #2563eb'
                  }}
                >
                  <Eye size={12} /> Descargar PDF Oficial
                </button>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {selectedQuotation.status === 'sent' && (
                  <>
                    <button
                      onClick={() => {
                        approveQuotation(selectedQuotation.id);
                        setIsDetailModalOpen(false);
                        setSelectedQuotation(null);
                      }}
                      style={{
                        padding: '8px 18px',
                        backgroundColor: '#16a34a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        boxShadow: '0 3px 0 0 #117a37'
                      }}
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => {
                        rejectQuotation(selectedQuotation.id);
                        setIsDetailModalOpen(false);
                        setSelectedQuotation(null);
                      }}
                      style={{
                        padding: '8px 18px',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        boxShadow: '0 3px 0 0 #b91c1c'
                      }}
                    >
                      Rechazar
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    setSelectedQuotation(null);
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#e5e7eb',
                    color: '#4b5563',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 3px 0 0 #d1d5db'
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}