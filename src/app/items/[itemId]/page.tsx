"use client";

import { ShadowButton } from "@/components/common";
import {
  TodoHeader,
  TodoImageUploader,
  TodoMemoEditor,
} from "@/components/detail";
import { useTodoDetailForm } from "@/hooks/useTodoDetailForm";

export default function ItemDetailPage() {
  const {
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
  } = useTodoDetailForm();

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
