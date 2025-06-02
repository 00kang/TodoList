// POST /{tenantId}/items API 요청 바디 타입
export interface postTodoRequest {
  name: string;
}

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

// PATCH /{tenantId}/items/{itemId} API 요청 바디 타입
export interface patchTodoRequest {
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
}

// PATCH /{tenantId}/items/{itemId} API 응답 타입
export interface patchTodoResponse {
  id: number;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
}

// POST /{tenantId}/images/upload API 응답 타입
export interface postImageResponse {
  url: string;
}
