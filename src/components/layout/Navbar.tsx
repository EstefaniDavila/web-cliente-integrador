import { ShoppingCart, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/productos', label: 'Productos' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const itemCount = useCartStore((s) => s.getItemCount());
  const { isAuthenticated, user, logout } = useAuthStore();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#1B1B1B', borderBottom: '3px solid #FFCD11' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ backgroundColor: '#FFCD11', padding: '4px 10px', fontWeight: 900, color: '#1B1B1B', fontSize: '18px', lineHeight: 1 }}>CAT</div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontWeight: 900, fontSize: '15px', letterSpacing: '-0.04em', textTransform: 'uppercase', color: 'white' }}>MACHINERY</span>
              <span style={{ fontSize: '8px', color: '#FFCD11', fontWeight: 700, letterSpacing: '0.1em' }}>PERÚ</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: '8px 18px',
                  fontSize: '11px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  transition: 'all 0.15s',
                  backgroundColor: isActive(link.to) ? '#FFCD11' : 'transparent',
                  color: isActive(link.to) ? '#1B1B1B' : '#9ca3af',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Cart */}
            <Link
              to="/carrito"
              id="cart-button"
              style={{ position: 'relative', padding: '8px', color: '#9ca3af', textDecoration: 'none', display: 'flex' }}
            >
              <ShoppingCart size={22} color={itemCount > 0 ? '#FFCD11' : undefined} />
              {itemCount > 0 && (
                <span style={{
                  position: 'absolute', top: '0', right: '0',
                  minWidth: '20px', height: '20px', padding: '0 4px',
                  backgroundColor: '#FFCD11', color: '#1B1B1B',
                  fontSize: '11px', fontWeight: 900, borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #1B1B1B',
                }}>
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px' }} className="hidden sm:flex">
              {isAuthenticated ? (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    id="user-menu-button"
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 12px 6px 6px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    <div style={{ width: '32px', height: '32px', backgroundColor: '#FFCD11', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '14px', color: '#1B1B1B' }}>
                      {user?.name.charAt(0)}
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{user?.name.split(' ')[0]}</span>
                  </button>

                  {userMenuOpen && (
                    <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: '240px', backgroundColor: '#2D2D2D', border: '1px solid rgba(255,205,17,0.2)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                      <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,205,17,0.05)' }}>
                        <p style={{ fontWeight: 900, fontSize: '13px', color: 'white', textTransform: 'uppercase' }}>{user?.name}</p>
                        <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>{user?.email}</p>
                      </div>
                      <div style={{ padding: '8px' }}>
                        <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', fontSize: '11px', fontWeight: 900, color: '#d1d5db', textDecoration: 'none', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          <LayoutDashboard size={16} color="#FFCD11" /> Mi Panel
                        </Link>
                        <button onClick={() => { logout(); setUserMenuOpen(false); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', fontSize: '11px', fontWeight: 900, color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          <LogOut size={16} /> Cerrar Sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Link to="/login" style={{ padding: '8px 16px', fontSize: '11px', fontWeight: 900, color: '#9ca3af', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Entrar
                  </Link>
                  <Link to="/registro" style={{ padding: '10px 20px', backgroundColor: '#FFCD11', color: '#1B1B1B', fontSize: '11px', fontWeight: 900, textDecoration: 'none', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.08em', boxShadow: '0 3px 0 0 #B89600' }}>
                    Registrarse
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: 'none', padding: '8px', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }} className="lg:hidden" id="mobile-menu-button">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#1B1B1B', padding: '16px 24px' }} className="lg:hidden">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '12px 16px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', borderRadius: '6px', marginBottom: '4px', backgroundColor: isActive(link.to) ? '#FFCD11' : 'transparent', color: isActive(link.to) ? '#1B1B1B' : '#9ca3af' }}>
              {link.label}
            </Link>
          ))}
          {!isAuthenticated && (
            <Link to="/login" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '12px 16px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', borderRadius: '6px', marginTop: '8px', backgroundColor: '#FFCD11', color: '#1B1B1B', textAlign: 'center' }}>
              Ingresar
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}