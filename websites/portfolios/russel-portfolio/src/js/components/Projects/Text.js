import { Link } from "react-router-dom";

const Text = (props) => {
  return (
    <div className="Projects--text-container">
      <p className="Projects--name">{props.title}</p>
      <p className="Projects--description">{props.description}</p>
      <Link>Read more</Link>
    </div>
  );
};

export default Text;
