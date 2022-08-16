import { createContext, useRef, useState } from "react";
import "./App.css";

import clock from "./images/clock.png";
import phoneStatus from "./images/phoneHeader.png";

import bipSound from "./messageSend.mp3";
import ChatScreen from "./components/ChatScreen/ChatScreen";
import Loading from "./components/Loading/Loading";
import Menu from "./components/Menu/Menu";
import AppBar from "./components/AppBar/AppBar";

export const AppContext = createContext();
function App() {
  const appRef = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);

  const playBip = () => {
    const audio = new Audio(bipSound);
    audio.volume = 0.7;
    audio.addEventListener("canplaythrough", (event) => {
      audio.play();
    });
  };

  return (
    <AppContext.Provider
      value={{
        messageList,
        setMessageList,
        playBip,
        isMenuOpen,
        setShowLoading,
        setLoadPercent,
        appRef,
        setIsMenuOpen,
        loadPercent,
      }}
    >
      <div className="conntainer">
        {showLoading ? <Loading /> : <></>}
        <Menu />
        <div ref={appRef}>
          <div className="statusBar">
            <img src={clock} alt="clock" />
            <img id="phoneStatus" src={phoneStatus} alt="phone status" />
          </div>
          <AppBar />
          <ChatScreen />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
