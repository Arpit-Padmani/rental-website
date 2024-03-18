import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "../../redux/auth";

const YourVehical = () => {
  const [products, setProducts] = useState([]);

  const { user } = useAuth();
  const userId = user?.userData?._id;
  console.log(userId);

  useEffect(() => {
    fetch('http://localhost:5000/api/detail/getCarDetails')
      .then(response => response.json())
      .then(data => {
        console.log(data);  // Log the data structure

        // Assuming data is an array of objects with a userId property
        const userProducts = data.filter(product => product.userId === userId);

        setProducts(userProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [userId]);
  console.log(products);
  return (
    <div className="flex">
      <Sidebar />
      <div className="mx-auto shadow-md rounded-md my-10 w-4/5 p-4">
        <h2 className="text-3xl text-center font-semibold mb-14 text-black">
          Your Vehicle
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 ">
          {
            products.length < 1 ? (
              <div className="flex items-center justify-center h-[450px]">
              <p className="text-4xl text-gray-600">No vehicles found.</p>
            </div>
            ) : (
              products.map(product => (
                <div key={product.id} className="bg-white flex flex-col w-fit shadow-lg mx-[50px] my-[0px] py-[15px] px-[24px]
                items-center justify-center rounded-md overflow-hidden ">
                  <div >
                    <div>
                      <img className="w-80 h-48 mt-5 object-cover rounded-md items-center"
                        src={`http://localhost:5000/uploads/${product.photo1}`}
                        alt={product.vehicleName} />

                    </div>
                    <div className="p-4 ">
                      <h2 className="text-xl font-semibold mb-2">
                        Name: {product.vehicleName}
                      </h2>
                      <h2 className="text-xl font-semibold mb-2">
                        Model: {product.vehicleModel}
                      </h2>
                      <h2 className="text-xl font-semibold mb-2">
                        Fuel Type: {product.fuelType}
                      </h2>
                      <h2 className="text-xl font-semibold mb-8">
                        Transmission Type: {product.transmissionType}
                      </h2>

                      <div className="flex">
                        <Link to={`/admin/vehicleDetail/${product._id}`} className="bg-black text-white py-2 px-5 mr-10 rounded-md hover:bg-gray-700 focus:outline-none">
                          View Vehicle
                        </Link>
                        <button className="bg-black text-white py-2 px-5 rounded-md hover:bg-gray-700 focus:outline-none">
                          View Vehicle
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )))}
        </div>
      </div>
    </div>
  );
};

export default YourVehical;
