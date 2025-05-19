import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx'
import Person from './Components/Person/Person.jsx'
import About from './Components/About/About.jsx'
import Services from './Components/Services/Services.jsx'
import Projects from './Components/Projects/Projects.jsx'
import Contact from './Components/Contact/Contact.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Theme from './Components/Toast.jsx'
import ScrollToTop from'./Components/ScrollToTopOnLoad.jsx'
import ScrollTopButton from "./Components/ ScrollTopButton.jsx";
import React, { useEffect, useState } from 'react';


function App() {
    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const doc = document.documentElement;
            const scrollTop = window.pageYOffset || doc.scrollTop;
            const scrollHeight = doc.scrollHeight - doc.clientHeight;
            let scroll = (scrollTop / scrollHeight) * 100;
            if (scroll > 100) scroll = 100;
            setScrollPercent(scroll);

            const progressBar = document.getElementById('progressBar');
            if (progressBar) {
                progressBar.style.width = scroll + '%';
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <div className="App">
        <div id="progressBar"></div>
        <span id="progressNumber">{Math.floor(scrollPercent)}%</span>
        <Navbar/>
        <Person/>
        <About/>
        <Services/>
        <Projects/>
        <Contact/>
        <Footer/>
        <Theme/>
        <ScrollToTop/>
        <ScrollTopButton/>
    </div>

  );
}

export default App;
