import "../styles/Nav.css";

import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="Nav">
      <form>
        <input
          type="text"
          placeholder="Search bible texts..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link to="/oldtestament">Old Testament</Link>
        </li>
        <li>
          <Link to="/newtestament">New Testament</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
