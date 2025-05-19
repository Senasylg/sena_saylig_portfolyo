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

function App() {
  return (
    <div className="App">
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
