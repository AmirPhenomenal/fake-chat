import React, { useContext, useState } from "react";
import "./index.css";
import ChatMessage from "../ChatMessage/ChatMessage";
import sendIcon from "../../icons/paper-plane.png";
import emojiIcon from "../../icons/face-smile.png";
import { v4 as uuid } from "uuid";
import { AppContext } from "../../App";
const ChatScreen = () => {
  //States
  const [chatInput, setChatInput] = useState("");

  const { messageList, setMessageList, playBip } = useContext(AppContext);

  const chatInputChange = (event) => {
    setChatInput(event.target.value);
  };
  const sendMessage = () => {
    let tmpMessageList = [...messageList];
    tmpMessageList.push({ msgId: uuid(), text: chatInput, self: true });
    setChatInput("");
    setMessageList(tmpMessageList);
    playBip();
  };
  return (
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
  );
};

export default ChatScreen;
