interface MenuButtonProps {
  icon: string;
  label?: string;
  onClick?: () => void;
}

export const MenuButton = ({ icon, label, onClick }: MenuButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-[#edf0fa] w-full"
    >
      <i className={icon} style={{ fontSize: '1rem', color: "#898989" }} />
      <span>{label}</span>
    </button>
  );
}