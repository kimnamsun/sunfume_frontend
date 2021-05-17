import React, { useEffect, useState } from 'react';
import { getCategories } from '@api';
import { Link } from 'framework7-react';
// import { useQuery } from 'react-query';
import { Category } from '@constants';
import { ApiService } from '../common/api/api.service';

// const categoriesSkeletonPlaceholder = (size) => new Array(size).fill({});

const Categories = () => {
  // const { data: categories, isLoading, isError, isFetching } = useQuery<Category[], Error>(
  //   'categories',
  //   getCategories({ q: { s: ['title asc'] } }),
  //   { placeholderData: categoriesSkeletonPlaceholder(16) },
  // );

  // if (isError) {
  //   return (
  //     <div className="h-32 flex items-center justify-center">
  //       <span className="text-gray-400">서버에 문제가 발생 했습니다. </span>
  //     </div>
  //   );
  // }
  const [categories, setCategories] = useState([]);
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
            <Link key={id} href={`/category/${id}`} className="bg-white h-20 flex flex-col items-center justify-center">
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
