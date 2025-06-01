import { BASE_URL } from "@/lib/constants";
import {
  getTodoResponse,
  patchTodoRequest,
  postTodoRequest,
  postTodoResponse,
} from "@/lib/type";

// 항목 등록 (POST)
export const postTodo = async (
  tenantId: string,
  data: postTodoRequest,
): Promise<postTodoResponse> => {
  const res = await fetch(`${BASE_URL}/${tenantId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create todo");

  return res.json();
};

// 항목 목록 조회 (GET)
export const getTodos = async (
  tenantId: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<getTodoResponse[]> => {
  const res = await fetch(
    `${BASE_URL}/${tenantId}/items?page=${page}&pageSize=${pageSize}`,
  );

  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

// 항목 수정 (PATCH)
export const patchTodo = async (
  tenantId: string,
  itemId: string,
  payload: patchTodoRequest,
) => {
  const res = await fetch(`${BASE_URL}/${tenantId}/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update todos");
  return res.json();
};
