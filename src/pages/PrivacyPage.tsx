import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', padding: '60px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '48px', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '8px' }}>Política de Privacidad</h1>
        <div style={{ width: '40px', height: '4px', backgroundColor: '#FFCD11', marginBottom: '32px' }} />
        
        <div style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.7 }}>
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', marginTop: '24px', marginBottom: '12px' }}>1. Información que Recopilamos</h2>
          <p style={{ marginBottom: '16px' }}>Recopilamos información personal que usted nos proporciona voluntariamente al registrarse en el sitio, expresar interés en obtener información sobre nosotros o nuestros productos y servicios, o al participar en actividades en el sitio. La información personal puede incluir nombre, dirección de correo electrónico, información de contacto, número de DNI y datos de la empresa.</p>
          
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', marginTop: '24px', marginBottom: '12px' }}>2. Uso de su Información</h2>
          <p style={{ marginBottom: '16px' }}>Utilizamos la información personal recopilada a través de nuestro sitio web para una variedad de propósitos comerciales descritos a continuación. Procesamos su información personal para estos propósitos en base a nuestros intereses comerciales legítimos, para celebrar o ejecutar un contrato con usted, con su consentimiento y/o para el cumplimiento de nuestras obligaciones legales.</p>
          
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', marginTop: '24px', marginBottom: '12px' }}>3. Protección de Datos</h2>
          <p style={{ marginBottom: '16px' }}>CAT Machinery Perú toma en serio la seguridad de sus datos. Hemos implementado medidas de seguridad técnicas y organizativas adecuadas diseñadas para proteger la seguridad de cualquier información personal que procesemos. Sin embargo, ninguna transmisión electrónica a través de Internet o tecnología de almacenamiento de información puede garantizarse como 100% segura.</p>
          
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1B1B1B', textTransform: 'uppercase', marginTop: '24px', marginBottom: '12px' }}>4. Sus Derechos</h2>
          <p style={{ marginBottom: '16px' }}>En algunas regiones, como el Espacio Económico Europeo (EEE), el Reino Unido y ciertos países de América Latina, usted tiene ciertos derechos bajo las leyes de protección de datos aplicables, que pueden incluir el derecho a solicitar acceso y obtener una copia de su información personal, solicitar rectificación o eliminación.</p>
        </div>

        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '32px', fontSize: '12px', fontWeight: 900, color: '#1B1B1B', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '12px 24px', backgroundColor: '#FFCD11', borderRadius: '8px' }}>
          <ArrowLeft size={16} /> Volver al Inicio
        </Link>
      </div>
    </main>
  );
}
