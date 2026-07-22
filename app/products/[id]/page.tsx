import ProductDetailPage from "@/app/components/products/ProductDetailPage";

interface PageProps {
  params: Promise<{ id: string; userId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  //   console.log(id);

  return <ProductDetailPage id={id} />;
}
