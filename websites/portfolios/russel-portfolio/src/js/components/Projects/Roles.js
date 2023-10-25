import "./../../../css/Projects/Roles.css";

const Roles = ({ contributions }) => {
  const onBtnClickHandler = (e) => {};

  return (
    <div className="Projects--roles-container">
      <div>
        <button onClick={onBtnClickHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
            />
          </svg>
        </button>
        <p>Go back</p>
      </div>
      <div>
        <p>Contributions</p>
        <ul>
          {contributions.map((contribution) => (
            <li key={contribution}>{contribution}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Roles;
