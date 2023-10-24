import "../../css/App.css";
import "../../css/utilities.css";
import Hero from "./Hero";
import Projects from "./Projects";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <Hero />
      <div className="horizontal-line"></div>
      <Projects />
      <div className="horizontal-line"></div>
      <Footer />
    </div>
  );
}

export default App;
