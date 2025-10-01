import { AppLayout } from "../../../components/layouts/app-layout.tsx";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { useAuth } from "../../../components/auth/auth.tsx";
import UserCard from "../../../components/ui/chat/UserCard.tsx";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";

const Chat = () => {
  const { user } = useAuth();

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

          <div className="flex flex-col gap-2 overflow-y-auto max-h-[58vh]">
            <UserCard name="John Smith" status="online" />
            <UserCard name="Craig Jones" status="away" />
            <UserCard name="Katie Shaw" status="offline" />
            <UserCard name="Michael Johnson" status="online" />
            <UserCard name="Emily Brown" status="offline" />
            <UserCard name="Robert Green" status="away" />
            <UserCard name="Sophia Lee" status="online" />
            <UserCard name="Daniel White" status="offline" />
            <UserCard name="Laura Black" status="away" />
            <UserCard name="James Miller" status="online" />
            <UserCard name="Olivia Taylor" status="offline" />
          </div>
        </Card>

        <Card className="col-span-4 flex">

        </Card>
      </div>
    </AppLayout>
  );
};

export default Chat;
