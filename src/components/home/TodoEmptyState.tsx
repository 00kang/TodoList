import Image from "next/image";

interface TodoEmptyStateProps {
  imgSrc: string;
  imgSrcMd?: string;
  alt: string;
  message: string;
}

export default function TodoEmptyState({
  imgSrc,
  imgSrcMd,
  alt,
  message,
}: TodoEmptyStateProps) {
  return (
    <div className={`flex flex-col items-center gap-6 text-center`}>
      <div className="relative">
        {/* 모바일 이미지 */}
        <Image
          src={imgSrc}
          alt={alt}
          width={120}
          height={120}
          className={imgSrcMd ? "block md:hidden" : ""}
        />
        {/* 태블릿 / 데스크탑 이미지 */}
        {imgSrcMd && (
          <Image
            src={imgSrcMd}
            alt={alt}
            width={240}
            height={240}
            className="hidden md:block"
          />
        )}
      </div>

      {/* 안내 메시지 출력 */}
      <p className="whitespace-pre-line text-base font-bold leading-snug text-slate-400">
        {message}
      </p>
    </div>
  );
}
