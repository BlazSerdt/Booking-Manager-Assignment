import { AppLayout } from "../../../components/layouts/app-layout.tsx";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { useAuth } from "../../../components/auth/auth.tsx";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import ChatHeader from "../../../components/ui/chat/ChatHeader.tsx";
import { useState } from "react";
import type { ChatUser } from "../../../types";
import UserList from "../../../components/ui/chat/UserList.tsx";
import ChatMessage from "../../../components/ui/chat/ChatMessage.tsx";
import UserChatMessage from "../../../components/ui/chat/UserChatMessage.tsx";

const Chat = () => {
  const { user } = useAuth();

  const users: ChatUser[] = [
    { name: "John Smith", status: "online" },
    { name: "Craig Jones", status: "away" },
    { name: "Katie Shaw", status: "offline" },
    { name: "Michael Johnson", status: "online" },
    { name: "Emily Brown", status: "offline" },
    { name: "Robert Green", status: "away" },
    { name: "Sophia Lee", status: "online" },
    { name: "Daniel White", status: "offline" },
    { name: "Laura Black", status: "away" },
    { name: "James Miller", status: "online" },
    { name: "Olivia Taylor", status: "offline" },
  ];

  const [selectedUser, setSelectedUser] = useState<ChatUser>(users[0]);

  return (
    <AppLayout>
      <div className="grid grid-cols-5 gap-6 h-[85vh]">
        <Card className="col-span-1 flex flex-col p-2">
          <div className="flex flex-col items-center gap-4 mb-4">
            <Avatar icon="pi pi-user" size="xlarge" shape="circle" className="shadow-lg" />
            <p className="font-semibold text-xl">{user?.displayName ?? "User"}</p>
          </div>

          <Divider />

          <IconField iconPosition="left" className="mb-4">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText placeholder="Search" />
          </IconField>

          <UserList
            users={users}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
          />
        </Card>

        <Card className="col-span-4 flex flex-col px-2">
          <ChatHeader name={selectedUser.name} status={selectedUser.status} />

          <Divider />

          <div className="flex flex-col px-2 pt-2 gap-4">
            <ChatMessage userName={selectedUser.name} text="Hello this is a message" time="12:30" />
            <ChatMessage userName={selectedUser.name} text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." time="12:32" />
            <UserChatMessage text="This is a message from the user" time="12:40" />
            <UserChatMessage text="This is a second message from the user. Lorem ipsum dolor sit amet, consectetur adipiscing elit." time="12:40" />
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Chat;
