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

export async function uploadTodoImage(
  imageFile: File | null,
  fallbackUrl: string,
): Promise<string> {
  if (!imageFile) return fallbackUrl;

  const res = await postImage(TENANT_ID, imageFile);
  return res.url;
}
