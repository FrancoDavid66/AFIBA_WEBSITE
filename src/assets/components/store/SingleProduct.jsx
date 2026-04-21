import React from "react";
import { CARROUSEL_STORE } from "../../data/home";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();

  const item = CARROUSEL_STORE.find((item) => item.id === id);
  const { title, image, description, category, price } = item;

  return (
    <section className="container mx-auto py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10">
        <div className="relative">
          <img src={image} alt={title} className="w-full h-auto" />
          <span className="absolute top-0 right-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-lg">
            {category}
          </span>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4">{title}</h2>
          <p className="text-gray-700 mb-6">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-gray-900">
              ${price}
            </span>
            <button className="bg-primary-100 hover:bg-primary-400 hover:scale-110 transition-all duration-300 text-white px-4 py-2 rounded-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
