import React, { useState } from 'react';

const MakeChatPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const goldColor = '#D4AF37';
  const darkBg = '#0A0A0A'; // Negro profundo

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setInput('');

    let lat = "";
    let lng = "";
    try {
      const pos = await new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 10000 });
      });
      lat = pos.coords.latitude.toString();
      lng = pos.coords.longitude.toString();
    } catch (e) {
      console.log("Ubicación no disponible");
    }

    try {
      const response = await fetch('https://hook.us2.make.com/xt7xobyghce8mi8fvjsguwyv1vi90cxx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "Message 1": userMsg.content, // Texto de búsqueda
          "Message 2": lat,             // Latitud
          "Message 3": lng              // Longitud
        }),
      });

      const data = await response.json();
      const botMsg = { role: 'bot', content: data.respuesta || "No pude encontrar información oficial." };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Error de conexión con el asistente.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      left: isOpen ? '0' : '-350px',
      top: '0',
      width: '350px',
      height: '100vh',
      backgroundColor: darkBg,
      boxShadow: '4px 0 15px rgba(0,0,0,0.5)',
      transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', sans-serif",
      borderRight: `1px solid ${goldColor}33` // Dorado con transparencia
    }}>
      {/* Botón Tirador Dorado */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'absolute',
          right: '-45px',
          top: '40px',
          height: '100px',
          width: '45px',
          backgroundColor: darkBg,
          color: goldColor,
          border: `1px solid ${goldColor}66`,
          borderLeft: 'none',
          borderRadius: '0 12px 12px 0',
          cursor: 'pointer',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          fontSize: '11px',
          letterSpacing: '2px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s'
        }}
      >
        {isOpen ? 'CERRAR' : 'RECOMENDACIONES'}
      </button>

      {/* Cabecera Lujosa */}
      <div style={{ 
        padding: '30px 20px', 
        borderBottom: `1px solid ${goldColor}33`,
        textAlign: 'center'
      }}>
        <h3 style={{ 
          margin: 0, 
          fontSize: '16px', 
          color: goldColor, 
          letterSpacing: '3px', 
          textTransform: 'uppercase' 
        }}>
          Concierge Maps
        </h3>
      </div>

      {/* Área de Chat */}
      <div style={{ 
        padding: '20px', 
        flexGrow: 1, 
        overflowY: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px',
        scrollbarWidth: 'thin',
        scrollbarColor: `${goldColor} #000`
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ 
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: m.role === 'user' ? `${goldColor}15` : 'transparent',
            color: m.role === 'user' ? 'white' : '#E0E0E0',
            padding: '12px 16px',
            borderRadius: m.role === 'user' ? '15px 15px 2px 15px' : '15px 15px 15px 2px',
            border: `1px solid ${m.role === 'user' ? goldColor : '#333'}`,
            maxWidth: '85%',
            fontSize: '13px',
            lineHeight: '1.6',
            boxShadow: m.role === 'user' ? `0 0 10px ${goldColor}10` : 'none'
          }}>
            {m.content}
          </div>
        ))}
        {loading && (
          <p style={{ fontSize: '11px', color: goldColor, fontStyle: 'italic', letterSpacing: '1px' }}>
            Consultando guía exclusiva...
          </p>
        )}
      </div>

      {/* Input de lujo */}
      <div style={{ padding: '25px 20px', borderTop: `1px solid ${goldColor}22` }}>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="¿Qué experiencia busca hoy?"
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: '#151515', 
            border: '1px solid #333', 
            borderRadius: '5px', 
            color: 'white',
            marginBottom: '15px',
            outline: 'none',
            fontSize: '13px'
          }}
        />
        <button 
          onClick={sendMessage} 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: goldColor, 
            color: 'black', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'transform 0.2s'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {loading ? 'BUSCANDO...' : 'RECOMENDAR'}
        </button>
      </div>
    </div>
  );
};

export default MakeChatPanel;