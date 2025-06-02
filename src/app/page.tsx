"use client";

import EmptyState from "@/components/EmptyState";
import ShadowButton from "@/components/ShadowButton";
import TodoInput from "@/components/TodoInput";
import TodoItem from "@/components/TodoItem";
import { getTodos, patchTodo, postTodo } from "@/lib/api";
import { TENANT_ID } from "@/lib/constants";
import {
  getTodoResponse,
  patchTodoRequest,
  postTodoResponse,
} from "@/lib/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  text: string;
  state: "Default" | "Active";
}

export default function HomePage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const goToDetail = (todo: Todo) => {
    const query = new URLSearchParams({
      text: todo.text,
      state: todo.state,
    }).toString();

    router.push(`/items/${todo.id}?${query}`);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const items = await getTodos(TENANT_ID);
        const todosFromServer: Todo[] = items.map((item: getTodoResponse) => ({
          id: item.id,
          text: item.name,
          state: item.isCompleted ? "Active" : "Default",
        }));
        setTodos(todosFromServer);
      } catch (e) {
        console.error("할 일 목록 불러오기 실패", e);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    const trimmed = inputValue.trim();
    if (trimmed === "") return;

    try {
      const newItem: postTodoResponse = await postTodo(TENANT_ID, {
        name: trimmed,
      });
      const newTodo: Todo = {
        id: newItem.id,
        text: newItem.name,
        state: "Default",
      };
      setTodos((prev) => [...prev, newTodo]);
      setInputValue("");
    } catch (e) {
      console.error("할 일 추가 실패", e);
    }
  };

  const toggleTodoState = async (id: number) => {
    const target = todos.find((todo) => todo.id === id);
    if (!target) return;

    const updated: patchTodoRequest = {
      name: target.text,
      memo: "",
      imageUrl: "",
      isCompleted: target.state === "Default",
    };

    try {
      await patchTodo(TENANT_ID, String(id), updated);

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                state: todo.state === "Default" ? "Active" : "Default",
              }
            : todo,
        ),
      );
    } catch (e) {
      console.error("할 일 상태 변경 실패", e);
    }
  };

  const todoList = todos.filter((todo) => todo.state === "Default");
  const doneList = todos.filter((todo) => todo.state === "Active");

  return (
    <div className="w-full space-y-10 py-6">
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
                  onClick={() => goToDetail(todo)}
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
                  onClick={() => goToDetail(todo)}
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
