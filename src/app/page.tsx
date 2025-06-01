"use client";

import EmptyState from "@/components/EmptyState";
import ShadowButton from "@/components/ShadowButton";
import TodoInput from "@/components/TodoInput";
import TodoItem from "@/components/TodoItem";
import Image from "next/image";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  state: "Default" | "Active";
}

export default function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = () => {
    const trimmed = inputValue.trim();
    if (trimmed === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: trimmed,
      state: "Default",
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputValue("");
  };

  const toggleTodoState = (id: number) => {
    setTodos((prev) => {
      const updatedTodos = prev.map((todo) => {
        if (todo.id === id) {
          const nextState: "Default" | "Active" =
            todo.state === "Default" ? "Active" : "Default";
          return { ...todo, state: nextState };
        }
        return todo;
      });

      return updatedTodos;
    });
  };

  const todoList = todos.filter((todo) => todo.state === "Default");
  const doneList = todos.filter((todo) => todo.state === "Active");

  return (
    <div className="w-full space-y-10">
      {/* 입력 영역 */}
      <div className="flex w-full gap-4">
        <div className="flex-1">
          <TodoInput
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            onEnter={handleAddTodo}
          />
        </div>
        <ShadowButton
          type="Add"
          size="Large"
          state="Default"
          onClick={handleAddTodo}
        />
      </div>

      {/* 리스트 영역 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="gap-4">
          <Image
            src="/images/illustrations/todo.svg"
            alt="todo"
            width={100}
            height={36}
          />
          <div className="mt-4 space-y-4">
            {todoList.length > 0 ? (
              todoList.map((todo) => (
                <TodoItem
                  key={todo.id}
                  text={todo.text}
                  state="Default"
                  onToggle={() => toggleTodoState(todo.id)}
                />
              ))
            ) : (
              <EmptyState
                imgSrc="/images/illustrations/todo-empty-large.svg"
                alt="empty todo"
                message={`할 일이 없어요.\nTODO를 새롭게 추가해주세요!`}
                size={240}
              />
            )}
          </div>
        </div>
        <div className="gap-4">
          <Image
            src="/images/illustrations/done.svg"
            alt="done"
            width={100}
            height={36}
          />
          <div className="mt-4 space-y-4">
            {doneList.length > 0 ? (
              doneList.map((todo) => (
                <TodoItem
                  key={todo.id}
                  text={todo.text}
                  state="Active"
                  onToggle={() => toggleTodoState(todo.id)}
                />
              ))
            ) : (
              <EmptyState
                imgSrc="/images/illustrations/done-empty-large.svg"
                alt="empty done"
                message={`아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!`}
                size={240}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
