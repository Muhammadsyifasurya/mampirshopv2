import { getDataResponse } from "./service/api";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
import NewProducts from "@/components/NewProducts";
import Slider from "@/components/Slider";

const Page = async () => {
  const products = await getDataResponse("/products");
  const categories = await getDataResponse("/categories");

  const limitproducts = products.slice(0, 4);

  return (
    <>
      {/* Slider tetap bisa dipanggil di sini, jika ingin dirender di sisi klien */}
      <Slider />

      {/* Panggil FeaturedProducts */}
      <FeaturedProducts products={products} />

      {/* Panggil CategorySection */}
      <CategorySection categories={categories} />

      {/* Panggil NewProducts */}
      <NewProducts products={limitproducts} />
    </>
  );
};

export default Page;
