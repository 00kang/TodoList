"use client";

import ShadowButton from "@/components/ShadowButton";
import TodoHeader from "@/components/TodoHeader";
import TodoImageUploader from "@/components/TodoImageUploader";
import TodoMemoEditor from "@/components/TodoMemoEditor";
import { patchTodo, postImage } from "@/lib/api";
import { TENANT_ID } from "@/lib/constants";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ItemDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const itemId = params?.itemId as string;

  const [text, setText] = useState("제목 없음");
  const [todoState, setTodoState] = useState<"Default" | "Active">("Default");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [memo, setMemo] = useState("");

  useEffect(() => {
    const searchText = searchParams.get("text") ?? "제목 없음";
    const state = searchParams.get("state") === "Active" ? "Active" : "Default";

    setText(searchText);
    setTodoState(state);
  }, [searchParams]);

  const toggleState = () => {
    setTodoState((prev) => (prev === "Default" ? "Active" : "Default"));
  };

  const handleEdit = async () => {
    try {
      let imageUrl = "";
      if (imageFile) {
        const res = await postImage(TENANT_ID, imageFile);
        imageUrl = res.url;
      }

      await patchTodo(TENANT_ID, itemId, {
        name: text,
        isCompleted: todoState === "Active",
        imageUrl,
        memo,
      });
      router.push("/");
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  return (
    <div className="w-full space-y-6 py-6">
      {/* 할 일 제목 영역 */}
      <TodoHeader
        text={text}
        state={todoState}
        onToggle={toggleState}
        onTextChange={setText}
      />

      {/* 이미지 업로드 & 메모 박스 */}
      <div className="flex gap-6">
        {/* 이미지 업로더 */}
        <TodoImageUploader onChange={setImageFile} />
        {/* 메모 박스 */}
        <TodoMemoEditor memo={memo} onChange={setMemo} />
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-end gap-4">
        <ShadowButton
          type="Edit"
          size="Large"
          state="Default"
          onClick={handleEdit}
        />
        <ShadowButton type="Delete" size="Large" state="Default" />
      </div>
    </div>
  );
}
