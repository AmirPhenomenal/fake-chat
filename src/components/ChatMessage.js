import React, { useContext } from "react";
import { AppContext } from "../App";
import "./index.css";
const ChatMessage = ({ left, text, msgId }) => {
  const { messageList, setMessageList } = useContext(AppContext);
  const messageClick = (event) => {
    if (event.detail === 2) {
      let tmpMessageList = messageList.map((message) => {
        if (message.msgId === msgId) {
          message.self = !message.self;
        }
        return message;
      });
      setMessageList(tmpMessageList);
    }
  };
  return (
    <div onClick={messageClick} className={`message ${left ? "ml" : "mr"}`}>
      {text}
    </div>
  );
};

export default ChatMessage;
