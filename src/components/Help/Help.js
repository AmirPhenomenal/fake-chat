import React, { useContext } from "react";
import { AppContext } from "../../App";
import helpImage1 from "../../images/help1.jpg";
import helpImage2 from "../../images/help2.jpg";
import "./index.css";
const Help = () => {
  const { setShowHelp } = useContext(AppContext);
  return (
    <div className="help">
      <h1>General Help : </h1>
      <img className="images" src={helpImage1} alt="help1" />
      <h1>Menu Help : </h1>
      <img className="images" src={helpImage2} alt="help2" />

      <button
        className="btn"
        onClick={() => {
          setShowHelp((p) => !p);
        }}
      >
        Skip
      </button>
    </div>
  );
};

export default Help;
