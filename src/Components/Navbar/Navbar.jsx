import React, { useState, useEffect } from 'react';
import './Navbar.css';
import header_logo from '../../assets/header_logo.png';
import underline_navbar from '../../assets/underline.png';
import menu_open from '../../assets/menu_open.svg';
import menu_close from '../../assets/menu_close.svg';

const Navbar = () => {
    const [menu, setMenu] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'services', 'projects', 'contact'];
            let current = 'home';

            sections.forEach(section => {
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

    useEffect(() => {
        const closeMenuOnScroll = () => {
            if (menuOpen) setMenuOpen(false);
        };
        window.addEventListener('scroll', closeMenuOnScroll);
        return () => window.removeEventListener('scroll', closeMenuOnScroll);
    }, [menuOpen]);

    const openMenu = () => setMenuOpen(true);
    const closeMenu = () => setMenuOpen(false);

    return (
        <div className="navbar">
            <img src={header_logo} alt="Site Logo" className="nav-logo" />

            {/* Hamburger Menü Açma İkonu */}
            <img
                src={menu_open}
                onClick={openMenu}
                alt="Open Menu"
                className={`nav-mob-open ${menuOpen ? 'hidden' : ''}`}
            />

            {/* Menü */}
            <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                {/* Menü kapatma ikonu */}
                {menuOpen && (
                    <img
                        src={menu_close}
                        onClick={closeMenu}
                        alt="Close Menu"
                        className={`nav-mob-close ${menuOpen ? 'open' : ''}`}
                    />
                )}

                <li>
                    <a href="#home" onClick={() => { setMenu('home'); closeMenu(); }}>
                        Ana Sayfa
                        {menu === 'home' && <img src={underline_navbar} alt="underline" />}
                    </a>
                </li>
                <li>
                    <a href="#about" onClick={() => { setMenu('about'); closeMenu(); }}>
                        Ben Kimim?
                        {menu === 'about' && <img src={underline_navbar} alt="underline" />}
                    </a>
                </li>
                <li>
                    <a href="#services" onClick={() => { setMenu('services'); closeMenu(); }}>
                        Neler Yapabilirim?
                        {menu === 'services' && <img src={underline_navbar} alt="underline" />}
                    </a>
                </li>
                <li>
                    <a href="#projects" onClick={() => { setMenu('projects'); closeMenu(); }}>
                        Portfolyo
                        {menu === 'projects' && <img src={underline_navbar} alt="underline" />}
                    </a>
                </li>
                <li>
                    <a href="#contact" onClick={() => { setMenu('contact'); closeMenu(); }}>
                        İletişim
                        {menu === 'contact' && <img src={underline_navbar} alt="underline" />}
                    </a>
                </li>
            </ul>

            <div className="nav-connect" onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}>
                Benimle İletişime Geç
            </div>
        </div>
    );
};

export default Navbar;
