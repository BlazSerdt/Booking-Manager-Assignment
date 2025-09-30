import { Image } from 'primereact/image';
import type { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export const AuthLayout = ({ title, description, children }: AuthLayoutProps) => {
  return (
    <div
      className="flex min-h-screen items-center justify-center w-full"
      style={{ backgroundColor: "var(--surface-50)" }}
    >
      <div className="flex flex-col rounded-4xl shadow-md px-14 py-12 bg-white gap-7 w-full max-w-md">
        <div className="flex flex-col items-center justify-center w-full gap-7">
          <div className="rounded-full overflow-hidden">
            <Image src="favicon.png" alt="BookingManager logo" width="75" />
          </div>
          <div className="flex flex-col justify-center w-full gap-1.5 text-center">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm">{description}</p>
          </div>
        </div>

        <div className="flex flex-col w-full gap-5">
          {children}
        </div>
      </div>
    </div>
  );
}