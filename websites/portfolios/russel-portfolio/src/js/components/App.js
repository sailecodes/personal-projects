import "../../css/App.css";
import "../../css/utilities.css";

import Nav from "./Nav";
import Hero from "./Hero";
import Projects from "./Projects/Projects";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <Nav />
      <Hero />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
