import type { ChatUserCardProps } from "../../../types";
import InitialsAvatar from "./InitialsAvatar.tsx";

const ChatUserCard = ({ name, status, onClick, selected }: ChatUserCardProps) => {
  return (
    <div
      className={`flex items-center rounded-md px-4 py-2 justify-between cursor-pointer hover:bg-blue-50 ${selected ? "bg-blue-50" : ""}`}
      onClick={onClick}
    >
      <div className="flex gap-3 items-center">
        <InitialsAvatar name={name} size="large" status={status} />
        <p className="font-semibold">{name}</p>
      </div>
    </div>
  );
};

export default ChatUserCard;