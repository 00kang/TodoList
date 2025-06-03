"use client";

import { FlatButton } from "@/components/common";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface TodoImageUploaderProps {
  imageUrl?: string;
  onChange: (file: File) => void;
}

export default function TodoImageUploader({
  imageUrl,
  onChange,
}: TodoImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState(imageUrl || "");

  useEffect(() => {
    if (imageUrl) {
      setPreview(imageUrl);
    }
  }, [imageUrl]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
      alert("파일 이름은 영문으로 구성되어야 합니다.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB를 초과할 수 없습니다.");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file);
  };

  return (
    <div className="relative flex h-[311px] w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 lg:w-[384px]">
      {preview ? (
        <Image
          src={preview}
          alt="preview"
          fill
          className="max-h-full max-w-full rounded-3xl object-cover"
        />
      ) : (
        <Image
          src="/images/illustrations/img.svg"
          alt="placeholder"
          width={64}
          height={64}
        />
      )}
      <div className="absolute bottom-4 right-4">
        <FlatButton
          type={preview ? "Edit" : "Plus"}
          onClick={() => inputRef.current?.click()}
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleUpload}
        />
      </div>
    </div>
  );
}
