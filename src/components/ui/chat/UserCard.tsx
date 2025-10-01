import { Avatar } from "primereact/avatar";
import type { ChatUserCardProps } from "../../../types";

const ChatUserCard = ({ name, status }: ChatUserCardProps) => {
  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(" ");
    if (parts.length === 1)
      return parts[0][0].toUpperCase();
    return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
  };

  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-gray-400";
      case "away":
        return "bg-yellow-400";
    }
  };

  return (
    <div className="flex items-center rounded-md px-4 py-2 justify-between hover:bg-gray-100 cursor-pointer">
      <div className="flex gap-3 items-center">
        <div className="relative">
          <Avatar
            label={getInitials(name)}
            size="large"
            shape="circle"
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor()}`}
          />
        </div>
        <p className="font-semibold">{name}</p>
      </div>
    </div>
  );
};

export default ChatUserCard;
