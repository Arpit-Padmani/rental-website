import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const AddVehicleForm = () => {
  const [formData, setFormData] = useState({
    vehicleName: "",
    vehicleModel: "",
    photos: "",
    location: "",
    price: "",
    depositPrice: "",
    city: "",
    category: "car",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotosChange = (e) => {
    const files = e.target.files;
    console.log(files);
    
    if (files.length > 3) {
      alert("Please select up to 3 photos.");
      const fileInput = document.getElementById("photos");
      fileInput.value = "";
      return;
    }
  
    const selectedPhotos = Array.from(files);
    setFormData((prevData) => ({
      ...prevData,
      photos: selectedPhotos,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "vehicleName",
      "vehicleModel",
      "photos",
      "location",
      "price",
      "depositPrice",
      "city",
      "category",
    ];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      alert(`Please fill in all required fields: ${emptyFields.join(", ")}`);
      return;
    }
    alert("Added to Database");
    // Add your logic to handle the form submission (e.g., send data to a server)
    console.log(formData);
    // Reset the form after submission
    setFormData({
      vehicleName: "",
      vehicleModel: "",
      location: "",
      price: "",
      depositPrice: "",
      city: "",
      category: "car",
    });

    const fileInput = document.getElementById("photos");
    fileInput.value = "";
  };

  return (
    <div className="flex">
      <Sidebar />
      <form className="flex-grow max-w-lg mx-auto my-6 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl text-center font-semibold mb-8">Add Vehicle</h2>

        <div className="mb-4">
          <label htmlFor="vehicleName" className="block text-gray-600">
            Vehicle Name
          </label>
          <input
            type="text"
            id="vehicleName"
            name="vehicleName"
            value={formData.vehicleName}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="vehicleModel" className="block text-gray-600">
            Vehicle Model
          </label>
          <input
            type="text"
            id="vehicleModel"
            name="vehicleModel"
            value={formData.vehicleModel}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="photos" className="block text-gray-600">
            Photos (Max 3)
          </label>
          <input
            type="file"
            id="photos"
            name="photos"
            // accept="image/*"
            multiple
            onChange={handlePhotosChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-600">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-600">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="depositPrice" className="block text-gray-600">
            Deposit Price
          </label>
          <input
            type="number"
            id="depositPrice"
            name="depositPrice"
            value={formData.depositPrice}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-600">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-600">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          >
            <option value="car">Car</option>
            <option value="bike">Bike</option>
          </select>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Add Vehicle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicleForm;
