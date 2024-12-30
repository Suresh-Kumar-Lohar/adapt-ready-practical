import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const DishesList = ({
  dishes = [],
  totalCount,
  queryParams,
  handlePageChange,
  handleSortChange,
}) => {
  const { page, limit, sortBy, orderBy } = queryParams;
  const totalPages = Math.ceil(totalCount / limit);

  const handlePrev = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  const handleSort = (column) => {
    const newSortOrder = sortBy === column && orderBy === 'ASC' ? 'DESC' : 'ASC';
    handleSortChange(column, newSortOrder);
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Table */}
      <div className="overflow-x-auto h-[350px] overflow-y-auto">
        <table className="w-full border border-gray-200 text-left table-fixed">
          <thead>
            <tr className="bg-gray-200">
              <th
                className="border px-2 py-0.5 cursor-pointer w-[13%]"
                onClick={() => handleSort('name')}
              >
                Dish Name {sortBy === 'name' ? (orderBy === 'ASC' ? '↑' : '↓') : '↑'}
              </th>
              <th className="border px-2 py-0.5 w-[19%]">Ingredients</th>
              <th
                className="border px-2 py-0.5 cursor-pointer w-[10%]"
                onClick={() => handleSort('prepTime')}
              >
                Prep Time {sortBy === 'prepTime' ? (orderBy === 'ASC' ? '↑' : '↓') : '↑'}
              </th>
              <th
                className="border px-2 py-0.5 cursor-pointer w-[10%]"
                onClick={() => handleSort('cookTime')}
              >
                Cooking Time {sortBy === 'cookTime' ? (orderBy === 'ASC' ? '↑' : '↓') : '↑'}
              </th>
              <th className="border px-2 py-0.5 w-[6%]">Diet Type</th>
              <th className="border px-2 py-0.5 w-[6%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-2 py-0.5 h-[60px]">{dish.name}</td>
                <td className="border px-2 py-0.5 h-[60px]">
                  {dish.foodIngredients
                    .map((ingredient) => ingredient.ingredient.name)
                    .join(', ')}
                </td>
                <td className="border px-2 py-0.5 h-[60px]">
                  {dish.prepTime ? `${dish.prepTime} mins` : 'Not available'}
                </td>
                <td className="border px-2 py-0.5 h-[60px]">
                  {dish.cookTime ? `${dish.cookTime} mins` : 'Not available'}
                </td>
                <td className="border px-2 py-0.5 h-[60px]">{dish.dietType}</td>
                <td className="border px-2 py-0.5 text-center h-[60px]">
                  <Link
                    to={`/dish/${dish?.id}`}
                    className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {dishes.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="border px-2 py-0.5 text-center text-gray-500 h-[60px]"
                >
                  No dishes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </div>
  );
};

export default DishesList;
