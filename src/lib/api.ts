import { BASE_URL } from "@/lib/constants";
import { postTodoResponse } from "@/lib/type";

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
