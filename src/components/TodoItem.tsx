import Image from "next/image";

type TodoItemState = "Default" | "Active";

interface TodoItemProps {
  text: string;
  state: TodoItemState;
  onToggle: () => void;
  onClick: () => void;
}

export default function TodoItem({
  text,
  state,
  onToggle,
  onClick,
}: TodoItemProps) {
  const STYLE_MAP: Record<
    TodoItemState,
    {
      icon: string;
      bgColor: string;
      textStyle: string;
    }
  > = {
    Default: {
      icon: "/images/icons/checkbox-todo.svg",
      bgColor: "bg-white",
      textStyle: "",
    },
    Active: {
      icon: "/images/icons/checkbox-done.svg",
      bgColor: "bg-violet-100",
      textStyle: "line-through",
    },
  };

  const { icon, bgColor, textStyle } = STYLE_MAP[state];

  return (
    <div
      onClick={onClick}
      className={`flex h-[50px] w-full items-center gap-4 rounded-full border-2 border-slate-900 px-3 ${bgColor}`}
    >
      <button onClick={onToggle}>
        <Image src={icon} alt="checkbox" width={32} height={32} />
      </button>
      <span
        className={`text-base font-normal leading-none text-slate-900 ${textStyle}`}
      >
        {text}
      </span>
    </div>
  );
}
