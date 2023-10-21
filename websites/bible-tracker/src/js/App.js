import "../css/App.css";

import Header from "./Header";
import MainNav from "./MainNav";
import Home from "./Home";
import NewBody from "./NewBody";
import OldBody from "./OldBody";
import Footer from "./Footer";
import Error from "./Error";

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import axios from "axios";

function App() {
  const setNewTestament = useStoreActions((actions) => actions.setNewTestament);

  useEffect(() => {
    const fetchNewTestament = async () => {
      try {
        const response = await axios.get("http://localhost:3500/newTestament");
        setNewTestament(response.data);
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    };

    fetchNewTestament();
  }, [setNewTestament]);

  return (
    <div className="App">
      <Header />
      <MainNav />
      <Routes>
        <Route path="/">
          <Route
            index
            element={<Home />}
          />
          <Route
            path="oldtestament"
            element={<OldBody />}
          />
          <Route
            path="newtestament/*"
            element={<NewBody />}
          />
          <Route
            path="*"
            element={<Error />}
          />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
