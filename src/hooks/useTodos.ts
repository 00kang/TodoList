/**
 * useTodos
 *
 * - 전체 Todo 리스트를 관리하는 커스텀 훅
 * - 초기 데이터 로딩, 할 일 추가, 상태 토글 등 주요 동작 처리
 */

"use client";

import { getTodoList, patchTodoItem, postTodoItem } from "@/lib/api";
import { TENANT_ID } from "@/lib/constants";
import { getTodoListResponse, patchTodoItemRequest, Todo } from "@/lib/type";
import { useEffect, useState } from "react";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 컴포넌트 최초 렌더링 시, 서버로부터 Todo 리스트를 불러옴
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

  // 새로운 Todo 항목 추가
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

  // 특정 Todo 항목의 상태(Default <-> Active) 토글
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
