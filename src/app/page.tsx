"use client";

import EmptyState from "@/components/EmptyState";
import ShadowButton from "@/components/ShadowButton";
import TodoInput from "@/components/TodoInput";
import TodoItem from "@/components/TodoItem";
import { getTodoList, patchTodoItem, postTodoItem } from "@/lib/api";
import { TENANT_ID } from "@/lib/constants";
import {
  getTodoListResponse,
  patchTodoItemRequest,
  postTodoItemResponse,
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
        const items = await getTodoList(TENANT_ID);
        const todosFromServer: Todo[] = items.map(
          (item: getTodoListResponse) => ({
            id: item.id,
            text: item.name,
            state: item.isCompleted ? "Active" : "Default",
          }),
        );
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
      const newItem: postTodoItemResponse = await postTodoItem(TENANT_ID, {
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

    const updated: patchTodoItemRequest = {
      name: target.text,
      memo: "",
      imageUrl: "",
      isCompleted: target.state === "Default",
    };

    try {
      await patchTodoItem(TENANT_ID, String(id), updated);

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
        <>
          {/* 모바일 전용 버튼 */}
          <ShadowButton
            type="Add"
            size="Small"
            state={todos.length === 0 ? "Active" : "Default"}
            onClick={handleAddTodo}
            className="block md:hidden"
          />
          {/* 태블릿/데스크탑 전용 이미지 */}
          <ShadowButton
            type="Add"
            size="Large"
            state={todos.length === 0 ? "Active" : "Default"}
            onClick={handleAddTodo}
            className="hidden md:block"
          />
        </>
      </div>

      {/* 리스트 영역 */}
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-6">
        {/* TODO 리스트 */}
        <div className="flex-1 gap-4">
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
              <>
                {/* 모바일 전용 이미지 */}
                <EmptyState
                  imgSrc="/images/illustrations/todo-empty-small.svg"
                  alt="empty todo"
                  message={`할 일이 없어요.\nTODO를 새롭게 추가해주세요!`}
                  size={120}
                  className="block md:hidden"
                />
                {/* 태블릿/데스크탑 전용 이미지 */}
                <EmptyState
                  imgSrc="/images/illustrations/todo-empty-large.svg"
                  alt="empty todo"
                  message={`할 일이 없어요.\nTODO를 새롭게 추가해주세요!`}
                  size={240}
                  className="hidden md:block"
                />
              </>
            )}
          </div>
        </div>
        {/* DONE 리스트 */}
        <div className="flex-1 gap-4">
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
              <>
                {/* 모바일 전용 이미지 */}
                <EmptyState
                  imgSrc="/images/illustrations/done-empty-small.svg"
                  alt="empty done"
                  message={`아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!`}
                  size={120}
                  className="block md:hidden"
                />
                {/* 태블릿/데스크탑 전용 이미지 */}
                <EmptyState
                  imgSrc="/images/illustrations/done-empty-large.svg"
                  alt="empty done"
                  message={`아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!`}
                  size={240}
                  className="hidden md:block"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
