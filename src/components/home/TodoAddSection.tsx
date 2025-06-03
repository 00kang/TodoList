import { ShadowButton } from "@/components/common";
import TodoInput from "@/components/home/TodoInput";

interface TodoAddSectionProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onAddTodo: () => void;
  hasTodos: boolean;
}

export default function TodoAddSection({
  inputValue,
  onInputChange,
  onAddTodo,
  hasTodos,
}: TodoAddSectionProps) {
  return (
    <div className="flex w-full gap-4">
      {/* 입력 필드 */}
      <div className="flex-1">
        <TodoInput
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onEnter={onAddTodo}
        />
      </div>
      <>
        {/* 모바일 전용 버튼 */}
        <ShadowButton
          type="Add"
          size="Small"
          state={hasTodos ? "Default" : "Active"}
          onClick={onAddTodo}
          className="block md:hidden"
        />
        {/* 태블릿/데스크탑 전용 이미지 */}
        <ShadowButton
          type="Add"
          size="Large"
          state={hasTodos ? "Default" : "Active"}
          onClick={onAddTodo}
          className="hidden md:block"
        />
      </>
    </div>
  );
}
