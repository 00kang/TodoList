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
  // 상태별 스타일 매핑
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
      className={`flex h-[50px] w-full items-center gap-4 rounded-full border-2 border-slate-900 px-3 ${bgColor}`}
    >
      {/* 완료 여부 토글 */}
      <button onClick={onToggle}>
        <Image src={icon} alt="checkbox" width={32} height={32} />
      </button>

      {/* 텍스트 클릭 시 상세 페이지 이동 */}
      <span
        onClick={onClick}
        className={`flex-1 text-base font-normal leading-none text-slate-900 ${textStyle}`}
      >
        {text}
      </span>
    </div>
  );
}
