import React from 'react'
import './Footer.css'
import footer_logo from '../../assets/footer_logo.png'
import user_icon from '../../assets/user_icon.svg'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-top">
                <div className="footer-top-left">
                    <img src={footer_logo} alt=""/>
                </div>
                <div className="footer-top-right">
                    <div className="footer-email-input">
                        <img src={user_icon} alt=""/>
                        <input type="email" placeholder="E-mail Adresinizi Giriniz"/>
            </div>
                    <div className="footer-subscribe">Subscribe</div>
                </div>
            </div>
            <hr/>
            <div className="footer-bottom">
                <p className="footer-bottom-left">© 2025 Sena Şaylıg. Tüm hakları saklıdır.</p>
                <div className="footer-bottom-right">
                <p>Hizmet Şartları</p>
                <p>Gizlilik Politikası</p>
                </div>
            </div>
        </div>
    )
}

export default Footer