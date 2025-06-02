"use client";

import FlatButton from "@/components/FlatButton";
import ShadowButton from "@/components/ShadowButton";
import TodoHeader from "@/components/TodoHeader";
import { patchTodo } from "@/lib/api";
import { TENANT_ID } from "@/lib/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ItemDetailPageProps {
  params: { itemId: string };
  searchParams: { text?: string; state?: string };
}

export default function ItemDetailPage({
  params,
  searchParams,
}: ItemDetailPageProps) {
  const router = useRouter();
  const { itemId } = params;

  const initialText = searchParams.text ?? "제목 없음";
  const initialState = searchParams.state === "Active" ? "Active" : "Default";

  const [text, setText] = useState(initialText);
  const [todoState, setTodoState] = useState<"Default" | "Active">(
    initialState,
  );

  const toggleState = () => {
    setTodoState((prev) => (prev === "Default" ? "Active" : "Default"));
  };

  const handleEdit = async () => {
    try {
      await patchTodo(TENANT_ID, itemId, {
        name: text,
        isCompleted: todoState === "Active",
        imageUrl: "",
        memo: "",
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
        <div className="relative flex h-[311px] w-[384px] items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50">
          <Image
            src="/images/illustrations/img.svg"
            alt="image placeholder"
            width={64}
            height={64}
          />
          <div className="absolute bottom-4 right-4">
            <FlatButton type="Plus" />
          </div>
        </div>

        {/* 메모 박스 */}
        <div className="relative flex h-[311px] w-[588px] flex-col items-center rounded-3xl bg-[url('/images/illustrations/memo.svg')] bg-cover bg-no-repeat px-6 py-6">
          <span className="mb-2 text-base font-extrabold text-amber-800">
            Memo
          </span>
          <div className="flex flex-1 items-center text-base leading-none text-slate-800">
            오메가 3, 프로폴리스, 아연 챙겨먹기
          </div>
        </div>
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
