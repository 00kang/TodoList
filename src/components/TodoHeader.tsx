"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type TodoHeaderState = "Default" | "Active";

interface TodoHeaderProps {
  text: string;
  state: TodoHeaderState;
  onToggle: () => void;
  onTextChange: (newText: string) => void;
}

export default function TodoHeader({
  text,
  state,
  onToggle = () => {},
  onTextChange,
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

  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputWidth, setInputWidth] = useState(0);

  useEffect(() => {
    if (spanRef.current) {
      const width = spanRef.current.offsetWidth;
      setInputWidth(width + 8);
    }
  }, [text]);

  return (
    <div
      className={`flex h-[64px] w-full items-center justify-center gap-4 rounded-3xl border-2 border-slate-900 px-3 ${bgColor}`}
    >
      <button onClick={onToggle} className="flex items-center justify-center">
        <Image src={icon} alt="checkbox" width={32} height={32} />
      </button>

      <div className="relative">
        <input
          ref={inputRef}
          className="bg-transparent text-base font-bold leading-none text-slate-900 underline focus:outline-none"
          style={{ width: `${inputWidth}px` }}
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
        />
        <span
          ref={spanRef}
          className="invisible absolute left-0 top-0 whitespace-pre text-base font-bold"
        >
          {text || "제목 없음"}
        </span>
      </div>
    </div>
  );
}
