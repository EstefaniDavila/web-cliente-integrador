import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Building2, Phone, ArrowRight, ShieldCheck, Wrench, Award, MapPin, IdCard } from 'lucide-react';
import useCrud from '../hooks/useCrud';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '', phone: '', dni: '', address: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { insertModel } = useCrud('/api/v1/client/public/request_quote');
  const navigate = useNavigate();
  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password || !form.company || !form.phone || !form.dni || !form.address) {
      setError('Complete todos los campos');
      return;
    }

    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!agreedToTerms) {
      setError('Debe aceptar los términos y condiciones');
      return;
    }

    try {
      await insertModel({
        business_name: form.company,
        contact_name: form.name,
        document_number: form.dni,
        document_type: 'DNI',
        email: form.email,
        phone: form.phone,
        type: 'registration',
        notes: `Dirección: ${form.address}. Cuenta creada desde la página de registro.`,
      });
      // Assuming successful account creation triggers the email with generated password
      alert("Cuenta creada. Por favor, revise su correo electrónico para ver su contraseña de acceso.");
      navigate('/login');
    } catch (err) {
      setError('Error al crear la cuenta. Intente nuevamente.');
    }
  };

  const inputStyle = {
    width: '100%', paddingTop: '13px', paddingBottom: '13px', paddingRight: '16px', paddingLeft: '44px',
    backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '10px',
    outline: 'none', fontSize: '14px', color: '#374151', boxSizing: 'border-box' as const,
  };

  const fields = [
    { field: 'name', label: 'Nombre Completo', icon: User, type: 'text', placeholder: 'Juan Pérez' },
    { field: 'dni', label: 'DNI / RUC', icon: IdCard, type: 'text', placeholder: '123456789' },
    { field: 'company', label: 'Empresa', icon: Building2, type: 'text', placeholder: 'Constructora ABC' },
    { field: 'email', label: 'Email Corporativo', icon: Mail, type: 'email', placeholder: 'correo@empresa.com' },
    { field: 'phone', label: 'Teléfono', icon: Phone, type: 'tel', placeholder: '+51 999 123 456' },
    { field: 'address', label: 'Dirección de Entrega', icon: MapPin, type: 'text', placeholder: 'Av. Principal 123' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'white' }}>

      {/* LEFT */}
      <div style={{ width: '48%', display: 'flex', flexDirection: 'column', padding: '48px 56px', position: 'relative', minHeight: '100vh' }}>
        {/* Dot pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 10 }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', textDecoration: 'none' }}>
            <div style={{ backgroundColor: '#FFCD11', padding: '4px 10px', fontWeight: 900, color: '#1B1B1B', fontSize: '20px', lineHeight: 1 }}>CAT</div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-0.05em', textTransform: 'uppercase', color: '#1B1B1B' }}>MACHINERY</span>
              <span style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 600 }}>®</span>
            </div>
          </Link>

          {/* Form section */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '460px', width: '100%' }}>
            <div style={{ marginBottom: '32px' }}>
              <span style={{ color: '#FFCD11', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Nuevo Usuario</span>
              <h1 style={{ fontSize: '42px', fontWeight: 900, color: '#1B1B1B', lineHeight: 1.05, marginTop: '8px', textTransform: 'uppercase' }}>
                CREE SU <br /><span style={{ color: '#FFCD11' }}>CUENTA</span>
              </h1>
              <div style={{ width: '48px', height: '4px', backgroundColor: '#FFCD11', marginTop: '14px', marginBottom: '14px' }} />
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.6 }}>
                Regístrese para solicitar cotizaciones, gestionar pedidos y acceder a servicios técnicos.
              </p>
            </div>

            {/* Card */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '28px', boxShadow: '0 10px 30px -15px rgba(0,0,0,0.1)' }}>
              <form onSubmit={handleSubmit}>
                {error && (
                  <div style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', color: '#dc2626', fontSize: '13px', padding: '10px 14px', borderRadius: '8px', marginBottom: '18px' }}>
                    {error}
                  </div>
                )}

                {/* 2-col grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  {fields.map(({ field, label, icon: Icon, type, placeholder }) => (
                    <div key={field}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 900, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>{label}</label>
                      <div style={{ position: 'relative' }}>
                        <Icon size={15} color="#9ca3af" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input type={type} value={(form as any)[field]} onChange={(e) => update(field, e.target.value)} required placeholder={placeholder} style={inputStyle}
                          id={`reg-${field}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Password */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 900, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Contraseña</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} color="#9ca3af" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => update('password', e.target.value)} required placeholder="••••••••"
                      style={{ ...inputStyle, paddingRight: '44px' }} id="reg-password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>Mínimo 6 caracteres</p>
                </div>

                {/* Terms */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #f3f4f6', marginBottom: '18px' }}>
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    required
                    id="terms"
                    style={{ marginTop: '2px', accentColor: '#FFCD11', cursor: 'pointer' }}
                  />
                  <label htmlFor="terms" style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, cursor: 'pointer' }}>
                    Acepto los <Link to="/terminos" style={{ color: '#1B1B1B', fontWeight: 900, fontSize: '10px', textTransform: 'uppercase' }}>Términos</Link> y la <Link to="/privacidad" style={{ color: '#1B1B1B', fontWeight: 900, fontSize: '10px', textTransform: 'uppercase' }}>Privacidad</Link> de CAT Machinery.
                  </label>
                </div>

                <button type="submit" id="reg-submit" style={{ width: '100%', padding: '15px', backgroundColor: '#FFCD11', color: '#1B1B1B', fontWeight: 900, borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 4px 0 0 #B89600', marginBottom: '14px' }}>
                  Crear Mi Cuenta <ArrowRight size={17} />
                </button>

                <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af' }}>
                  ¿Ya tiene una cuenta?{' '}
                  <Link to="/login" style={{ color: '#FFCD11', fontWeight: 900, textTransform: 'uppercase', fontSize: '11px', textDecoration: 'none' }}>
                    Inicie Sesión
                  </Link>
                </p>
              </form>
            </div>

            <Link to="/" style={{ marginTop: '24px', fontSize: '10px', fontWeight: 900, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}>
              ← Volver al inicio
            </Link>
          </div>

          {/* Stats footer */}
          <div style={{ marginTop: 'auto', paddingTop: '28px', borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '28px' }}>
            {[
              { icon: ShieldCheck, value: '+500', label: 'Equipos en Venta' },
              { icon: Wrench, value: '24/7', label: 'Soporte Técnico' },
              { icon: Award, value: '100%', label: 'Garantía CAT' },
            ].map(({ icon: Icon, value, label }, i) => (
              <>
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon color="#FFCD11" size={20} />
                  <div>
                    <p style={{ fontWeight: 900, fontSize: '15px', lineHeight: 1, color: '#1B1B1B' }}>{value}</p>
                    <p style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>{label}</p>
                  </div>
                </div>
                {i < 2 && <div style={{ width: '1px', height: '28px', backgroundColor: '#e5e7eb' }} />}
              </>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — dark panel */}
      <div style={{ width: '52%', display: 'flex', flexDirection: 'column', position: 'relative', backgroundColor: '#1B1B1B', overflow: 'hidden', minHeight: '100vh' }}
        className="hidden lg:flex"
      >
        <img
          src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45, filter: 'grayscale(100%)', objectPosition: 'center 40%' }}
          alt="CAT Machinery"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #1B1B1B 0%, rgba(27,27,27,0.55) 55%, rgba(27,27,27,0.2) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(27,27,27,0.4), transparent)' }} />

        {/* Yellow stripe */}
        <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '80px', backgroundColor: '#FFCD11', clipPath: 'polygon(30px 0, 100% 0, 100% 100%, 0 100%)', opacity: 0.9 }} />

        {/* Content */}
        <div style={{ marginTop: 'auto', position: 'relative', zIndex: 10, padding: '56px' }}>
          <div style={{ width: '56px', height: '6px', backgroundColor: '#FFCD11', marginBottom: '24px' }} />
          <h2 style={{ fontSize: '48px', fontWeight: 900, color: 'white', lineHeight: 0.92, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
            ÚNASE A LA<br />RED DE<br /><span style={{ color: '#FFCD11' }}>CLIENTES CAT</span>
          </h2>
          <p style={{ color: '#d1d5db', maxWidth: '320px', fontSize: '14px', lineHeight: 1.7, marginBottom: '36px' }}>
            Acceda a precios exclusivos, seguimiento de pedidos en tiempo real y soporte técnico prioritario desde su panel personal.
          </p>

          {/* Benefits */}
          <div style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
            {['Cotizaciones en línea', 'Historial de compras', 'Soporte técnico directo'].map((b, i) => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <div style={{ width: '28px', height: '28px', backgroundColor: '#FFCD11', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="13" height="13" viewBox="0 0 12 9" fill="none"><path d="M1 4.5L4.5 8L11 1" stroke="#1B1B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}