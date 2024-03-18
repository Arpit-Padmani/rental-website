// Products.js
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import car from "../assest/carimg3.webp";
import bike from "../assest/bike.jpg";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

export const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/detail/getCarDetails')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
      setLoading(false);
  }, []);
  console.log(products);

  // Filter products based on search term, category, and city
  const filteredProducts = products.filter((product) => {
    const matchSearchTerm =
      product.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchCity = selectedCity === "all" || product.city === selectedCity;
    return matchSearchTerm && matchCategory && matchCity;
  });

  return (
    <div>
      <Navbar />
      <div className="w-11/12 mx-auto mt-16 p-4 mb-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              {/* Add more categories as needed */}
            </select>


            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="p-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Cities</option>
              <option value="Surat">Surat</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Ahemadabad">Ahmedabad</option>
              {/* Add more cities as needed */}
            </select>
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/4 p-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        <hr className="my-6 mt-10 mb-12" />
        {/* Product Catalog */}
        {loading ? (
          <div><Spinner /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
                <img key={product.id}
                  src={`http://localhost:5000/uploads/${product.photo1}`}
                  alt={product.name}
                  className="w-full h-52 object-cover mb-4 rounded-md"
                />
                <h3 key={product.id} className="text-xl font-semibold mb-2">{product.vehicleName} - {product.vehicleModel}</h3>
                <div key={product.id} className="text-gray-600  flex"><p className="text-black font-semibold mr-1">Price:  </p> {product.price}/ day</div>
                <div key={product.id} className="text-gray-600 mb-6 flex"><p className="text-black font-semibold mr-1">City:  </p> {product.city}</div>
                {/* Add more details as needed */}
                <Link ey={product.id} to={`/productdetail/${product._id}`} className="block w-full bg-black text-white py-2 px-5 rounded-md hover:bg-gray-700 focus:outline-none text-center">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Products;
