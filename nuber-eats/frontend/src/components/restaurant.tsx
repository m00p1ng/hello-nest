import React from "react";
import { Link } from "react-router-dom";

interface IRestaurantProps {
  id: string;
  coverImage: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  coverImage,
  name,
  categoryName,
}) => (
  <Link to={`/restaurants/${id}`}>
    <div className="flex flex-col">
      <div
        style={{ backgroundImage: `url(${coverImage})` }}
        className="bg-cover bg-center mb-3 py-28"
      ></div>
      <h3 className="text-xl">{name}</h3>
      <span className="border-t mt-2 py-2 text-xs opacity-50 border-gray-400">
        {categoryName}
      </span>
    </div>
  </Link>
);