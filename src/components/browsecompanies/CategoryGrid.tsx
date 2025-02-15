import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types/index";

interface CategoryGridProps {
  categories: Category[];
}

export const CategoryGrid = ({ categories }: CategoryGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.id}`}
          className="p-4 border rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <div className="w-8 h-8 mx-auto mb-2 relative">
            <Image
              src={category.icon}
              alt={category.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="font-medium text-center">{category.name}</div>
          {category.resultCount && (
            <div className="text-sm text-gray-600 text-center mt-1">
              {category.resultCount} Results
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};
