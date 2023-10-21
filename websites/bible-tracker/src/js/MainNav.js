import "../css/MainNav.css";

import { Link } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

const MainNav = () => {
  const searchText = useStoreState((state) => state.searchText);
  const setSearchText = useStoreActions((actions) => actions.setSearchText);

  return (
    <div className="MainNav">
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
          <Link to="/">Home</Link>
        </li>
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

export default MainNav;
