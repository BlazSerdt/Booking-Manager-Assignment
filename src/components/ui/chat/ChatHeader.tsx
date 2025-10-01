import { Button } from "primereact/button";
import type { ChatUserProps } from "../../../types";
import InitialsAvatar from "./InitialsAvatar.tsx";

const ChatHeader = ({ name, status }: ChatUserProps) => {
  return (
    <div className="flex justify-between items-center px-2 pb-2">
      <div className="flex gap-4">
        <InitialsAvatar name={name} size="xlarge" status={status} className="bottom-1 right-0 w-3.5 h-3.5" />
        <div className="flex flex-col justify-center">
          <p className="font-semibold text-lg">{name}</p>
          <p className="text-sm capitalize">{status === "online" ? "Active now" : status}</p>
        </div>
      </div>
      <Button icon="pi pi-ellipsis-v" rounded outlined />
    </div>
  );
};

export default ChatHeader;
