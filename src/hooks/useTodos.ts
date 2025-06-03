"use client";

import { getTodoList, patchTodoItem, postTodoItem } from "@/lib/api";
import { TENANT_ID } from "@/lib/constants";
import { getTodoListResponse, patchTodoItemRequest, Todo } from "@/lib/type";
import { useEffect, useState } from "react";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const items = await getTodoList(TENANT_ID);
        setTodos(
          items.map((item: getTodoListResponse) => ({
            id: item.id,
            text: item.name,
            state: item.isCompleted ? "Active" : "Default",
          })),
        );
      } catch (e) {
        console.error("할 일 목록 불러오기 실패", e);
      }
    })();
  }, []);

  const addTodo = async (text: string) => {
    const trimmed = text.trim();
    if (trimmed === "") return;

    try {
      const res = await postTodoItem(TENANT_ID, { name: trimmed });
      setTodos((prev) => [
        ...prev,
        { id: res.id, text: res.name, state: "Default" },
      ]);
    } catch (e) {
      console.error("할 일 추가 실패", e);
    }
  };

  const toggleTodo = async (id: number) => {
    const target = todos.find((todo) => todo.id === id);
    if (!target) return;

    const updated: patchTodoItemRequest = {
      name: target.text,
      isCompleted: target.state === "Default",
      memo: "",
      imageUrl: "",
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

  return { todos, addTodo, toggleTodo };
}
