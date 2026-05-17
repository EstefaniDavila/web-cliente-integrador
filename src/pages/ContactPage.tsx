import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { products, formatPrice } from '../data/mockData';
import useCrud from '../hooks/useCrud';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', machineInfo: '', selectedPartId: '', selectedMachineId: '', start_date: '', duration: '' });
  const update = (field: string, value: string) => setForm({ ...form, [field]: value });
  
  const { insertModel } = useCrud('/api/v1/client/public/request_quote');

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    try {
      const typeMap: Record<string, string> = {
        'cotizacion': 'sale',
        'alquiler': 'rental',
        'mantenimiento': 'maintenance',
        'repuestos': 'spare_parts',
        'otro': 'contact'
      };

      const selectedMachine = products.find(p => p.id === form.selectedMachineId);
      const machineLabel = selectedMachine ? selectedMachine.name : (form.selectedMachineId === 'other' ? form.machineInfo : 'Ninguna');

      const selectedPart = products.find(p => p.id === form.selectedPartId);
      const partLabel = selectedPart ? selectedPart.name : (form.selectedPartId === 'other' ? 'Otro repuesto' : 'Ninguno');

      let fullNotes = form.message;
      if (form.subject === 'alquiler' || form.subject === 'mantenimiento') {
        fullNotes = `📋 DETALLES DEL EQUIPO:\n• Máquina seleccionada: ${machineLabel}\n• Info extra: ${form.machineInfo || 'Ninguna'}\n\n💬 MENSAJE:\n${form.message}`;
      } else if (form.subject === 'repuestos') {
        fullNotes = `📋 DETALLES DEL REPUESTO:\n• Máquina relacionada: ${machineLabel}\n• Repuesto solicitado: ${partLabel}\n\n💬 MENSAJE:\n${form.message}`;
      }

      let requestItems: any[] = [];
      if (form.subject === 'alquiler' && form.selectedMachineId && form.selectedMachineId !== 'other') {
        requestItems.push({
          product_id: form.selectedMachineId,
          item_type: 'product',
          description: selectedMachine ? selectedMachine.name : 'Máquina de Alquiler',
          quantity: 1,
          unit_price: selectedMachine ? selectedMachine.price : 0,
          total_price: selectedMachine ? selectedMachine.price : 0
        });
      } else if (form.subject === 'repuestos' && form.selectedPartId && form.selectedPartId !== 'other') {
        requestItems.push({
          product_id: form.selectedPartId,
          item_type: 'spare_part',
          description: selectedPart ? selectedPart.name : 'Repuesto',
          quantity: 1,
          unit_price: selectedPart ? selectedPart.price : 0,
          total_price: selectedPart ? selectedPart.price : 0
        });
      } else if (form.subject === 'mantenimiento' && form.selectedMachineId && form.selectedMachineId !== 'other') {
        requestItems.push({
          product_id: form.selectedMachineId,
          item_type: 'service',
          description: `Servicio de Mantenimiento: ${selectedMachine ? selectedMachine.name : 'Máquina'}`,
          quantity: 1,
          unit_price: 0,
          total_price: 0
        });
      }

      await insertModel({
        contact_name: form.name,
        business_name: form.name,
        email: form.email,
        phone: form.phone,
        type: typeMap[form.subject] || 'contact',
        notes: fullNotes,
        start_date: ['alquiler', 'mantenimiento'].includes(form.subject) ? form.start_date : undefined,
        duration: ['alquiler', 'mantenimiento'].includes(form.subject) ? form.duration : undefined,
        product_id: form.selectedMachineId || form.selectedPartId || undefined,
        items: requestItems
      });
      setSent(true); 
    } catch (err) {
      console.error('Error enviando contacto:', err);
    }
  };
  
  const selectedPart = products.find(p => p.id === form.selectedPartId);

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

                  {['mantenimiento', 'alquiler', 'repuestos'].includes(form.subject) && (
                    <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                      <h3 style={{ fontSize: '12px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', marginBottom: '16px' }}>Detalles del Equipo</h3>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: form.subject !== 'alquiler' ? '1fr 1fr' : '1fr', gap: '16px', marginBottom: form.subject === 'repuestos' ? '16px' : '0' }}>
                        <div>
                          <label style={labelStyle}>{form.subject === 'alquiler' ? 'Máquina a Alquilar' : 'Máquina Relacionada (Opcional)'}</label>
                          <select value={form.selectedMachineId} onChange={(e) => update('selectedMachineId', e.target.value)} style={{ ...fieldStyle, cursor: 'pointer', backgroundColor: 'white' }}
                            onFocus={(e) => { (e.target as HTMLSelectElement).style.borderColor = '#FFCD11'; }}
                            onBlur={(e) => { (e.target as HTMLSelectElement).style.borderColor = '#e5e7eb'; }}
                          >
                            <option value="">Seleccione de nuestro catálogo...</option>
                            {products.filter(p => p.category === 'maquinaria').map(p => (
                              <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                            <option value="other">Otra máquina no listada</option>
                          </select>
                        </div>

                        {form.subject !== 'alquiler' && (
                          <div>
                            <label style={labelStyle}>Especifique Marca / Modelo</label>
                            <input type="text" value={form.machineInfo} onChange={(e) => update('machineInfo', e.target.value)} placeholder="Ej: CAT 320 - Serie A123" style={{...fieldStyle, backgroundColor: 'white'}}
                              required={form.selectedMachineId === 'other'}
                              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#FFCD11'; }}
                              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'; }}
                            />
                          </div>
                        )}
                      </div>

                      {(() => {
                        const m = products.find(p => p.id === form.selectedMachineId);
                        if (!m) return null;
                        return (
                          <div style={{ display: 'flex', gap: '16px', padding: '12px', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', marginTop: '16px' }}>
                            <img src={m.image} alt={m.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
                            <div>
                              <h4 style={{ fontSize: '12px', fontWeight: 900, color: '#1B1B1B', margin: '0 0 4px', textTransform: 'uppercase' }}>{m.name}</h4>
                              <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, lineHeight: 1.4 }}>{m.shortDescription}</p>
                            </div>
                          </div>
                        );
                      })()}

                      {['alquiler', 'mantenimiento'].includes(form.subject) && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                          <div>
                            <label style={labelStyle}>Fecha de Inicio Solicitada *</label>
                            <input 
                              type="date" 
                              value={form.start_date} 
                              onChange={(e) => update('start_date', e.target.value)} 
                              required 
                              style={{ ...fieldStyle, backgroundColor: 'white' }} 
                              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#FFCD11'; }}
                              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'; }}
                            />
                          </div>
                          <div>
                            <label style={labelStyle}>Duración Estimada *</label>
                            <input 
                              type="text" 
                              value={form.duration} 
                              onChange={(e) => update('duration', e.target.value)} 
                              required 
                              placeholder="Ej: 7 días" 
                              style={{ ...fieldStyle, backgroundColor: 'white' }} 
                              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#FFCD11'; }}
                              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'; }}
                            />
                          </div>
                        </div>
                      )}

                      {form.subject === 'repuestos' && (
                        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                          <label style={labelStyle}>Repuesto Solicitado</label>
                          <select value={form.selectedPartId} onChange={(e) => update('selectedPartId', e.target.value)} required style={{ ...fieldStyle, cursor: 'pointer', backgroundColor: 'white' }}
                            onFocus={(e) => { (e.target as HTMLSelectElement).style.borderColor = '#FFCD11'; }}
                            onBlur={(e) => { (e.target as HTMLSelectElement).style.borderColor = '#e5e7eb'; }}
                          >
                            <option value="">Seleccione el repuesto...</option>
                            {products.filter(p => p.category === 'repuestos').map(p => (
                              <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                            <option value="other">Otro repuesto no listado</option>
                          </select>
                          
                          {selectedPart && form.selectedPartId !== 'other' && (
                            <div style={{ display: 'flex', gap: '16px', padding: '12px', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', marginTop: '12px' }}>
                              <img src={selectedPart.image} alt={selectedPart.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
                              <div>
                                <h4 style={{ fontSize: '12px', fontWeight: 900, color: '#1B1B1B', margin: '0 0 4px', textTransform: 'uppercase' }}>{selectedPart.name}</h4>
                                <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 6px', lineHeight: 1.4 }}>{selectedPart.shortDescription}</p>
                                <p style={{ fontSize: '13px', fontWeight: 900, color: '#B89600', margin: 0 }}>{formatPrice(selectedPart.price)}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

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