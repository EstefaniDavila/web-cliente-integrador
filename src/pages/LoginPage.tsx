import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Globe, ChevronDown, Truck, Settings, ShieldCheck, Award, Wrench } from 'lucide-react';
import { useAuth } from '../providers/UserProvider';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: 'cliente@erpcat.com', password: '10000007' });
  const [error, setError] = useState('');
  const { loginUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Por favor complete todos los campos');
      return;
    }

    try {
      await loginUser({ email: form.email, password: form.password });
      // Note: UserProvider.tsx handles the redirect on success via window.location.href
    } catch (err: any) {
      setError('Credenciales incorrectas o error en el servidor');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'white' }}>

      {/* ── IZQUIERDA ── */}
      <div style={{ width: '48%', display: 'flex', flexDirection: 'column', padding: '56px 64px', position: 'relative', minHeight: '100vh' }}>

        {/* Dot pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

        {/* Inner flex column */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 10 }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '56px', textDecoration: 'none' }}>
            <div style={{ backgroundColor: '#FFCD11', padding: '4px 10px', fontWeight: 900, color: '#1B1B1B', fontSize: '20px', lineHeight: 1 }}>CAT</div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-0.05em', textTransform: 'uppercase', color: '#1B1B1B' }}>MACHINERY</span>
              <span style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 600 }}>®</span>
            </div>
          </Link>

          {/* Formulario — centrado verticalmente */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '460px', width: '100%' }}>

            {/* Header */}
            <div style={{ marginBottom: '40px' }}>
              <span style={{ color: '#FFCD11', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Bienvenido</span>
              <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#1B1B1B', lineHeight: 1.05, marginTop: '8px', textTransform: 'uppercase' }}>
                ACCEDA A SU <br />
                <span style={{ color: '#FFCD11' }}>PORTAL</span>
              </h1>
              <div style={{ width: '48px', height: '4px', backgroundColor: '#FFCD11', marginTop: '16px', marginBottom: '20px' }} />
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.6 }}>
                Inicie sesión para gestionar sus cotizaciones, solicitudes y servicios de maquinaria.
              </p>
            </div>

            {/* Card */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '32px', boxShadow: '0 10px 30px -15px rgba(0,0,0,0.1)' }}>

              <form onSubmit={handleSubmit}>
                {error && (
                  <div style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', color: '#dc2626', fontSize: '13px', padding: '10px 14px', borderRadius: '8px', marginBottom: '20px' }}>
                    {error}
                  </div>
                )}

                {/* Demo credentials info */}
                <div style={{ backgroundColor: 'rgba(255,205,17,0.08)', border: '1px solid rgba(255,205,17,0.3)', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 900, color: '#B89600', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Credenciales de Demostración
                  </p>
                  <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5 }}>
                    Email: <strong>cliente@erpcat.com</strong><br />
                    Contraseña: <strong>10000007</strong>
                  </p>
                </div>

                {/* Email */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 900, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    Correo Electrónico
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={16} />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ejemplo@correo.com"
                      required
                      id="login-email"
                      style={{ width: '100%', paddingLeft: '44px', paddingRight: '16px', paddingTop: '14px', paddingBottom: '14px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', outline: 'none', fontSize: '14px', color: '#374151', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '10px', fontWeight: 900, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contraseña</label>
                    <button type="button" style={{ fontSize: '10px', fontWeight: 900, color: '#FFCD11', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer' }}>
                      ¿Olvidó su contraseña?
                    </button>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={16} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="••••••••"
                      required
                      id="login-password"
                      style={{ width: '100%', paddingLeft: '44px', paddingRight: '48px', paddingTop: '14px', paddingBottom: '14px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', outline: 'none', fontSize: '14px', color: '#374151', boxSizing: 'border-box' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Botón */}
                <button
                  type="submit"
                  id="login-submit"
                  style={{ width: '100%', padding: '16px', backgroundColor: '#FFCD11', color: '#1B1B1B', fontWeight: 900, borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', boxShadow: '0 4px 0 0 #B89600', marginBottom: '16px' }}
                >
                  INGRESAR AL PORTAL <ArrowRight size={18} />
                </button>

                {/* Registro */}
                <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af' }}>
                  ¿No tiene una cuenta?{' '}
                  <Link to="/registro" style={{ color: '#FFCD11', fontWeight: 900, textTransform: 'uppercase', fontSize: '11px', textDecoration: 'none' }}>
                    REGÍSTRESE AHORA
                  </Link>
                </p>
              </form>
            </div>

            <Link to="/" style={{ marginTop: '28px', fontSize: '10px', fontWeight: 900, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}>
              ← Volver al inicio
            </Link>
          </div>

          {/* Stats footer */}
          <div style={{ marginTop: 'auto', paddingTop: '32px', borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '32px' }}>
            {[
              { icon: ShieldCheck, value: '+500', label: 'Equipos en Venta' },
              { icon: Wrench, value: '24/7', label: 'Soporte Técnico' },
              { icon: Award, value: '100%', label: 'Garantía CAT' },
            ].map(({ icon: Icon, value, label }, i) => (
              <>
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon color="#FFCD11" size={22} />
                  <div>
                    <p style={{ fontWeight: 900, fontSize: '16px', lineHeight: 1, color: '#1B1B1B' }}>{value}</p>
                    <p style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>{label}</p>
                  </div>
                </div>
                {i < 2 && <div style={{ width: '1px', height: '32px', backgroundColor: '#e5e7eb' }} />}
              </>
            ))}
          </div>
        </div>
      </div>

      {/* ── DERECHA (solo desktop) ── */}
      <div style={{ width: '52%', display: 'flex', flexDirection: 'column', position: 'relative', backgroundColor: '#1B1B1B', overflow: 'hidden', minHeight: '100vh' }}
        className="hidden lg:flex"
      >
        {/* Imagen */}
        <img
          src="https://images.unsplash.com/photo-1579412623847-79bc53974441?q=80&w=2070"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, filter: 'grayscale(100%)', objectPosition: 'center 30%' }}
          alt="CAT Excavator"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #1B1B1B 0%, rgba(27,27,27,0.6) 50%, rgba(27,27,27,0.2) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(27,27,27,0.4), transparent)' }} />

        {/* Franja amarilla */}
        <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '90px', backgroundColor: '#FFCD11', clipPath: 'polygon(40px 0, 100% 0, 100% 100%, 0 100%)', opacity: 0.9 }} />

        {/* Idioma */}
        <div style={{ position: 'absolute', top: '32px', right: '112px', zIndex: 10 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: 900, fontSize: '10px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', padding: '8px 16px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>
            <Globe size={13} /> ES <ChevronDown size={11} />
          </button>
        </div>

        {/* Contenido inferior */}
        <div style={{ marginTop: 'auto', position: 'relative', zIndex: 10, padding: '56px' }}>
          <div style={{ width: '56px', height: '6px', backgroundColor: '#FFCD11', marginBottom: '28px' }} />
          <h2 style={{ fontSize: '52px', fontWeight: 900, color: 'white', lineHeight: 0.92, marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            POTENCIA PARA<br />CONSTRUIR EL<br />FUTURO
          </h2>
          <p style={{ color: '#d1d5db', maxWidth: '340px', fontSize: '14px', lineHeight: 1.6, marginBottom: '40px' }}>
            Acceda a nuestro catálogo completo de maquinaria, gestione sus cotizaciones y solicite servicios técnicos desde un solo lugar, con el respaldo y la garantía de CAT Machinery.
          </p>

          {/* Servicios */}
          <div style={{ display: 'flex', alignItems: 'stretch', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden' }}>
            {[
              { Icon: Truck, title: 'ENTREGA', sub: 'A Nivel Nacional' },
              { Icon: Settings, title: 'SERVICIO TÉCNICO', sub: 'Especializado' },
              { Icon: ShieldCheck, title: 'REPUESTOS', sub: 'Originales CAT' },
            ].map(({ Icon, title, sub }, i) => (
              <div key={title} style={{ flex: 1, padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                <Icon color="#FFCD11" size={22} style={{ flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 900, color: 'white', textTransform: 'uppercase', lineHeight: 1 }}>{title}</p>
                  <p style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', marginTop: '4px' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}