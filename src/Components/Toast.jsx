import React, { useEffect, useState } from 'react';

const WelcomeToast = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        const timer = setTimeout(() => setShow(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            padding: '18px 30px',
            background: 'linear-gradient(267deg, #00ff00 -5.09%, #00BFFF 106.28%)',
            color: 'black',
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(0, 191, 255, 0.5)',
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            pointerEvents: show ? 'auto' : 'none',
            fontWeight: '700',
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 9999,
            userSelect: 'none',
            cursor: 'default',
        }}>
            <span style={{ fontSize: '1.5rem' }} role="img" aria-label="wave">👋</span>
            Hoşgeldiniz!
        </div>
    );
};

export default WelcomeToast;
