"use client";

import { TodoAddSection, TodoListSection } from "@/components/home";
import { useTodos } from "@/hooks/useTodos";
import { Todo } from "@/lib/type";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const { todos, addTodo, toggleTodo } = useTodos();

  const goToDetail = (todo: Todo) => {
    const query = new URLSearchParams({
      text: todo.text,
      state: todo.state,
    }).toString();

    router.push(`/items/${todo.id}?${query}`);
  };

  return (
    <div className="w-full space-y-10 py-6">
      {/* 입력 영역 */}
      <TodoAddSection
        inputValue={inputValue}
        onInputChange={setInputValue}
        onAddTodo={() => {
          addTodo(inputValue);
          setInputValue("");
        }}
        hasTodos={todos.length > 0}
      />

      {/* 리스트 영역 */}
      <TodoListSection
        todos={todos}
        onToggle={toggleTodo}
        onClickItem={goToDetail}
      />
    </div>
  );
}
