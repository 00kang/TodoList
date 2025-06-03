// ToDo
export interface Todo {
  id: number;
  text: string;
  state: "Default" | "Active";
}

// POST /{tenantId}/items API 요청 바디 타입
export interface postTodoItemRequest {
  name: string;
}

// POST /{tenantId}/items API 응답 타입
export interface postTodoItemResponse {
  id: number;
  tenantId: string;
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
}

// GET /{tenantId}/items API 응답 타입
export interface getTodoListResponse {
  id: number;
  name: string;
  isCompleted: boolean;
}

// GET /{tenantId}/items/{itemId} API 응답 타입
export interface getTodoItemResponse {
  isCompleted: boolean;
  imageUrl: string;
  memo: string;
  name: string;
  tenantId: string;
  id: number;
}

// PATCH /{tenantId}/items/{itemId} API 요청 바디 타입
export interface patchTodoItemRequest {
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
}

// PATCH /{tenantId}/items/{itemId} API 응답 타입
export interface patchTodoItemResponse {
  id: number;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
}

// DELETE /{tenantId}/items/{itemId} API 응답 타입
export interface deleteTodoItemResponse {
  message: string;
}

// POST /{tenantId}/images/upload API 응답 타입
export interface postImageResponse {
  url: string;
}
