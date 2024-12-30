import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserApi from '../api/UserApi';

const DishDetailPage = () => {
  const [dishDetails, setDishDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dishId } = useParams();

  const fetchDishDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await UserApi.getDishDetails({ dishId });
      if (data?.data) setDishDetails(data.data);
    } catch (err) {
      setError('Failed to fetch dish details!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishDetails();
  }, []);

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden">        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-200 p-4 flex justify-center items-center">
            {dishDetails.image ? (
              <img
                src={dishDetails.image}
                alt={dishDetails.name}
                className="max-w-full h-auto rounded-lg shadow"
              />
            ) : (
              <div className="text-gray-400 text-lg">No Image Available</div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {dishDetails.name || 'Dish Name'}
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              {dishDetails.description || 'Delicious dish details will appear here.'}
            </p>
            <ul className="space-y-4 text-gray-700">
              <li>
                <strong>Ingredients:</strong>{' '}
                {dishDetails?.foodIngredients
                  ?.map((ingredient) => ingredient?.ingredient?.name)
                  .join(', ') || 'Not specified'}
              </li>
              <li>
                <strong>Diet Type:</strong> {dishDetails.dietType || 'Not specified'}
              </li>
              <li>
                <strong>Preparation Time:</strong> {dishDetails.prepTime || 'N/A'} mins
              </li>
              <li>
                <strong>Cooking Time:</strong> {dishDetails.cookTime || 'N/A'} mins
              </li>
              <li>
                <strong>Flavour:</strong> {dishDetails.flavourProfile || 'N/A'}
              </li>
              <li>
                <strong>Region:</strong> {dishDetails.region || 'N/A'}
              </li>
              <li>
                <strong>State:</strong> {dishDetails.state || 'N/A'}
              </li>
            </ul>

            <div className="mt-6 flex space-x-4 items-center justify-center">
              <button
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 transition"
                onClick={() => window.history.back()}
              >
                Back to Dishes
              </button>
              <button
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded cursor-not-allowed"
              >
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetailPage;