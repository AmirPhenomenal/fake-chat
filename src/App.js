import { createContext, useRef, useState } from "react";
import "./App.css";
import defaultPP from "./avatar.png";
import clock from "./clock.png";
import phoneStatus from "./phoneHeader.png";
import videoIcon from "./video.png";
import callIcon from "./phone.png";
import menuIcon from "./ellipsis-vertical.png";
import sendIcon from "./paper-plane.png";
import emojiIcon from "./face-smile.png";
import ChatMessage from "./components/ChatMessage";
import { v4 as uuid } from "uuid";
import delay from "delay";
import bipSound from "./messageSend.mp3";
import { toCanvas, toJpeg } from "html-to-image";

export const AppContext = createContext();
function App() {
  const appRef = useRef();
  const [pp, setPp] = useState(defaultPP);
  const [nickname, setNickname] = useState("Nickname");
  const [chatInput, setChatInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);
  // let canvasRef = useRef(new HTMLCanvasElement());
  const nicknameChange = (event) => {
    setNickname(event.target.value);
  };
  const chatInputChange = (event) => {
    setChatInput(event.target.value);
  };
  const recordVideo = async () => {
    let canvas = await toCanvas(appRef.current);
    const ctx = canvas.getContext("2d");

    const stream = canvas.captureStream(15);

    function startRecording(duration) {
      let recorder = new MediaRecorder(stream);
      let data = [];

      recorder.ondataavailable = (event) => data.push(event.data);
      recorder.start();
      console.log(`${recorder.state} for ${duration / 1000} seconds…`);

      let stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve;
        recorder.onerror = (event) => reject(event.name);
      });

      let recorded = delay(duration).then(() => {
        if (recorder.state === "recording") {
          recorder.stop();
        }
      });

      return Promise.all([stopped, recorded]).then(() => data);
    }
    const interval = setInterval(async () => {
      ctx.drawImage(await toCanvas(appRef.current), 0, 0);
    }, 50);
    // await delay(5000);
    //------------------------
    replayChat();
    const recordDurationMS = messageList.length * 2000 + 2000 + 2000;
    console.log("data : ");
    let recordedBlob = new Blob(await startRecording(recordDurationMS), {
      type: "video/webm",
    });
    clearInterval(interval);
    console.log(recordedBlob);
    const saveSrc = window.URL.createObjectURL(recordedBlob);

    const link = document.createElement("a");
    link.download = "RecordedVideo.mp4";
    link.href = saveSrc;
    link.click();
  };

  const menuClick = async (event) => {
    console.log(isMenuOpen);
    setIsMenuOpen((p) => !p);
  };
  const takeScreenshot = async () => {
    const image = await toJpeg(appRef.current);
    const link = document.createElement("a");
    link.download = "my-image-name.png";
    link.href = image;
    link.click();
  };
  const saveVideo = async () => {
    const duration = messageList.length * 2000 + 2000 + 2000;
    const updateIntervalMS = 1000;
    const updatePercent = (100 * updateIntervalMS) / duration;
    let timeSpent = 0;
    console.log("update:", updatePercent);
    setShowLoading(true);
    const percentInterval = setInterval(() => {
      if (timeSpent >= 100) {
        console.log("cleared");
        clearInterval(percentInterval);
        return;
      }
      timeSpent += updatePercent;
      setLoadPercent(timeSpent);
    }, updateIntervalMS);

    await recordVideo();
    setShowLoading(false);
    setLoadPercent(0);
  };
  const openRepo = () => {
    window
      .open(
        "http://github.com/AmirPhenomenal/fake-chat",
        "_blank",
        "noopener,noreferrer"
      )
      .focus();
  };
  const avatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPp(URL.createObjectURL(event.target.files[0]));
    }
  };
  const playBip = () => {
    const audio = new Audio(bipSound);
    audio.volume = 0.7;
    audio.addEventListener("canplaythrough", (event) => {
      audio.play();
    });
  };
  const replayChat = async () => {
    let tmpMessageList = [...messageList];
    setMessageList([]);
    for (let i = 0; i < tmpMessageList.length; i++) {
      await delay(2000);
      console.log("added message ", i, "  ", tmpMessageList[i]);
      setMessageList((p) => [...p, tmpMessageList[i]]);
      playBip();
    }
  };
  const sendMessage = () => {
    let tmpMessageList = [...messageList];
    tmpMessageList.push({ msgId: uuid(), text: chatInput, self: true });
    setChatInput("");
    setMessageList(tmpMessageList);
    playBip();
  };
  return (
    <AppContext.Provider value={{ messageList, setMessageList }}>
      <div className="conntainer">
        {showLoading ? (
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
        ) : (
          <></>
        )}
        <div className={`menu ${isMenuOpen ? "showMenu" : ""}`}>
          <div className="menuItems" onClick={takeScreenshot}>
            Take Screenshot
          </div>
          <hr />
          <div className="menuItems" onClick={saveVideo}>
            Save Video
          </div>
          <hr />
          <div className="menuItems" onClick={openRepo}>
            Source
          </div>
        </div>
        <div ref={appRef}>
          <div className="statusBar">
            <img src={clock} alt="clock" />
            <img id="phoneStatus" src={phoneStatus} alt="phone status" />
          </div>
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
              <img
                className="appBarIcons"
                src={videoIcon}
                alt="video"
                onClick={replayChat}
              />
              <img className="appBarIcons" src={callIcon} alt="call" />
              <img
                className={`appBarIcons ${isMenuOpen ? "open" : "close"}`}
                src={menuIcon}
                alt="video"
                onClick={menuClick}
              />
            </div>
          </div>

          <div className="chatScreen">
            <div className="chatMessages">
              {messageList.map((message) => {
                if (message.self === true) {
                  return (
                    <ChatMessage
                      text={message.text}
                      key={message.msgId}
                      msgId={message.msgId}
                    />
                  );
                } else {
                  return (
                    <ChatMessage
                      text={message.text}
                      left
                      key={message.msgId}
                      msgId={message.msgId}
                    />
                  );
                }
              })}
            </div>

            <div className="chatBar">
              <div className="chatInput">
                <img className="emojiIcon" src={emojiIcon} alt="emoji" />
                <textarea
                  className="chatBox"
                  value={chatInput}
                  onChange={chatInputChange}
                />
              </div>
              <div className="sendBtn" onClick={sendMessage}>
                <img className="sendIcon" src={sendIcon} alt="send" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
