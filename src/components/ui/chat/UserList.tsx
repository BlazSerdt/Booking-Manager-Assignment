import UserCard from "./UserCard";
import type { UserListProps } from "../../../types";

const UserList = ({ users, selectedUser, onSelectUser }: UserListProps) => {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto max-h-[58vh]">
      {users.map((user) => (
        <UserCard
          key={user.name}
          name={user.name}
          status={user.status}
          onClick={() => onSelectUser(user)}
          selected={selectedUser?.name === user.name}
        />
      ))}
    </div>
  );
};

export default UserList;
