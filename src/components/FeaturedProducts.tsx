import ProductsWithPagination from "@/components/Pagination";

interface Product {
  id: number;
  title: string;
  images: string[];
  price: number;
  description: string;
  categoryId: number | null;
}

const FeaturedProducts = ({ products }: { products: Product[] }) => {
  return (
    <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <h1 className="text-2xl">Featured Products</h1>
      <div className="flex flex-wrap gap-10 mt-12">
        <ProductsWithPagination products={products} />
      </div>
    </div>
  );
};

export default FeaturedProducts;
