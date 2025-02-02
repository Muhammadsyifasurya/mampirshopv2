import { getDataResponse } from "./service/api";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import CategorySection from "@/components/categories/CategorySection";
import NewProducts from "@/components/products/NewProducts";
import Slider from "@/components/ui/Slider";

const Page = async () => {
  const products = await getDataResponse("/products");
  const categories = await getDataResponse("/categories");
  const newProducts = await getDataResponse("/products");
  return (
    <>
      {/* Slider tetap bisa dipanggil di sini, jika ingin dirender di sisi klien */}
      <Slider />

      {/* Panggil FeaturedProducts */}
      <FeaturedProducts products={products} />

      {/* Panggil CategorySection */}
      <CategorySection categories={categories} />

      {/* Panggil NewProducts */}
      <NewProducts products={newProducts} />
    </>
  );
};

export default Page;
