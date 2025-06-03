interface TodoMemoEditorProps {
  memo: string;
  onChange: (value: string) => void;
}

export default function TodoMemoEditor({
  memo,
  onChange,
}: TodoMemoEditorProps) {
  return (
    <div className="flex h-[311px] w-full flex-col rounded-3xl bg-[url('/images/illustrations/memo.svg')] bg-cover bg-no-repeat px-4 py-6 lg:w-[588px]">
      {/* 섹션 제목 */}
      <span className="mb-2 text-center text-base font-extrabold text-amber-800">
        Memo
      </span>

      {/* 입력 영역 */}
      <div className="flex-1">
        <textarea
          value={memo}
          onChange={(e) => onChange(e.target.value)}
          placeholder="메모를 입력하세요..."
          className="h-full w-full resize-none overflow-y-auto bg-transparent text-center text-base text-slate-800 outline-none"
        />
      </div>
    </div>
  );
}
