import React from 'react'
import './Person.css'
import profile_img from '../../assets/person_foto.jpg'
const Person = () => {
    return (
        <div id="home" className="person">
            <img src={profile_img} alt=""/>
            <h1><span>Sena Şaylıg-</span> Endüstri & Bilgisayar Mühendisliği Öğrencisi</h1>
            <p>Balıkesir Üniversitesi'nde Endüstri ve Bilgisayar Mühendisliği'ni birlikte yürüten çift ana dal öğrencisiyim. Bu iki disiplinin bana kazandırdığı eşsiz perspektif sayesinde, teknoloji ve sistemleri daha akıllı ve verimli hale getirmek için çalışıyorum.
                Endüstri mühendisliğinin sistem odaklı düşünme becerileriyle, bilgisayar mühendisliğinin kodlama ve analiz yeteneklerini bir araya getiriyorum. Bu sentez, bana karmaşık problemleri hem geniş açıdan görebilme hem de teknik detaylarıyla çözümleyebilme gücü veriyor.
                Öğrenme yolculuğumda edindiğim bilgileri gerçek dünya uygulamalarına dönüştürmekten büyük heyecan duyuyorum. Amacım, sürdürülebilir ve yenilikçi çözümler üreterek mühendisliğin sınırlarını keşfetmek.</p>
            <div className="person-action">
                <div className="person-connect" onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}>Benimle İletişime Geç</div>
                <div className="person-resume">Özgeçmişim</div>
            </div>
        </div>
    )
}

export default Person