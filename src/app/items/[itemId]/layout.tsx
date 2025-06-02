export default function ItemDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full justify-center bg-white">
      <section className="mx-auto w-full max-w-[1000px] sm:mx-4 md:mx-6">
        {children}
      </section>
    </div>
  );
}
