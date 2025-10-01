import type { UserChatMessageProps } from "../../../types";

const UserChatMessage = ({ text, time }: UserChatMessageProps) => {
  return (
    <div className="items-end flex flex-col">
      <div className="flex text-black text-sm text-justify">
        <p className="border border-gray-300 py-3 px-5 rounded-lg bg-blue-200">{text}</p>
      </div>
      <div className="mt-2">
        <p>{time}</p>
      </div>
    </div>
  );
};

export default UserChatMessage;