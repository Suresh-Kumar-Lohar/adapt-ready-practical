import React, { useEffect, useState } from 'react';
import UserApi from '../api/UserApi';
import { DishesList, Filter, MultiSelectFIlter, SearchBar } from '../components';
import { states, flavourTypes, dietTypes } from '../utils/Constant';

const HomePage = () => {
  const [dishes, setDishes] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 5,
    dietType: '',
    flavourType: '',
    state: '',
    sortBy: 'name',
    orderBy: 'ASC',
    search: '',
  });

  const fetchDishes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await UserApi.getDishList(queryParams);
      setDishes(data.data.rows);
      setTotalCount(data.data.count);
    } catch (err) {
      setError('Failed to fetch dishes');
    } finally {
      setLoading(false);
    }
  };

  const fetchIngredientList = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await UserApi.getIngredientList();
      setIngredientList([...data?.data]);
    } catch (err) {
      setError('Failed to fetch ingredients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
    fetchIngredientList();
  }, [queryParams]);

  const handlePageChange = (page) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      page,
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      [filterType]: value,
      page: 1,
    }));
  };

  const handleSortChange = (column, order) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      sortBy: column,
      orderBy: order,
    }));
  };

  const handleSearchChange = (value) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      search: value,
      page: 1,
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold my-4 text-center text-gray-800">Dishes List</h2>


      <div className="mb-2 mx-6 flex justify-between flex-wrap gap-4">
        <MultiSelectFIlter
          label="Diet Suggester"
          options={ingredientList}
          selectedValue={queryParams.ingredientList}
          onChange={(values) => handleFilterChange('ingredients', values)}
        />
        <SearchBar search={queryParams.search} onSearchChange={handleSearchChange} />
        <div className='mb-2 mx-6 flex justify-between flex-wrap gap-4'>
          <Filter
            label="Diet Type"
            options={dietTypes}
            selectedValue={queryParams.dietType}
            onChange={(value) => handleFilterChange('dietType', value)}
          />
          <Filter
            label="Flavour"
            options={flavourTypes}
            selectedValue={queryParams.flavourType}
            onChange={(value) => handleFilterChange('flavourType', value)}
          />
          <Filter
            label="State"
            options={states}
            selectedValue={queryParams.state}
            onChange={(value) => handleFilterChange('state', value)}
          />
        </div>
      </div>

      <DishesList
        dishes={dishes}
        totalCount={totalCount}
        queryParams={queryParams}
        handlePageChange={handlePageChange}
        handleSortChange={handleSortChange}
      />
    </div>
  );
};

export default HomePage;
