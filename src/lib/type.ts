// POST /{tenantId}/items API 응답 타입
export interface postTodoResponse {
  id: 0;
  tenantId: "string";
  name: "string";
  memo: "string" | null;
  imageUrl: "string" | null;
  isCompleted: false;
}

// GET /{tenantId}/items API 응답 타입
export interface getTodoResponse {
  id: number;
  name: string;
  isCompleted: boolean;
}
