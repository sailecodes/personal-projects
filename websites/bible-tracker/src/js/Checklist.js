import "../css/Checklist.css";
import { useParams } from "react-router-dom";

const Checklist = () => {
  const { bookName } = useParams();

  // FIXME: Temporary checklist layout
  return (
    <section class="Checklist">
      <header>{bookName}</header>
      <div>
        <div>
          <button type="button"></button>
          <p>1-3:12</p>
        </div>
        <div>
          <button type="button"></button>
          <p>2</p>
        </div>
        <div>
          <button type="button"></button>
          <p>3</p>
        </div>
        <div>
          <button type="button"></button>
          <p>4</p>
        </div>
        <div>
          <button type="button"></button>
          <p>1</p>
        </div>
        <div>
          <button type="button"></button>
          <p>2</p>
        </div>
        <div>
          <button type="button"></button>
          <p>3</p>
        </div>
        <div>
          <button type="button"></button>
          <p>4</p>
        </div>
        <div>
          <button type="button"></button>
          <p>1</p>
        </div>
        <div>
          <button type="button"></button>
          <p>2</p>
        </div>
        <div>
          <button type="button"></button>
          <p>3</p>
        </div>
        <div>
          <button type="button"></button>
          <p>4</p>
        </div>
        <div>
          <button type="button"></button>
          <p>1</p>
        </div>
        <div>
          <button type="button"></button>
          <p>2</p>
        </div>
        <div>
          <button type="button"></button>
          <p>3</p>
        </div>
        <div>
          <button type="button"></button>
          <p>4</p>
        </div>
      </div>
    </section>
  );
};

export default Checklist;
