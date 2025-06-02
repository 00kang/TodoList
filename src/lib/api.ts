import { BASE_URL } from "@/lib/constants";
import {
  getTodoItemResponse,
  getTodoResponse,
  patchTodoRequest,
  patchTodoResponse,
  postImageResponse,
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

// 항목 상세 조회 (GET)
export const getTodoItem = async (
  tenantId: string,
  itemId: number,
): Promise<getTodoItemResponse> => {
  const res = await fetch(`${BASE_URL}/${tenantId}/items/${itemId}`);

  if (!res.ok) throw new Error("Failed to fetch todo detail");
  return res.json();
};

// 항목 수정 (PATCH)
export const patchTodo = async (
  tenantId: string,
  itemId: string,
  payload: patchTodoRequest,
): Promise<patchTodoResponse> => {
  const res = await fetch(`${BASE_URL}/${tenantId}/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update todos");
  return res.json();
};

// 이미지 업로드 (POST)
export const postImage = async (
  tenantId: string,
  file: File,
): Promise<postImageResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/${tenantId}/images/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload image");
  return res.json();
};
