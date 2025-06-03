"use client";

import { TodoAddSection, TodoListSection } from "@/components/home";
import { useTodos } from "@/hooks/useTodos";
import { Todo } from "@/lib/type";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  // 커스텀 훅으로 상태 및 로직 관리
  const { todos, addTodo, toggleTodo } = useTodos();

  // 상세 페이지 이동 함수
  const goToDetail = (todo: Todo) => {
    const query = new URLSearchParams({
      text: todo.text,
      state: todo.state,
    }).toString();

    router.push(`/items/${todo.id}?${query}`);
  };

  return (
    <div className="w-full space-y-10 py-6">
      {/* 입력 영역: 할 일 추가 */}
      <TodoAddSection
        inputValue={inputValue}
        onInputChange={setInputValue}
        onAddTodo={() => {
          addTodo(inputValue);
          setInputValue("");
        }}
        hasTodos={todos.length > 0}
      />

      {/* 리스트 영역: 할 일 목록 + 상태 토글 + 상세 페이지 이동 */}
      <TodoListSection
        todos={todos}
        onToggle={toggleTodo}
        onClickItem={goToDetail}
      />
    </div>
  );
}
