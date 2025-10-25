import React, { useState, useRef } from 'react';
import './Contact.css'
import theme_pattern from '../../assets/pattern_green_small.png'
import mail_icon from '../../assets/mail_icon.svg'
import location_icon from '../../assets/location_icon.svg'
import call_icon from '../../assets/call_icon.svg'
import linkedin_icon from '../../assets/linkedin_icon.png'
import github_icon from '../../assets/github_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'

const Contact = () => {
    const [sent, setSent] = useState(false);
    const buttonRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ripple effect yarat
        const button = buttonRef.current;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
        circle.classList.add("ripple");

        // Daha önce varsa temizle
        const ripple = button.getElementsByClassName("ripple")[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);

        // Mesaj gönderildi durumunu aktif et
        setSent(true);

        // 5 saniye sonra mesajı kapat
        setTimeout(() => setSent(false), 5000);

        // Form temizlenebilir (opsiyonel)
        e.target.reset();
    };

    return (
        <div id="contact" className="contact">
            <div className="contact-title">
                <h1>İletişim</h1>
                <img src={theme_pattern} alt=""/>
            </div>
            <div className="contact-section">
                <div className="contact-left">
                    <h1>İletişim Bilgilerim</h1>
                    <p>Aşağıdaki bilgilerden bana ulaşabilirsiniz.</p>
                    <div className="contact-details">
                        <div className="contact-detail">
                            <a href="mailto:senasaylig@gmail.com" className="flex items-center gap-2">
                                <img src={mail_icon} alt="Mail" className="w-5 h-5" />
                                <span>senasaylig@gmail.com</span>
                            </a>
                        </div>
                        <div className="contact-detail">
                            <img src={call_icon} alt=""/> <p>+531 087 13 99</p>
                        </div>
                        <div className="contact-detail">
                            <a
                                href="https://www.google.com/maps/place/Nilüfer,+Bursa"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={location_icon} alt="Konum" />
                            </a> <p>Nilüfer/Bursa</p>
                        </div>
                        <div className="contact-detail">
                            <a href="https://www.linkedin.com/in/sena-şaylığ-349459316" target="_blank" rel="noopener noreferrer">
                                <img src={linkedin_icon} alt="LinkedIn"/>
                            </a>
                            <p>Linkedin Profil</p>
                        </div>
                        <div className="contact-detail">
                            <a href="https://github.com/Senasylg" target="_blank" rel="noopener noreferrer">
                                <img src={github_icon} alt="GitHub"/>
                            </a>
                            <p>Github Profil</p>
                        </div>
                        <div className="contact-detail">
                            <a href="#" onClick={e => e.preventDefault()} target="_blank" rel="noopener noreferrer">
                                <img src={facebook_icon} alt="Facebook" />
                            </a>
                            <p>Facebook Profil</p>
                        </div>
                    </div>
                </div>
                <form className="contact-right" onSubmit={handleSubmit}>
                    <label> Ad-Soyad</label>
                    <input type="text" placeholder="İsminizi Giriniz" name="name" required />
                    <label> E-mail Adresi</label>
                    <input type="email" placeholder="E-mail Adresinizi Giriniz" name="email" required />
                    <label> Mesaj Yaz</label>
                    <textarea name="message" rows="10" placeholder="Mesajınızı Giriniz" required></textarea>

                    <div className="submit-wrapper">
                        <button ref={buttonRef} type="submit" className="contact-submit">Gönder</button>
                        {sent && <p className="sent-message">Mesaj gönderilmiştir.</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact;
