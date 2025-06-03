"use client";

import { deleteTodoItem, getTodoItem, patchTodoItem } from "@/lib/api";
import { TENANT_ID } from "@/lib/constants";
import { isEditedComparedToOriginal, uploadTodoImage } from "@/lib/utils";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useTodoDetailForm() {
  const router = useRouter();
  const { itemId } = useParams() as { itemId: string };

  const [text, setText] = useState("제목 없음");
  const [todoState, setTodoState] = useState<"Default" | "Active">("Default");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [memo, setMemo] = useState("");
  const [original, setOriginal] = useState({
    name: "",
    memo: "",
    imageUrl: "",
    isCompleted: false,
  });

  useEffect(() => {
    (async () => {
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
    })();
  }, [itemId]);

  const toggleState = () =>
    setTodoState((prev) => (prev === "Default" ? "Active" : "Default"));

  const handleEdit = async () => {
    try {
      const updatedImageUrl = await uploadTodoImage(imageFile, imageUrl);
      await patchTodoItem(TENANT_ID, itemId, {
        name: text,
        isCompleted: todoState === "Active",
        imageUrl: updatedImageUrl,
        memo,
      });
      router.push("/");
    } catch (err) {
      console.error("할 일 수정 실패", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodoItem(TENANT_ID, itemId);
      router.push("/");
    } catch (err) {
      console.error("할 일 삭제 실패", err);
    }
  };

  const isEdited = isEditedComparedToOriginal({
    text,
    memo,
    todoState,
    imageFile,
    original,
  });

  return {
    text,
    todoState,
    imageUrl,
    memo,
    setText,
    setImageFile,
    setMemo,
    toggleState,
    handleEdit,
    handleDelete,
    isEdited,
  };
}
