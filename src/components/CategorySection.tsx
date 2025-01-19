import CategoryList from "@/components/CategoryList";

interface CategoryProps {
  id: number;
  name: string;
  image: string;
}

const CategorySection = ({ categories }: { categories: CategoryProps[] }) => {
  return (
    <div className="mt-24">
      <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
        Categories
      </h1>
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-56 w-full">
        <div className="flex gap-16 overflow-x-auto pb-6">
          {categories.map((category) => (
            <CategoryList
              key={category.id}
              images={category.image}
              name={category.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
