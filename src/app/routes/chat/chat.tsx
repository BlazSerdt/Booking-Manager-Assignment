import { AppLayout } from "../../../components/layouts/app-layout.tsx";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { useAuth } from "../../../components/auth/auth.tsx";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import ChatHeader from "../../../components/ui/chat/ChatHeader.tsx";
import { useEffect, useState } from "react";
import type { ChatUser, Message } from "../../../types";
import UserList from "../../../components/ui/chat/UserList.tsx";
import { Button } from "primereact/button";
import MessagesContainer from "../../../components/ui/chat/MessagesContainer.tsx";

const Chat = () => {
  const { user } = useAuth();

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

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
  const [searchInput, setSearchInput] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    setMessages([]);
  }, [selectedUser]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setMessages([
      ...messages,
      { text: inputValue, time },
    ]);

    setInputValue("");
  };

  return (
    <AppLayout>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <Card className="col-span-5 xl:col-span-1 flex flex-col p-2 bg-transparent">
          <div className="flex flex-col items-center gap-4 mb-4">
            <Avatar icon="pi pi-user" size="xlarge" shape="circle" className="shadow-lg" />
            <p className="font-semibold text-xl">{user?.displayName ?? "User"}</p>
          </div>

          <Divider />

          <IconField iconPosition="left" className="mb-4">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          </IconField>

          <UserList
            users={filteredUsers}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
          />
        </Card>

        <Card className="col-span-5 xl:col-span-4 flex flex-col px-2 bg-transparent">
          <ChatHeader name={selectedUser.name} status={selectedUser.status} />

          <Divider />

          <MessagesContainer selectedUser={selectedUser} messages={messages} />

          <Divider />

          <div className="flex items-center gap-4 pt-4">
            <InputText
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div>
              <Button label="Send" icon="pi pi-send" onClick={handleSend} />
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Chat;
