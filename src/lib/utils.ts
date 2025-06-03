import { postImage } from "@/lib/api";
import { TENANT_ID } from "@/lib/constants";

interface CompareParams {
  text: string;
  memo: string;
  todoState: "Default" | "Active";
  imageFile: File | null;
  original: {
    name: string;
    memo: string;
    imageUrl: string;
    isCompleted: boolean;
  };
}

// 사용자가 입력한 현재 값들이 원본(original)과 비교해 변경되었는지를 판별하는 함수
export function isEditedComparedToOriginal({
  text,
  memo,
  todoState,
  imageFile,
  original,
}: CompareParams): boolean {
  return (
    text !== original.name ||
    memo !== original.memo ||
    (todoState === "Active") !== original.isCompleted ||
    imageFile !== null
  );
}

// 이미지가 새로 업로드된 경우, 서버에 이미지를 업로드하고 반환된 URL을 제공
// 이미지가 없는 경우에는 기존 URL(fallbackUrl)을 그대로 반환
export async function uploadTodoImage(
  imageFile: File | null,
  fallbackUrl: string,
): Promise<string> {
  if (!imageFile) return fallbackUrl;

  const res = await postImage(TENANT_ID, imageFile);
  return res.url;
}
