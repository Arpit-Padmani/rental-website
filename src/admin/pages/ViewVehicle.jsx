import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import car1 from "../assest/car1.jpeg";
import car2 from "../assest/bike1.jpeg";
import car3 from "../assest/car1.jpeg";

const ViewVehicle = () => {
  const sampleVehicle = {
    id: "1",
    name: "Range Rover",
    model: "Velar",
    location: "Nana Varachha, Surat",
    price: "₹5000",
    deposit: "₹4000",
    city: "Surat",
    images: [car1, car2, car3],
  };

  const { id } = useParams();
  const vehicle = id === sampleVehicle.id ? sampleVehicle : null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const goBack = () => {
    window.history.back(); // This will navigate to the previous page
  };

  if (!vehicle) {
    return <div className="text-center">Vehicle not found</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <p className="text-4xl font-semibold text-center">Vehicle Detail</p>
        <hr className="my-4" />
        <div className="mt-8">
          <button
            onClick={goBack}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none"
          >
            &#8592; Back
          </button>
        </div>
        <div className="flex mt-32">
          <div className="w-1/2 pr-4 relative">
            <img
              src={vehicle.images[currentImageIndex]}
              alt={`${vehicle.name} ${vehicle.model}`}
              className="w-full h-auto object-cover rounded-md"
            />
            {vehicle.images.length > 1 && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2">
                {vehicle.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(index)}
                    className={`w-3 h-3 mx-1 rounded-full ${
                      currentImageIndex === index ? "bg-black" : "bg-gray-300"
                    }`}
                  ></button>
                ))}
              </div>
            )}
          </div>
          <div className="w-1/2 pl-4">
            <h2 className="text-3xl font-semibold mb-8">{`${vehicle.name} ${vehicle.model}`}</h2>
            <div className="text-lg">
              <p className="mb-4">
                <strong>Location:</strong> {vehicle.location}
              </p>
              <p className="mb-4">
                <strong>Price:</strong> {vehicle.price}
              </p>
              <p className="mb-4">
                <strong>Deposit Price:</strong> {vehicle.deposit}
              </p>
              <p className="mb-4">
                <strong>City:</strong> {vehicle.city}
              </p>
            </div>
            <div className="flex mt-20">
              <Link
                to={`/updateVehicle/${vehicle.id}`}
                className="bg-black text-white py-2 px-5 mr-10 rounded-md hover:bg-gray-700 focus:outline-none"
              >
                Update
              </Link>
              <Link
                to={`/deleteVehicle/${vehicle.id}`}
                className="bg-black text-white py-2 px-5 rounded-md hover:bg-gray-700 focus:outline-none"
              >
                Delete
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVehicle;
