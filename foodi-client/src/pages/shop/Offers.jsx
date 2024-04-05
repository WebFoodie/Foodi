import React, { useState, useEffect } from 'react';

const Offers = () => {
  const [foodImages, setFoodImages] = useState([]);

  useEffect(() => {
    fetchFoodImages();
  }, []);

  const fetchFoodImages = () => {
    fetch('https://api.pexels.com/v1/search?query=food&per_page=8&page=1', {
      headers: {
        Authorization: '563492ad6f9170000100000190abec80cd5e4d59a7cd527f42dab8e2'
      }
    })
      .then(response => response.json())
      .then(data => {
        setFoodImages(data.photos);
      })
      .catch(error => console.error('Error fetching food images:', error));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Special Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foodImages.map((image, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md px-4 py-6">
            <img
              src={image.src.medium} // Assuming 'medium' is the size of image you want to display
              alt={image.photographer}
              className="w-full rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Food Image</h3>
              <div className="flex items-center justify-between">
                <button className="btn btn-primary">Order Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
