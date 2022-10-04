import React from "react";
import "./Spots.scss";

import blueSpot from "../../assets/images/blueSpot.svg";
import lemonSpot from "../../assets/images/lemonSpot.svg";

export const Spots: React.FC = () => {
  return (
    <div className="spots">
      <img
        style={{
          width: "20vw"
        }}
        src={blueSpot}
        alt="blueSpot"
        id="blueSpot"
      />
      <img
        style={{
          width: "20vw"
        }}
        src={lemonSpot}
        alt="lemonSpot"
        id="lemonSpot"
      />
    </div>
  );
};
