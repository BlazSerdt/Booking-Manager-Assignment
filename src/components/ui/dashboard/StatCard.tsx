import { Card } from "primereact/card";
import type { StatCardProps } from "../../../types";

export const StatCard = ({title, value, icon, iconColor, iconBg}: StatCardProps) => {
  return (
    <Card title={title} className="w-full">
      <div className="flex items-center justify-between px-4">
        <span className="text-3xl font-bold text-black">{value}</span>
        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${iconBg}`}>
          <i className={`${icon} ${iconColor} text-xl`} />
        </div>
      </div>
    </Card>
  );
};