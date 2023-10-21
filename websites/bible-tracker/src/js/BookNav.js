import "../css/BookNav.css";

import { useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";

const BookNav = () => {
  const newTestament = useStoreState((state) => state.newTestament);
  return (
    <nav className="BookNav">
      {newTestament.map((info) => (
        <div key={info.bookName}>
          <Link to={`/newtestament/${info.bookName}`}>{info.bookName}</Link>
        </div>
      ))}
    </nav>
  );
};

export default BookNav;
