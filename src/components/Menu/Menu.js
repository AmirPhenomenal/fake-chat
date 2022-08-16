import React, { useContext } from "react";
import { AppContext } from "../../App";
import { toCanvas, toJpeg } from "html-to-image";
import delay from "delay";
import "./index.css";
const Menu = () => {
  const {
    isMenuOpen,
    messageList,
    setShowLoading,
    setLoadPercent,
    appRef,
    setMessageList,
    playBip,
    setIsMenuOpen,
  } = useContext(AppContext);
  const recordVideo = async (recordElement) => {
    let canvas = await toCanvas(recordElement);
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
  const openRepo = () => {
    setIsMenuOpen(false);
    window
      .open(
        "http://github.com/AmirPhenomenal/fake-chat",
        "_blank",
        "noopener,noreferrer"
      )
      .focus();
  };
  const replayChat = async () => {
    setIsMenuOpen(false);
    let tmpMessageList = [...messageList];
    setMessageList([]);
    for (let i = 0; i < tmpMessageList.length; i++) {
      await delay(2000);
      console.log("added message ", i, "  ", tmpMessageList[i]);
      setMessageList((p) => [...p, tmpMessageList[i]]);
      playBip();
    }
  };
  const takeScreenshot = async () => {
    setIsMenuOpen(false);
    const image = await toJpeg(appRef.current);
    const link = document.createElement("a");
    link.download = `fake-chat${Date.now()}.png`;
    link.href = image;
    link.click();
  };
  const saveVideo = async () => {
    setIsMenuOpen(false);
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

    await recordVideo(appRef.current);
    setShowLoading(false);
    setLoadPercent(0);
  };

  return (
    <div className={`menu ${isMenuOpen ? "showMenu" : ""}`}>
      <div className="menuItems" onClick={takeScreenshot}>
        Take Screenshot
      </div>
      <hr />
      <div className="menuItems" onClick={saveVideo}>
        Save Video
      </div>
      <hr />
      <div className="menuItems" onClick={replayChat}>
        Replay Chat
      </div>
      <hr />
      <div className="menuItems" onClick={openRepo}>
        Source
      </div>
    </div>
  );
};

export default Menu;
