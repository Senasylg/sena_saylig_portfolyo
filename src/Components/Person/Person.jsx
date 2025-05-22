import React, { useState, useEffect, useRef } from 'react';
import './Person.css';
import profile_img from '../../assets/person_foto.jpg';
import linkedin_icon from "../../assets/linkedin_icon.png";

const Person = () => {
    const namePart = "Sena Şaylıg-";
    const restPart = " Endüstri & Bilgisayar Mühendisliği Öğrencisi";
    const fullText = namePart + restPart;

    const [displayedText, setDisplayedText] = useState("");
    const indexRef = useRef(0);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const startTyping = () => {
            intervalRef.current = setInterval(() => {
                if (indexRef.current < fullText.length) {
                    setDisplayedText(fullText.substring(0, indexRef.current + 1));
                    indexRef.current += 1;
                } else {
                    clearInterval(intervalRef.current);
                    timeoutRef.current = setTimeout(() => {
                        indexRef.current = 0;
                        setDisplayedText("");
                        startTyping();
                    }, 60000); // 60000 ms = 1 dakika
                }
            }, 100); // Her karakter 100ms'de yazılıyor
        };

        startTyping();

        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);
        };
    }, []);

    const coloredName = displayedText.slice(0, namePart.length);
    const normalText = displayedText.slice(namePart.length);

    return (
        <div id="home" className="person">
            <img src={profile_img} alt="" />
            <h1>
                <span style={{ color: "#00BFFF" }}>{coloredName}</span>
                <span style={{ color: "white" }}>{normalText}</span>
                <span className="blinking-cursor">|</span>
            </h1>
            <p>
                Balıkesir Üniversitesi’nde Endüstri ve Bilgisayar Mühendisliği çift ana dal öğrencisiyim. Bu iki disiplinin bana kazandırdığı eşsiz perspektif sayesinde, teknoloji ve sistemleri daha akıllı ve verimli hale getirmek için çalışıyorum.
                Endüstri mühendisliğinin sistem odaklı düşünme becerileriyle, bilgisayar mühendisliğinin kodlama ve analiz yeteneklerini bir araya getiriyorum. Bu sentez, bana karmaşık problemleri hem geniş açıdan görebilme hem de teknik detaylarıyla çözümleyebilme gücü veriyor.
                Öğrenme yolculuğumda edindiğim bilgileri pratik ve somut projelere dönüştürmekten büyük heyecan duyuyorum. Amacım, sürdürülebilir ve yenilikçi çözümler üreterek mühendisliğin sınırlarını keşfetmek.
            </p>
            <div className="person-action">
                <div className="person-action">
                    <div
                        className="person-connect"
                        onClick={() => {
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        Benimle İletişime Geç
                    </div>
                    <a
                        href="https://www.linkedin.com/in/sena-şaylığ-349459316"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="person-resume"
                    >
                        Özgeçmişim
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Person;
