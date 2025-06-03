"use client";

import { ShadowButton } from "@/components/common";
import {
  TodoHeader,
  TodoImageUploader,
  TodoMemoEditor,
} from "@/components/detail";
import {
  deleteTodoItem,
  getTodoItem,
  patchTodoItem,
  postImage,
} from "@/lib/api";
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
  const [original, setOriginal] = useState({
    name: "",
    memo: "",
    imageUrl: "",
    isCompleted: false,
  });

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const data = await getTodoItem(TENANT_ID, Number(itemId));
        setText(data.name);
        setTodoState(data.isCompleted ? "Active" : "Default");
        setImageUrl(data.imageUrl || "");
        setMemo(data.memo || "");
        setOriginal({
          name: data.name,
          memo: data.memo || "",
          imageUrl: data.imageUrl || "",
          isCompleted: data.isCompleted,
        });
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

      await patchTodoItem(TENANT_ID, itemId, {
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

  const handleDelete = async () => {
    try {
      await deleteTodoItem(TENANT_ID, itemId);
      router.push("/");
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  const isEdited =
    text !== original.name ||
    memo !== original.memo ||
    (todoState === "Active") !== original.isCompleted ||
    imageFile !== null;

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
      <div className="flex flex-col gap-6 lg:flex-row">
        <TodoImageUploader imageUrl={imageUrl} onChange={setImageFile} />
        <TodoMemoEditor memo={memo} onChange={setMemo} />
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-center gap-4 lg:flex-row lg:justify-end">
        <ShadowButton
          type="Edit"
          size="Large"
          state={isEdited ? "Active" : "Default"}
          onClick={handleEdit}
        />
        <ShadowButton
          type="Delete"
          size="Large"
          state="Default"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
