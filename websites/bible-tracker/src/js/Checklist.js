import { useParams } from "react-router-dom";

const Checklist = () => {
  const { bookName } = useParams();

  return <div>{bookName}</div>;
};

export default Checklist;
