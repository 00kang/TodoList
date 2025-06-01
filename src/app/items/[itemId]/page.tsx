interface ItemDetailPageProps {
  params: Promise<{ itemId: string }>;
}

export default async function ItemDetailPage({ params }: ItemDetailPageProps) {
  const { itemId } = await params;
  return <div>상세 페이지 - {itemId}</div>;
}
