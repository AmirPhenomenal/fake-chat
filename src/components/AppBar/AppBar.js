import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import videoIcon from "../../icons/video.png";
import callIcon from "../../icons/phone.png";
import menuIcon from "../../icons/ellipsis-vertical.png";
import defaultPP from "../../images/avatar.png";
import "./index.css";
const AppBar = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(AppContext);
  const [pp, setPp] = useState(defaultPP);
  const [nickname, setNickname] = useState("Nickname");
  const nicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const menuClick = async (event) => {
    console.log(isMenuOpen);
    setIsMenuOpen((p) => !p);
  };

  const avatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPp(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <div className="appBar">
      <div className="appBarLeft">
        <svg
          className="arrow"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="ArrowBackSharpIcon"
          fill="#b9bfd1"
        >
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
        </svg>
        <div>
          <label htmlFor="pp" className="ppLabel">
            <img src={pp} alt="ProfilePicture" className="ppImage" />
          </label>
          <input
            id="pp"
            type={"file"}
            accept="image/*"
            onChange={avatarChange}
          />
        </div>
        <input
          className="nickname"
          type={"text"}
          value={nickname}
          onChange={nicknameChange}
        />
      </div>
      <div className="appBarRight">
        <img className="appBarIcons" src={videoIcon} alt="video" />
        <img className="appBarIcons" src={callIcon} alt="call" />
        <img
          className={`appBarIcons ${isMenuOpen ? "open" : "close"}`}
          src={menuIcon}
          alt="video"
          onClick={menuClick}
        />
      </div>
    </div>
  );
};

export default AppBar;
