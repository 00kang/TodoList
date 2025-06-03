import PlusIcon from "@/components/common/PlusIcon";
import Image from "next/image";

type FlatButtonType = "Plus" | "Edit";

interface FlatButtonProps {
  type: FlatButtonType;
  onClick?: () => void;
}

export default function FlatButton({ type, onClick }: FlatButtonProps) {
  const isPlus = type === "Plus";

  const icon = isPlus ? (
    <PlusIcon className="h-6 w-6 text-slate-500" />
  ) : (
    <Image src="/images/icons/edit.svg" alt="edit" width={24} height={24} />
  );
  const bgColor = isPlus ? "bg-slate-200" : "bg-slate-900/50";
  const borderClass = isPlus ? "" : "border-2 border-slate-900";

  return (
    <button
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className={`box-border flex h-[64px] w-[64px] items-center justify-center rounded-full ${bgColor} ${borderClass}`}
    >
      {icon}
    </button>
  );
}
