import { ChangeEvent } from "react";

interface TodoInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
}

export default function TodoInput({
  value,
  onChange,
  onEnter,
}: TodoInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) {
      onEnter();
    }
  };

  return (
    <div className="relative w-full">
      {/* 그림자 레이어 */}
      <div className="absolute left-1 top-1 z-0 h-[56px] w-full rounded-full bg-slate-900" />

      {/* 본 입력창 */}
      <input
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력해주세요"
        className="relative z-10 h-[56px] w-full rounded-full border-2 border-slate-900 bg-slate-100 px-6 text-base font-normal leading-none text-slate-900 outline-none placeholder:text-base placeholder:leading-none placeholder:text-slate-500"
      />
    </div>
  );
}
