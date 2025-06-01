import { BASE_URL } from "@/lib/constants";
import { getTodoResponse, postTodoResponse } from "@/lib/type";

// 항목 등록 (POST)
export const postTodo = async (
  tenantId: string,
  name: string,
): Promise<postTodoResponse> => {
  const res = await fetch(`${BASE_URL}/${tenantId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
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
