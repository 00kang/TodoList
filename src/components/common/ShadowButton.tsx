/**
 * ShadowButton 컴포넌트
 *
 * - Add + Small + Default : 회색 배경 + 플러스 아이콘
 * - Add + Large + Default : 회색 배경 + 플러스 아이콘 + 추가하기 텍스트
 * - Add + Small + Active : 보라색 배경 + 플러스 아이콘
 * - Add + Large + Active : 보라색 배경 + 플러스 아이콘 + 추가하기 텍스트
 * - Delete : 빨간색 배경 + 클로즈 아이콘 + 삭제하기 텍스트
 * - Edit + Large + Default : 회색 배경 + 체크 아이콘 + 수정 완료 텍스트
 * - Edit + Large + Active : 라임색 배경 + 체크 아이콘 + 수정 완료 텍스트
 */

import PlusIcon from "@/components/common/PlusIcon";
import Image from "next/image";

type ButtonType = "Add" | "Delete" | "Edit";
type ButtonSize = "Small" | "Large";
type ButtonState = "Default" | "Active";

interface ShadowButtonProps {
  type: ButtonType;
  size: ButtonSize;
  state: ButtonState;
  onClick?: () => void;
  className?: string;
}

export default function ShadowButton({
  type,
  size,
  state,
  onClick,
  className,
}: ShadowButtonProps) {
  // 타입별 아이콘 설정
  const ICONS: Record<ButtonType, string> = {
    Add: "",
    Delete: "/images/icons/close.svg",
    Edit: "/images/icons/check.svg",
  };

  // 타입별 텍스트 설정
  const TEXTS: Record<ButtonType, string> = {
    Add: "추가하기",
    Delete: "삭제하기",
    Edit: "수정 완료",
  };

  // 버튼 사이즈 클래스
  const isSmall = size === "Small";
  const sizeClass = isSmall ? "w-[56px] h-[56px]" : "w-[168px] h-[56px] gap-1";

  // 타입 + 상태 조합에 따른 색상 정의
  const colorMap: Record<
    ButtonType,
    Record<ButtonState, { bg: string; text: string }>
  > = {
    Add: {
      Default: { bg: "bg-slate-200", text: "text-slate-900" },
      Active: { bg: "bg-violet-600", text: "text-white" },
    },
    Delete: {
      Default: { bg: "bg-rose-500", text: "text-white" },
      Active: { bg: "bg-rose-500", text: "text-white" },
    },
    Edit: {
      Default: { bg: "bg-slate-200", text: "text-slate-900" },
      Active: { bg: "bg-lime-300", text: "text-slate-900" },
    },
  };

  const { bg, text } = colorMap[type][state];

  return (
    <button
      onClick={onClick}
      className={`relative inline-block ${className}`}
      style={{ cursor: "pointer" }}
    >
      {/* 그림자 레이어 (버튼 배경 아래 그림자 효과) */}
      <div
        className={`absolute ${sizeClass} left-1 top-1 z-0 rounded-full bg-slate-900`}
      />

      {/* 실제 버튼 영역 */}
      <div
        className={`relative z-10 flex items-center justify-center rounded-full border-2 border-slate-900 font-sans ${bg} ${sizeClass}`}
      >
        {type === "Add" ? (
          <PlusIcon className={`h-4 w-4 ${text}`} />
        ) : (
          <Image src={ICONS[type]} alt={type} width={16} height={16} />
        )}

        {!isSmall && (
          <span className={`ml-1 text-base font-bold leading-none ${text}`}>
            {TEXTS[type]}
          </span>
        )}
      </div>
    </button>
  );
}
