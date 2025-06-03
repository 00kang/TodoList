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
        <Image
          src={imgSrc}
          alt={alt}
          width={120}
          height={120}
          className={imgSrcMd ? "block md:hidden" : ""}
        />
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
      <p className="whitespace-pre-line text-base font-bold leading-snug text-slate-400">
        {message}
      </p>
    </div>
  );
}
