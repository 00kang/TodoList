import Image from "next/image";
import Link from "next/link";

export default function GNB() {
  return (
    <header className="h-[60px] w-full border-b border-slate-200 sm:px-4 md:px-6 lg:px-0">
      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center">
        <Link href={"/"} className="block">
          {/* 모바일: 작은 로고 */}
          <Image
            src="/images/illustrations/logo-small.svg"
            alt="logo"
            width={71}
            height={40}
            className="sm:block md:hidden"
          />
          {/* 태블릿 & 데스크탑: 큰 로고 */}
          <Image
            src="/images/illustrations/logo-large.svg"
            alt="logo"
            width={151}
            height={40}
            className="hidden md:block"
          />
        </Link>
      </div>
    </header>
  );
}
