import { Avatar } from "primereact/avatar";
import type { InitialsAvatarProps } from "../../../types";

const InitialsAvatar = ({ name, size, status, className = "bottom-0 right-0 w-3 h-3" }: InitialsAvatarProps) => {
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
    <div className="relative">
      <Avatar
        label={getInitials(name)}
        size={size}
        shape="circle"
      />
      {status && (
        <span
          className={`absolute ${className} rounded-full border-2 border-white ${getStatusColor()}`}
        />
      )}
    </div>
  );
};

export default InitialsAvatar;
