import ViewProductPage from "@/app/components/admin/products/ViewProductPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  console.log(params);

  return <ViewProductPage id={id} />;
}
