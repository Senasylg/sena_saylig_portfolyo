import React from 'react';

const ScrollTopButton = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            style={{
                position: 'fixed',
                bottom: '30px',
                left: '30px',
                width: '40px',
                height: '40px',
                fontSize: '24px',
                background: 'linear-gradient(267deg, #00ff00 -5.09%, #00BFFF 106.28%)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,191,255,0.4)',
                zIndex: 1000,
                opacity: 0.7,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'background 0.3s ease, opacity 0.3s ease'
            }}
            onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(267deg, #00BFFF 0%, #00ff00 100%)';
                e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(267deg, #00ff00 -5.09%, #00BFFF 106.28%)';
                e.currentTarget.style.opacity = '0.7';
            }}
            aria-label="Sayfanın üstüne çık"
        >
            ↑
        </button>
    );
};

export default ScrollTopButton;
