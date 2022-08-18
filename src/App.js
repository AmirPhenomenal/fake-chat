import { createContext, useEffect, useRef, useState } from "react";
import "./App.css";

import clock from "./images/clock.png";
import phoneStatus from "./images/phoneHeader.png";

import bipSound from "./messageSend.mp3";
import ChatScreen from "./components/ChatScreen/ChatScreen";
import Loading from "./components/Loading/Loading";
import Menu from "./components/Menu/Menu";
import AppBar from "./components/AppBar/AppBar";
import Help from "./components/Help/Help";

export const AppContext = createContext();
function App() {
  const appRef = useRef();
  const lastMessageRef = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);
  const [showHelp, setShowHelp] = useState(true);

  const playBip = () => {
    const audio = new Audio(bipSound);
    audio.volume = 0.7;
    audio.addEventListener("canplaythrough", (event) => {
      audio.play();
    });
  };

  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

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
        lastMessageRef,
        setShowHelp,
      }}
    >
      <div className="conntainer">
        {showHelp ? <Help /> : <></>}
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
