import Image from "next/image";

type TodoHeaderState = "Default" | "Active";

interface TodoHeaderProps {
  text: string;
  state: TodoHeaderState;
  onToggle: () => void;
}

export default function TodoHeader({
  text,
  state,
  onToggle = () => {},
}: TodoHeaderProps) {
  const STYLE_MAP: Record<
    TodoHeaderState,
    {
      icon: string;
      bgColor: string;
    }
  > = {
    Default: {
      icon: "/images/icons/checkbox-todo.svg",
      bgColor: "bg-white",
    },
    Active: {
      icon: "/images/icons/checkbox-done.svg",
      bgColor: "bg-violet-100",
    },
  };

  const { icon, bgColor } = STYLE_MAP[state];

  return (
    <div
      className={`flex h-[64px] w-full items-center gap-4 rounded-3xl border-2 border-slate-900 px-3 ${bgColor}`}
    >
      <button onClick={onToggle} className="flex items-center justify-center">
        <Image src={icon} alt="checkbox" width={32} height={32} />
      </button>
      <span className="text-base font-bold leading-none text-slate-900">
        {text}
      </span>
    </div>
  );
}
