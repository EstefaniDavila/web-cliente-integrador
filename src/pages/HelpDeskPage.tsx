import React, { useState } from 'react';
import { useAuth } from '../providers/UserProvider';
import { ChevronDown, ChevronUp, Send, CheckCircle2, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: '¿CÓMO PUEDO COTIZAR UN PRODUCTO O SERVICIO?',
    answer: 'Puedes agregar los productos que necesites al carrito desde la página de Productos y luego proceder a enviarnos la solicitud. Un asesor se comunicará contigo rápidamente con el presupuesto oficial.'
  },
  {
    question: '¿CUÁLES SON LOS MÉTODOS DE PAGO ACEPTADOS?',
    answer: 'Aceptamos transferencias bancarias, depósitos y tarjetas de crédito para compras mayores.'
  },
  {
    question: '¿CUÁL ES EL TIEMPO DE ENTREGA PROMEDIO?',
    answer: 'Para productos en stock, el despacho se realiza en 24-48 horas hábiles. Para maquinaria pesada o requerimientos especiales, el asesor te indicará la fecha exacta en la cotización.'
  },
  {
    question: '¿OFRECEN SERVICIO TÉCNICO Y MANTENIMIENTO?',
    answer: '¡Sí! Puedes solicitar mantenimiento desde el portal si ya eres cliente, o comunicarte con nosotros para programar una visita técnica.'
  }
];

export default function HelpDeskPage() {
  const { user } = useAuth();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.roleable?.contact_name || user?.roleable?.business_name || '',
    phone: user?.phone || user?.roleable?.phone || '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        client_id: user?.roleable?.id || user?.roleable_id,
        name: formData.name,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/client/information_requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg(true);
      } else {
        setErrorMsg(data.message || 'Error al enviar la solicitud.');
      }
    } catch (error) {
      setErrorMsg('Error de conexión al servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      {/* Header (Mismo estilo de ContactPage) */}
      <section style={{ backgroundColor: '#1B1B1B', padding: '56px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle, #FFCD11 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '60px', backgroundColor: '#FFCD11', clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%)', opacity: 0.9 }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', backgroundColor: 'rgba(255,205,17,0.1)', border: '1px solid rgba(255,205,17,0.3)', borderRadius: '4px', marginBottom: '16px' }}>
            <HelpCircle size={12} color="#FFCD11" />
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#FFCD11', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Mesa de Ayuda</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '12px' }}>
            Centro de <span style={{ color: '#FFCD11' }}>Ayuda</span>
          </h1>
          <div style={{ width: '48px', height: '4px', backgroundColor: '#FFCD11', marginBottom: '16px' }} />
          <p style={{ fontSize: '15px', color: '#9ca3af', maxWidth: '460px', lineHeight: 1.7 }}>
            Encuentra respuestas rápidas a tus dudas frecuentes o envíanos un mensaje directo para resolver tus consultas técnicas o comerciales.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '56px 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '40px', alignItems: 'start' }}>
          
          {/* Columna FAQ */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '8px' }}>
              Preguntas Frecuentes
            </h2>
            <div style={{ width: '32px', height: '3px', backgroundColor: '#FFCD11', marginBottom: '28px' }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqs.map((faq, index) => (
                <div key={index} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                  <button
                    onClick={() => toggleFaq(index)}
                    style={{ width: '100%', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                  >
                    <h3 style={{ fontSize: '13px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0, paddingRight: '16px' }}>
                      {faq.question}
                    </h3>
                    <div style={{ width: '32px', height: '32px', backgroundColor: openFaqIndex === index ? '#FFCD11' : '#f9f9f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                      {openFaqIndex === index ? (
                        <ChevronUp size={16} color="#1B1B1B" />
                      ) : (
                        <ChevronDown size={16} color="#6b7280" />
                      )}
                    </div>
                  </button>
                  {openFaqIndex === index && (
                    <div style={{ padding: '0 20px 20px', color: '#6b7280', fontSize: '14px', lineHeight: 1.6 }}>
                      <div style={{ width: '100%', height: '1px', backgroundColor: '#f3f4f6', marginBottom: '16px' }} />
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Columna Formulario */}
          <div>
            {successMsg ? (
              <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '80px 40px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                <div style={{ width: '72px', height: '72px', backgroundColor: '#FFCD11', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 0 0 12px rgba(255,205,17,0.12)' }}>
                  <CheckCircle2 size={36} color="#1B1B1B" />
                </div>
                <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '8px' }}>¡Solicitud Enviada!</h2>
                <div style={{ width: '40px', height: '3px', backgroundColor: '#FFCD11', margin: '0 auto 16px' }} />
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, marginBottom: '32px' }}>
                  Un asesor revisará tu caso y te contactará por WhatsApp muy pronto.
                </p>
                <button 
                  onClick={() => { 
                    setSuccessMsg(false); 
                    setFormData({ ...formData, subject: '', message: '' }); 
                  }} 
                  style={{ padding: '12px 28px', backgroundColor: '#1B1B1B', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}
                >
                  Enviar Otra Solicitud
                </button>
              </div>
            ) : (
              <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '8px' }}>
                  Abre un Ticket de Ayuda
                </h2>
                <div style={{ width: '32px', height: '3px', backgroundColor: '#FFCD11', marginBottom: '28px' }} />
                
                {errorMsg && (
                  <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626', fontSize: '13px', fontWeight: 600 }}>
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {(!user) && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>Nombre o Empresa</label>
                        <input 
                          type="text" 
                          value={formData.name} 
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                          required 
                          placeholder="Juan Pérez" 
                          style={fieldStyle}
                          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#FFCD11'; }}
                          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'; }}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Número de WhatsApp</label>
                        <input 
                          type="tel" 
                          value={formData.phone} 
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                          required 
                          placeholder="+51 987654321" 
                          style={fieldStyle}
                          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#FFCD11'; }}
                          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'; }}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label style={labelStyle}>Asunto de su consulta</label>
                    <input 
                      type="text" 
                      value={formData.subject} 
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })} 
                      required 
                      placeholder="Ej. Problema con mi cotización" 
                      style={fieldStyle}
                      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#FFCD11'; }}
                      onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'; }}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Mensaje Detallado</label>
                    <textarea 
                      value={formData.message} 
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                      required 
                      rows={5} 
                      placeholder="Escriba aquí los detalles para que podamos ayudarle mejor..." 
                      style={{ ...fieldStyle, padding: '12px 16px', resize: 'none' }}
                      onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = '#FFCD11'; }}
                      onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = '#e5e7eb'; }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    style={{ 
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
                      padding: '14px 28px', backgroundColor: '#FFCD11', border: 'none', borderRadius: '8px', 
                      cursor: isSubmitting ? 'not-allowed' : 'pointer', fontSize: '12px', fontWeight: 900, 
                      textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1B1B1B', 
                      boxShadow: '0 4px 0 0 #B89600', opacity: isSubmitting ? 0.7 : 1
                    }}
                  >
                    {isSubmitting ? 'Enviando...' : (
                      <>
                        <Send size={16} /> Enviar Solicitud
                      </>
                    )}
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
