export default function ItemDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto min-h-screen w-full max-w-[1000px] py-6">
      {children}
    </section>
  );
}
