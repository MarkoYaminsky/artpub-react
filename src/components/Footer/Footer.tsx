import React from "react";
import "./Footer.scss";
import instagram from "../../assets/images/instagram.svg";
import facebook from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/twitter.svg";

export const Footer: React.FC = () => {
  return (
    <footer>
      <nav className="icons">
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          <img src={instagram} alt="instagram" />
        </a>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          <img src={twitter} alt="twitter" />
        </a>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          <img src={facebook} alt="facebook" />
        </a>
      </nav>
    </footer>
  );
};
