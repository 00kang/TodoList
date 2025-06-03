/**
 * useTodoDetailForm
 *
 * - 특정 Todo 상세 페이지에서 수정/삭제/입력 상태 관리 전반을 담당하는 커스텀 훅
 * - 데이터 초기 로딩, 이미지 업로드, 수정/삭제 API 호출, 편집 여부 판단 등을 포함
 */

"use client";

import { deleteTodoItem, getTodoItem, patchTodoItem } from "@/lib/api";
import { TENANT_ID } from "@/lib/constants";
import { isEditedComparedToOriginal, uploadTodoImage } from "@/lib/utils";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useTodoDetailForm() {
  const router = useRouter();
  const { itemId } = useParams() as { itemId: string };

  // 입력 상태들
  const [text, setText] = useState("제목 없음");
  const [todoState, setTodoState] = useState<"Default" | "Active">("Default");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [memo, setMemo] = useState("");

  // 원본 데이터 (수정 여부 판단용)
  const [original, setOriginal] = useState({
    name: "",
    memo: "",
    imageUrl: "",
    isCompleted: false,
  });

  // Todo 상세 정보 초기 로딩
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

  // 상태 토글 핸들러 (완료 <-> 미완료)
  const toggleState = () =>
    setTodoState((prev) => (prev === "Default" ? "Active" : "Default"));

  // 수정 API 호출 + 이미지 업로드 처리
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

  // 삭제 API 호출
  const handleDelete = async () => {
    try {
      await deleteTodoItem(TENANT_ID, itemId);
      router.push("/");
    } catch (err) {
      console.error("할 일 삭제 실패", err);
    }
  };

  // 입력값이 원본과 달라졌는지 여부 판단 (버튼 활성화 조건 등으로 활용)
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
