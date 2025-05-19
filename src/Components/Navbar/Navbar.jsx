import React, { useState, useEffect } from 'react';
import './Navbar.css';
import header_logo from '../../assets/header_logo.png';
import underline_navbar from '../../assets/underline.png';

const Navbar = () => {
    const [menu, setMenu] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);  // Hamburger menü durumu

    // Scroll yapıldığında aktif menüyü güncellemek için
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'services', 'projects', 'contact'];
            let current = 'home';

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const top = element.getBoundingClientRect().top;
                    if (top <= 80) {
                        current = section;
                    }
                }
            });

            setMenu(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Menü açılıp kapanınca scroll olunca menüyü kapatabiliriz
    useEffect(() => {
        const closeMenuOnScroll = () => {
            if(menuOpen) setMenuOpen(false);
        };
        window.addEventListener('scroll', closeMenuOnScroll);
        return () => window.removeEventListener('scroll', closeMenuOnScroll);
    }, [menuOpen]);

    return (
        <div className="navbar">
            <img src={header_logo} alt="Site Logo" className="nav-logo" />

            {/* Hamburger ikon (mobilde gözükecek) */}
            <div
                className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if(e.key === 'Enter') setMenuOpen(!menuOpen) }}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Menü */}
            <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                <li>
                    <a href="#home" onClick={() => {setMenu('home'); setMenuOpen(false);}}>
                        Ana Sayfa
                        {menu === 'home' && <img src={underline_navbar} alt="underline" />}
                    </a>
                </li>
                <li>
                    <a href="#about" onClick={() => {setMenu('about'); setMenuOpen(false);}}>
                        Ben Kimim?
                        {menu === 'about' && <img src={underline_navbar} alt="underline" />}
                    </a>
                </li>
                <li>
                    <a href="#services" onClick={() => {setMenu('services'); setMenuOpen(false);}}>
                        Neler Yapabilirim?
                        {menu === 'services' && <img src={underline_navbar} alt="underline" />}
                    </a>
                </li>
                <li>
                    <a href="#projects" onClick={() => {setMenu('projects'); setMenuOpen(false);}}>
                        Projelerim
                        {menu === 'projects' && <img src={underline_navbar} alt="underline" />}
                    </a>
                </li>
                <li>
                    <a href="#contact" onClick={() => {setMenu('contact'); setMenuOpen(false);}}>
                        İletişim
                        {menu === 'contact' && <img src={underline_navbar} alt="underline" />}
                    </a>
                </li>
            </ul>

            <div className="nav-connect" onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}>Benimle İletişime Geç</div>
        </div>
    );
};

export default Navbar;
