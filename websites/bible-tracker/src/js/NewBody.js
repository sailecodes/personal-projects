import BookNav from "./BookNav";
import Checklist from "./Checklist";

import { Routes, Route } from "react-router-dom";

const NewBody = () => {
  return (
    <main>
      <BookNav />
      <Routes>
        <Route
          path=":bookName"
          element={<Checklist />}
        />
      </Routes>
    </main>
  );
};

export default NewBody;
