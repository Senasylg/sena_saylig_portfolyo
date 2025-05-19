import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx'
import Person from './Components/Person/Person.jsx'
import About from './Components/About/About.jsx'
import Services from './Components/Services/Services.jsx'
import Projects from './Components/Projects/Projects.jsx'
import Contact from './Components/Contact/Contact.jsx'
import Footer from './Components/Footer/Footer.jsx'

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
    </div>

  );
}

export default App;
