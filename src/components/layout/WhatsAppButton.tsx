import { FaWhatsapp } from 'react-icons/fa6';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/51999999999"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '64px',
        height: '64px',
        backgroundColor: '#FFCD11',
        color: '#1B1B1B',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
        zIndex: 9999,
        transition: 'all 0.2s ease-in-out',
        textDecoration: 'none',
        border: '3px solid #1B1B1B',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1) translateY(-4px)';
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 10px 25px rgba(255,205,17,0.5)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1) translateY(0)';
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 14px rgba(0,0,0,0.3)';
      }}
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp size={38} />
    </a>
  );
}
