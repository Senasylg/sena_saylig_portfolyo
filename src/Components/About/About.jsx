import React from 'react'
import './About.css'
import theme_pattern from '../../assets/pattern_blue_small.png'
import profile_img from '../../assets/person_foto.jpg'

const About = () => {
    return (
        <div id="about" className="about">
            <div className="about-title">
                <h1>Ben Kimim ?</h1>
                <img src={theme_pattern} alt=""/>
            </div>
            <div className="about-sections">
                <div className="about-left">
                    <img src={profile_img} alt=""/>
                </div>
                <div className="about-right">
                    <div className="about-para">
                        <p>2022 yılında Balıkesir Üniversitesi Endüstri Mühendisliği bölümünde eğitimime başladım. 2023’te Bilgisayar Mühendisliği Çift Anadal Programı’na kabul edildim. Şu anda Endüstri Mühendisliği 4.sınıf, Bilgisayar Mühendisliği 3.sınıf öğrencisiyim.</p>
                        <p>Beyçelik Gestamp Otomotiv’de atölye stajımda üretim süreçlerini gözlemledim; üretim planlama, kalite ve Ar-Ge gibi birimlerle çalışma fırsatı buldum. Excel VBA ile üretim planlamaya yönelik bir makro geliştirerek planlama sürecini kolaylaştırdım.</p>
                        <p>Ders projelerimde C#, Python, MS SQL Server, AUTOCAD, SOLIDWORKS, Arena Rockwell Simulation ve CATIA kullanarak yazılım, tasarım ve simülasyon çalışmaları yaptım. Gelecekte veri bilimi, makine öğrenimi ve büyük veri alanlarında uzmanlaşarak üretime yönelik çözümler geliştirmeyi hedefliyorum.</p>
                    </div>
                    <div className="about-skills">
                        <div className="about-skill"><p>AUTOCAD</p><hr style={{width: "60%"}}/></div>
                        <div className="about-skill"><p>SOLIDWORKS</p><hr style={{width: "90%"}}/></div>
                        <div className="about-skill"><p>ARENA ROCKWELL SIMULATION</p><hr style={{width: "75%"}}/></div>
                        <div className="about-skill"><p>MICROSOFT SQL SERVER</p><hr style={{width: "90%"}}/></div>
                        <div className="about-skill"><p>EXCEL & EXCEL VBA</p><hr style={{width: "70%"}}/></div>
                        <div className="about-skill"><p>HTML & CSS & JAVASCRIPT</p><hr style={{width: "60%"}}/></div>
                        <div className="about-skill"><p>PYTHON</p><hr style={{width: "50%"}}/></div>
                        <div className="about-skill"><p>C#</p><hr style={{width: "65%"}}/></div>
                    </div>
                </div>
            </div>
            <div className="about-achievements">
                <div className="about-achievement">
                    <h1>7+</h1>
                    <p>TASARIM</p>
                </div>
                <hr/>
                <div className="about-achievement">
                    <h1>10+</h1>
                    <p>ARAŞTIRMA VE SUNUM</p>
                </div>
                <hr/>
                <div className="about-achievement">
                    <h1>6+</h1>
                    <p>PROJE</p>
                </div>
            </div>
        </div>
    )
}

export default About