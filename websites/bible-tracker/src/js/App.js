import "../css/App.css";

import Header from "./Header";
import MainNav from "./MainNav";
import Home from "./Home";
import NewBody from "./NewBody";
import OldBody from "./OldBody";
import Footer from "./Footer";

import { Routes, Route } from "react-router-dom";

function App() {
  const tmpData = [
    { bookName: "Matthew" },
    { bookName: "Mark" },
    { bookName: "Luke" },
    { bookName: "John" },
    { bookName: "Acts" },
    { bookName: "Romans" },
    { bookName: "1 Corinthians" },
    { bookName: "2 Corinthians" },
    { bookName: "Galatians" },
    { bookName: "Ephesians" },
    { bookName: "Philippians" },
    { bookName: "Colossians" },
    { bookName: "1 Thessalonians" },
    { bookName: "2 Thessalonians" },
    { bookName: "1 Timothy" },
    { bookName: "2 Timothy" },
    { bookName: "Titus" },
    { bookName: "Philemon" },
    { bookName: "Hebrews" },
    { bookName: "James" },
    { bookName: "1 Peter" },
    { bookName: "2 Peter" },
    { bookName: "1 John" },
    { bookName: "2 John" },
    { bookName: "3 John" },
    { bookName: "Jude" },
    { bookName: "Revelation" },
  ];

  return (
    <div className="App">
      <Header />
      <MainNav />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/oldtestament"
          element={<OldBody />}
        />
        <Route
          path="/newtestament"
          element={<NewBody />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
