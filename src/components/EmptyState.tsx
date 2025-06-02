import Image from "next/image";

interface EmptyStateProps {
  imgSrc: string;
  alt: string;
  message: string;
  size: number;
  className: string;
}

export default function EmptyState({
  imgSrc,
  alt,
  message,
  size,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`${className} flex flex-col items-center gap-6 text-center`}
    >
      <Image src={imgSrc} alt={alt} width={size} height={size} />
      <p className="whitespace-pre-line text-base font-bold leading-snug text-slate-400">
        {message}
      </p>
    </div>
  );
}
