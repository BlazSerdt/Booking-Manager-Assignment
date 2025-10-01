import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import UserChatMessage from "./UserChatMessage";
import type { MessagesContainerProps } from "../../../types";

const MessagesContainer = ({ selectedUser, messages }: MessagesContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col overflow-y-auto px-2 pt-2 gap-4 h-[60vh]">
      <ChatMessage userName={selectedUser.name} text="Hello this is a message" time="12:30" />
      <ChatMessage
        userName={selectedUser.name}
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        time="12:32"
      />

      {messages.map((msg, index) =>
        <UserChatMessage key={index} text={msg.text} time={msg.time} />
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesContainer;
