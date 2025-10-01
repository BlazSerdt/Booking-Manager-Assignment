import type { ChatMessageProps } from "../../../types";
import InitialsAvatar from "./InitialsAvatar.tsx";

const ChatMessage = ({ userName, text, time }: ChatMessageProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3">
        <InitialsAvatar name={userName} size="large"/>
        <div>
          <p className="font-semibold">{userName}</p>
        </div>
      </div>
      <div className="flex ml-[60px] text-black text-sm text-justify">
        <p className="border border-gray-300 py-3 px-5 rounded-lg">{text}</p>
      </div>
      <div className="ml-[60px] mt-2">
        <p>{time}</p>
      </div>
    </div>
  );
};

export default ChatMessage;