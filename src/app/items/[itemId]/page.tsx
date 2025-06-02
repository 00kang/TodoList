"use client";

import ShadowButton from "@/components/ShadowButton";
import TodoHeader from "@/components/TodoHeader";
import TodoImageUploader from "@/components/TodoImageUploader";
import TodoMemoEditor from "@/components/TodoMemoEditor";
import { getTodoItem, patchTodo, postImage } from "@/lib/api";
import { TENANT_ID } from "@/lib/constants";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ItemDetailPage() {
  const router = useRouter();
  const params = useParams();
  const itemId = params?.itemId as string;

  const [text, setText] = useState("제목 없음");
  const [todoState, setTodoState] = useState<"Default" | "Active">("Default");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [memo, setMemo] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const data = await getTodoItem(TENANT_ID, Number(itemId));
        setText(data.name);
        setTodoState(data.isCompleted ? "Active" : "Default");
        setImageUrl(data.imageUrl || "");
        setMemo(data.memo || "");
      } catch (err) {
        console.error("Failed to fetch todo item:", err);
      }
    };

    fetchTodo();
  }, [itemId]);

  const toggleState = () => {
    setTodoState((prev) => (prev === "Default" ? "Active" : "Default"));
  };

  const handleEdit = async () => {
    try {
      let updatedImageUrl = imageUrl;

      if (imageFile) {
        const res = await postImage(TENANT_ID, imageFile);
        updatedImageUrl = res.url;
      }

      await patchTodo(TENANT_ID, itemId, {
        name: text,
        isCompleted: todoState === "Active",
        imageUrl: updatedImageUrl,
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
        <TodoImageUploader imageUrl={imageUrl} onChange={setImageFile} />
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
