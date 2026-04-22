import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const update = (field: string, value: string) => setForm({ ...form, [field]: value });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  const contactInfo = [
    { icon: MapPin, title: 'Dirección', lines: ['Zona Industrial Norte', 'Calle 45 #23-10, Lima'] },
    { icon: Phone, title: 'Teléfono', lines: ['+51 (01) 234 5678', '+51 999 123 456'] },
    { icon: Mail, title: 'Email', lines: ['ventas@catmachinery.pe', 'soporte@catmachinery.pe'] },
    { icon: Clock, title: 'Horario', lines: ['Lun – Vie: 7:00 AM – 6:00 PM', 'Sáb: 8:00 AM – 1:00 PM'] },
  ];

  const fieldStyle = {
    width: '100%', padding: '12px 16px', backgroundColor: '#f9f9f9',
    border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px',
    color: '#374151', outline: 'none', boxSizing: 'border-box' as const, transition: 'border-color 0.15s',
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', backgroundColor: 'rgba(255,205,17,0.1)', border: '1px solid rgba(255,205,17,0.3)', borderRadius: '4px', marginBottom: '16px' }}>
            <Mail size={12} color="#FFCD11" />
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#FFCD11', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contáctenos</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '12px' }}>
            Hablemos de su <span style={{ color: '#FFCD11' }}>Proyecto</span>
          </h1>
          <div style={{ width: '48px', height: '4px', backgroundColor: '#FFCD11', marginBottom: '16px' }} />
          <p style={{ fontSize: '15px', color: '#9ca3af', maxWidth: '460px', lineHeight: 1.7 }}>
            Estamos listos para ayudarle. Le responderemos en menos de 24 horas.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '56px 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px', alignItems: 'start' }} className="contact-layout">

          {/* Info column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {contactInfo.map(({ icon: Icon, title, lines }) => (
              <div key={title} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#1B1B1B', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color="#FFCD11" />
                </div>
                <div>
                  <h3 style={{ fontSize: '12px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{title}</h3>
                  {lines.map((l) => <p key={l} style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600, lineHeight: 1.5 }}>{l}</p>)}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '80px 40px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                <div style={{ width: '72px', height: '72px', backgroundColor: '#FFCD11', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 0 0 12px rgba(255,205,17,0.12)' }}>
                  <CheckCircle2 size={36} color="#1B1B1B" />
                </div>
                <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '8px' }}>¡Mensaje Enviado!</h2>
                <div style={{ width: '40px', height: '3px', backgroundColor: '#FFCD11', margin: '0 auto 16px' }} />
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, marginBottom: '32px' }}>
                  Nos pondremos en contacto con usted en las próximas 24 horas.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }} style={{ padding: '12px 28px', backgroundColor: '#1B1B1B', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>
                  Enviar Otro Mensaje
                </button>
              </div>
            ) : (
              <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '8px' }}>Envíenos un Mensaje</h2>
                <div style={{ width: '32px', height: '3px', backgroundColor: '#FFCD11', marginBottom: '28px' }} />

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>Nombre</label>
                      <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required placeholder="Juan Pérez" style={fieldStyle}
                        onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#FFCD11'; }}
                        onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'; }}
                        id="contact-name"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required placeholder="correo@empresa.com" style={fieldStyle}
                        onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#FFCD11'; }}
                        onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'; }}
                        id="contact-email"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>Teléfono</label>
                      <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+51 999 888 777" style={fieldStyle}
                        onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#FFCD11'; }}
                        onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'; }}
                        id="contact-phone"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Asunto</label>
                      <select value={form.subject} onChange={(e) => update('subject', e.target.value)} required style={{ ...fieldStyle, cursor: 'pointer' }}
                        onFocus={(e) => { (e.target as HTMLSelectElement).style.borderColor = '#FFCD11'; }}
                        onBlur={(e) => { (e.target as HTMLSelectElement).style.borderColor = '#e5e7eb'; }}
                        id="contact-subject"
                      >
                        <option value="">Seleccione...</option>
                        <option value="cotizacion">Solicitar Cotización</option>
                        <option value="alquiler">Alquiler de Equipos</option>
                        <option value="mantenimiento">Mantenimiento</option>
                        <option value="repuestos">Repuestos</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Mensaje</label>
                    <textarea value={form.message} onChange={(e) => update('message', e.target.value)} required rows={5} placeholder="Describa su consulta o proyecto..." style={{ ...fieldStyle, padding: '12px 16px', resize: 'none' }}
                      onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = '#FFCD11'; }}
                      onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = '#e5e7eb'; }}
                      id="contact-message"
                    />
                  </div>

                  <button type="submit" id="contact-submit" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 28px', backgroundColor: '#FFCD11', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1B1B1B', boxShadow: '0 4px 0 0 #B89600' }}>
                    <Send size={16} /> Enviar Mensaje
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}