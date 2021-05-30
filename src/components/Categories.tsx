import React, { useEffect, useState } from 'react';
import { Link } from 'framework7-react';
import { getCategories } from '@api';
import { Category } from '@constants';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await getCategories();
      setCategories(data);
    })();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2 pt-4 pb-3 px-2">
      {categories.map((category: Category) => {
        const { id, name, image_path } = category;
        return (
          <div key={id}>
            <Link href={`/category/${id}`} className="bg-white h-20 flex flex-col items-center justify-center">
              <img src={image_path} alt="categoryImage" className="w-14 h-14 rounded-lg shadow-sm" />
              <span className="text-gray-500 mt-1">{name}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Categories);
