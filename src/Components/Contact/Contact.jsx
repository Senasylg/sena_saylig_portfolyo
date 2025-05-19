import React from 'react'
import './Contact.css'
import theme_pattern from '../../assets/pattern_green_small.png'
import mail_icon from '../../assets/mail_icon.svg'
import location_icon from '../../assets/location_icon.svg'
import call_icon from '../../assets/call_icon.svg'
import linkedin_icon from '../../assets/linkedin_icon.png'
import github_icon from '../../assets/github_icon.png'

const Contact = () => {
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
                            <a href="mailto:senasaylig@gmail.com">
                                <img src={mail_icon} alt="Mail"/>
                            </a><p>senasaylig@gmail.com</p>
                        </div>
                        <div className="contact-detail">
                            <img src={call_icon} alt=""/> <p>+531 090 00 00</p>
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
                    </div>
                </div>
                <form className="contact-right">
                    <label htmlFor=""> Ad-Soyad</label>
                    <input type="text" placeholder="İsminizi Giriniz" name="name"/>
                    <label htmlFor=""> E-mail Adresi</label>
                    <input type="email" placeholder="E-mail Adresinizi Giriniz" name="email"/>
                    <label htmlFor=""> Mesaj Yaz</label>
                    <textarea name="message" rows="10" placeholder="Mesajınızı Giriniz"></textarea>
                    <button type = "submit" className="contact-submit">Gönder</button>
                </form>
            </div>
        </div>
    )
}

export default Contact