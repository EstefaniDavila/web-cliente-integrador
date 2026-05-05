import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', padding: '60px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '48px', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '8px' }}>Términos y Condiciones</h1>
        <div style={{ width: '40px', height: '4px', backgroundColor: '#FFCD11', marginBottom: '32px' }} />
        
        <div style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.7 }}>
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', marginTop: '24px', marginBottom: '12px' }}>1. Introducción</h2>
          <p style={{ marginBottom: '16px' }}>Bienvenido a CAT Machinery Perú. Al acceder y utilizar nuestro portal cliente, usted acepta cumplir con los siguientes términos y condiciones de uso, que junto con nuestra política de privacidad rigen la relación de CAT Machinery con usted en relación con este sitio web.</p>
          
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', marginTop: '24px', marginBottom: '12px' }}>2. Uso del Portal</h2>
          <p style={{ marginBottom: '16px' }}>El contenido de las páginas de este sitio web es para su información general y uso exclusivo. Está sujeto a cambios sin previo aviso. Ni nosotros ni terceros garantizamos la precisión, puntualidad, rendimiento, integridad o idoneidad de la información y los materiales encontrados u ofrecidos en este sitio web para cualquier propósito particular.</p>
          
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', marginTop: '24px', marginBottom: '12px' }}>3. Cotizaciones y Órdenes</h2>
          <p style={{ marginBottom: '16px' }}>Las cotizaciones generadas a través de este portal son referenciales y están sujetas a validación por parte de nuestro equipo comercial. Los precios, disponibilidad de stock y tiempos de entrega finales serán confirmados mediante una orden formal.</p>
          
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', marginTop: '24px', marginBottom: '12px' }}>4. Servicios de Mantenimiento</h2>
          <p style={{ marginBottom: '16px' }}>Las solicitudes de servicio técnico y mantenimiento están sujetas a disponibilidad de nuestros técnicos. Nos reservamos el derecho de reprogramar servicios por causas de fuerza mayor, notificando al cliente con la mayor antelación posible.</p>
          
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', marginTop: '24px', marginBottom: '12px' }}>5. Propiedad Intelectual</h2>
          <p style={{ marginBottom: '16px' }}>Este sitio web contiene material que nos pertenece o del cual tenemos licencia. Este material incluye, pero no se limita a, el diseño, apariencia y gráficos. La reproducción está prohibida salvo en conformidad con el aviso de copyright, que forma parte de estos términos y condiciones.</p>
        </div>

        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '32px', fontSize: '12px', fontWeight: 900, color: '#1B1B1B', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '12px 24px', backgroundColor: '#FFCD11', borderRadius: '8px' }}>
          <ArrowLeft size={16} /> Volver al Inicio
        </Link>
      </div>
    </main>
  );
}
