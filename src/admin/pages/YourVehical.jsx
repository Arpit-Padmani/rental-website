import React, { useState } from "react";
import car from "../assest/car1.jpeg";
import bike from "../assest/bike1.jpeg";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

const YourVehical = () => {
  // Sample data for vehicles
  const [vehicles] = useState([
    {
      id: 1,
      name: "Range Rover",
      model: "Velar",
      image: car,
    },
    {
      id: 2,
      name: "Pulsar",
      model: "220",
      image: bike,
    },
    {
      id: 3,
      name: "Range Rover",
      model: "Velar",
      image: car,
    },
    {
      id: 4,
      name: "Pulsar",
      model: "220",
      image: bike,
    },
    // Add more vehicles as needed
  ]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="mx-auto shadow-md rounded-md my-10 w-4/5 p-4">
        <h2 className="text-3xl text-center font-semibold mb-14 text-black">
          Your Vehicle
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="flex-shrink-0">
              <div className="bg-white flex shadow-md w-1/2 mb-4 p-4 rounded-md overflow-hidden mx-auto">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.name} ${vehicle.model}`}
                  className="w-80 h-48 object-cover rounded-md"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Name: {vehicle.name}
                  </h2>
                  <h2 className="text-xl font-semibold mb-14">
                    Model: {vehicle.model}
                  </h2>
                  <div className="flex">
                    <Link to={`/admin/vehicleDetail/${vehicle.id}`} className="bg-black text-white py-2 px-5 mr-10 rounded-md hover:bg-gray-700 focus:outline-none">
                      View Vehicle
                    </Link>
                    <button className="bg-black text-white py-2 px-5 rounded-md hover:bg-gray-700 focus:outline-none">
                      View Vehicle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourVehical;
