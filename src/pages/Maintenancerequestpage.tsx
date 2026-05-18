import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Wrench, FileText, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { products } from '../data/mockData';
import { useAuth } from '../providers/UserProvider';
import axios from 'axios';


export default function MaintenanceRequestPage() {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('producto');
    const { user } = useAuth();

    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        productId: productId || '',
        serviceType: 'mantenimiento',
        machineModel: '',
        serialNumber: '',
        workHours: '',
        issue: '',
        urgency: 'normal',
        preferredDate: '',
        name: user?.roleable?.contact_name || user?.roleable?.business_name || '',
        company: user?.roleable?.business_name || '',
        email: user?.email || '',
        phone: user?.phone || user?.roleable?.phone || '',
        document_number: user?.document_number || '',
        document_type: user?.roleable?.document_type || 'DNI'
    });

    useEffect(() => {
        if (productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                setForm(prev => ({ ...prev, machineModel: product.name }));
            }
        }
    }, [productId]);

    const update = (field: string, value: string) => setForm({ ...form, [field]: value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 1. API CONNECTION (FRONTEND -> BACKEND)
            const payload = {
                client_id: user?.roleable?.id || user?.roleable_id,
                business_name: form.company || form.name,
                contact_name: form.name,
                document_number: form.document_number,
                document_type: form.document_type,
                email: form.email,
                phone: form.phone,
                type: 'maintenance',
                start_date: form.preferredDate,
                notes: `Tipo de servicio: ${form.serviceType}\nMáquina: ${form.machineModel}\nSerie: ${form.serialNumber}\nHoras: ${form.workHours}\nUrgencia: ${form.urgency}\nFecha preferida: ${form.preferredDate}\nProblema: ${form.issue}`,
                items: form.productId ? [{
                    product_id: form.productId,
                    item_type: 'service',
                    description: form.serviceType,
                    quantity: 1,
                    unit_price: 0,
                    total_price: 0
                }] : []
            };

            const backend_host = import.meta.env.VITE_BACKEND_HOST;
            await axios.post(`${backend_host}/api/v1/client/public/request_quote`, payload);

            setSubmitted(true);
        } catch (error) {
            console.error("Error submitting maintenance request", error);
        }
    };

    if (submitted) {
        return (
            <main style={{ minHeight: '100vh', backgroundColor: '#1B1B1B', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle, #FFCD11 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div style={{ textAlign: 'center', position: 'relative', maxWidth: '500px' }}>
                    <div style={{ width: '80px', height: '80px', backgroundColor: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', boxShadow: '0 0 0 12px rgba(16,185,129,0.15)' }}>
                        <CheckCircle2 size={40} color="white" />
                    </div>
                    <h1 style={{ fontSize: '40px', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '12px' }}>¡Solicitud Enviada!</h1>
                    <div style={{ width: '40px', height: '4px', backgroundColor: '#FFCD11', margin: '0 auto 20px' }} />
                    <p style={{ fontSize: '15px', color: '#9ca3af', lineHeight: 1.7, marginBottom: '8px' }}>
                        Su solicitud de {form.serviceType} ha sido recibida.
                    </p>
                    <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
                        Ticket: <strong style={{ color: '#FFCD11' }}>SRV-{Date.now().toString().slice(-6)}</strong>
                    </p>
                    <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '36px' }}>
                        Nuestro equipo técnico le contactará en las próximas 4 horas.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', backgroundColor: '#FFCD11', color: '#1B1B1B', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', borderRadius: '8px', boxShadow: '0 4px 0 0 #B89600' }}>
                            Ver Mi Dashboard
                        </Link>
                        <Link to="/productos" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', backgroundColor: 'transparent', border: '2px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', borderRadius: '8px' }}>
                            Ver Productos
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const inputStyle = {
        width: '100%', padding: '12px 16px', backgroundColor: 'white',
        border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px',
        color: '#374151', outline: 'none', boxSizing: 'border-box' as const,
    };

    const labelStyle = {
        display: 'block' as const, fontSize: '10px', fontWeight: 900, color: '#6b7280',
        textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '8px',
    };

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>

            {/* Header */}
            <section style={{ backgroundColor: '#1B1B1B', padding: '56px 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle, #FFCD11 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '60px', backgroundColor: '#FFCD11', clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%)', opacity: 0.9 }} />
                <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', backgroundColor: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '4px', marginBottom: '16px' }}>
                        <Wrench size={12} color="#10b981" />
                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Servicio Técnico</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '12px' }}>
                        Solicitar <span style={{ color: '#FFCD11' }}>Mantenimiento</span>
                    </h1>
                    <div style={{ width: '48px', height: '4px', backgroundColor: '#FFCD11', marginBottom: '16px' }} />
                    <p style={{ fontSize: '15px', color: '#9ca3af', maxWidth: '460px', lineHeight: 1.7 }}>
                        Complete el formulario y nuestro equipo técnico le contactará a la brevedad.
                    </p>
                </div>
            </section>

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '56px 40px 80px' }}>

                {/* Alert if not authenticated */}
                {!user && (
                    <div style={{ backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '12px', padding: '16px 20px', marginBottom: '32px', display: 'flex', gap: '14px' }}>
                        <AlertCircle size={20} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                            <p style={{ fontSize: '13px', fontWeight: 900, color: '#1e40af', textTransform: 'uppercase', marginBottom: '4px' }}>Consejo</p>
                            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6 }}>
                                <Link to="/login?redirect=/solicitar-mantenimiento" style={{ color: '#3b82f6', fontWeight: 700 }}>Inicie sesión</Link> para autocompletar sus datos y ver el historial de servicios en su dashboard.
                            </p>
                        </div>
                    </div>
                )}

                <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>

                    <form onSubmit={handleSubmit}>

                        {/* Service Type */}
                        <div style={{ marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid #FFCD11' }}>
                                Tipo de Servicio
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                                {[
                                    { value: 'mantenimiento', label: 'Mantenimiento Preventivo', icon: Wrench },
                                    { value: 'reparacion', label: 'Reparación', icon: AlertCircle },
                                    { value: 'inspeccion', label: 'Inspección Técnica', icon: FileText },
                                ].map(({ value, label, icon: Icon }) => (
                                    <label key={value} style={{ position: 'relative', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="serviceType"
                                            value={value}
                                            checked={form.serviceType === value}
                                            onChange={(e) => update('serviceType', e.target.value)}
                                            style={{ position: 'absolute', opacity: 0 }}
                                        />
                                        <div style={{
                                            padding: '16px',
                                            border: '2px solid',
                                            borderColor: form.serviceType === value ? '#10b981' : '#e5e7eb',
                                            borderRadius: '8px',
                                            backgroundColor: form.serviceType === value ? 'rgba(16,185,129,0.05)' : 'white',
                                            transition: 'all 0.15s',
                                            textAlign: 'center',
                                        }}>
                                            <Icon size={24} color={form.serviceType === value ? '#10b981' : '#9ca3af'} style={{ margin: '0 auto 8px' }} />
                                            <span style={{ fontSize: '11px', fontWeight: 900, color: form.serviceType === value ? '#10b981' : '#6b7280', textTransform: 'uppercase', display: 'block' }}>
                                                {label}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Machine Information */}
                        <div style={{ marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid #FFCD11' }}>
                                Información del Equipo
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={labelStyle}>Modelo / Tipo de Máquina</label>
                                    <input type="text" value={form.machineModel} onChange={(e) => update('machineModel', e.target.value)} required placeholder="Ej: Excavadora 320" style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Número de Serie</label>
                                    <input type="text" value={form.serialNumber} onChange={(e) => update('serialNumber', e.target.value)} placeholder="Ej: CAT320-2024-A1" style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Horas de Trabajo (aprox.)</label>
                                    <input type="number" value={form.workHours} onChange={(e) => update('workHours', e.target.value)} placeholder="Ej: 2000" style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Urgencia</label>
                                    <select value={form.urgency} onChange={(e) => update('urgency', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                                        <option value="normal">Normal (3-5 días)</option>
                                        <option value="urgente">Urgente (1-2 días)</option>
                                        <option value="emergencia">Emergencia (Mismo día)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Issue Description */}
                        <div style={{ marginBottom: '32px' }}>
                            <label style={labelStyle}>Descripción del Problema / Servicio Requerido</label>
                            <textarea
                                value={form.issue}
                                onChange={(e) => update('issue', e.target.value)}
                                required
                                rows={4}
                                placeholder="Describa detalladamente el problema o el servicio que necesita..."
                                style={{ ...inputStyle, resize: 'vertical' }}
                            />
                        </div>

                        {/* Preferred Date */}
                        <div style={{ marginBottom: '32px' }}>
                            <label style={labelStyle}>Fecha Preferida (Opcional)</label>
                            <input type="date" value={form.preferredDate} onChange={(e) => update('preferredDate', e.target.value)} style={inputStyle} />
                        </div>

                        {/* Contact Information */}
                        {!user && (
                            <div style={{ marginBottom: '32px' }}>
                                <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid #FFCD11' }}>
                                    Datos de Contacto
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={labelStyle}>Nombre Completo</label>
                                        <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required placeholder="Juan Pérez" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Empresa</label>
                                        <input type="text" value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Constructora ABC" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Email</label>
                                        <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required placeholder="correo@empresa.com" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Teléfono</label>
                                        <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} required placeholder="+51 999 888 777" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Documento de Identidad</label>
                                        <input type="text" value={form.document_number} onChange={(e) => update('document_number', e.target.value)} required placeholder="DNI / RUC" style={inputStyle} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit */}
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                            <Link to="/productos" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: 'white', border: '2px solid #e5e7eb', color: '#6b7280', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', borderRadius: '8px' }}>
                                <ArrowLeft size={16} /> Cancelar
                            </Link>
                            <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', backgroundColor: '#10b981', border: 'none', color: 'white', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 0 0 #059669' }}>
                                <Wrench size={16} /> Enviar Solicitud
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}