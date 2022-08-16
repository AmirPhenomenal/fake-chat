import React, { useContext } from "react";
import { AppContext } from "../../App";
import "./index.css";
const Loading = () => {
  const { loadPercent } = useContext(AppContext);
  return (
    <div className="loading">
      <h1>Loading</h1>
      <div className="loadingBar">
        <div
          style={{
            backgroundColor: "green",
            width: `${loadPercent.toFixed(2)}%`,
            height: "100%",
            borderRadius: "1vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5vh",
          }}
        >
          {`${loadPercent.toFixed(2)}%`}
        </div>
      </div>
    </div>
  );
};

export default Loading;
