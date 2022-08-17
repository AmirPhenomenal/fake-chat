import React, { useContext } from "react";
import { AppContext } from "../../App";
import "./index.css";
const ChatMessage = ({ left, text, msgId, componentRef }) => {
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
  const refProp =
    componentRef && componentRef !== "" ? { ref: componentRef } : {};
  return (
    <div
      onClick={messageClick}
      className={`message ${left && left === true ? "ml" : "mr"}`}
      {...refProp}
    >
      {text}
    </div>
  );
};

export default ChatMessage;
