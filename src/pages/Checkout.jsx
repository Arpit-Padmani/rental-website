import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    startDate: "",
    endDate: "",
    numberOfDays: 0,
  });

  const { id } = useParams();
  console.log(id);

  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    startDate: "",
    endDate: "",
    numberOfDays: 0,
    carId: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  console.log(bookingDetails);

  useEffect(() => {
    console.log("Setting userId:", id);
    setBookingDetails((prevData) => ({
      ...prevData,
      carId: id
    }));
    console.log("User:", bookingDetails);
  }, [id]);

  const handleCheckout = async (req, res) => {

    try {
      const response = await fetch("http://localhost:5000/api/checkout/bookingDetail", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(bookingDetails),
      });


      if (response.ok) {
        console.log(bookingDetails);
        const data = await response.json();
        const checkoutId  = data.data._id;

        navigate(`/payment/${checkoutId}`);
        console.log(checkoutId);
        
        console.log("data submited");
        

      } else {

      }
    } catch (error) {
      console.log("error in contact form " + error);
    }
    console.log("Booking Details:", bookingDetails);

  };


  const calculateNumberOfDays = () => {
    const { startDate, endDate } = bookingDetails;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInTime = end.getTime() - start.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        numberOfDays: (differenceInDays),
      }));
    }
  };

  const handleStartDateChange = (e) => {
    const { value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      startDate: value,
      endDate: "", // Reset end date when start date changes
    }));
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <Navbar />
      <div className="flex-1 w-11/12 mx-auto h-full p-8">
        <p className="text-4xl font-semibold text-center mb-4">
          Checkout Page
        </p>
        <hr className="my-4" />
        <div className="mt-8 items-center mx-auto  w-5/12 bg-white p-4 rounded-md mb-8 shadow-md">
          {/* User Details Card */}
          <div className="bg-white p-4 rounded-md mb-8 shadow-md ">
            <h3 className="text-xl font-semibold mb-4">User Details</h3>
            <div className="mb-4 flex">
              <label className="block text-lg mr-4 font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={bookingDetails.name}
                onChange={handleChange}
                className="w-80 p-1 border rounded-md"
              />
            </div>
            <div className="mb-4 flex">
              <label className="block text-lg mr-4 font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={bookingDetails.email}
                onChange={handleChange}
                className="w-80 p-1 border rounded-md"
              />
            </div>
            <div className="mb-4 flex">
              <label className="block text-lg mr-4 font-medium text-gray-700">
                Phone No:
              </label>
              <input
                type="text"
                name="phone"
                value={bookingDetails.phone}
                onChange={handleChange}
                className="w-80 p-1 border rounded-md"
              />
            </div>
            <div className="mb-4 flex">
              <label className="block text-lg mr-4 font-medium text-gray-700">
                Address:
              </label>
              <textarea
                name="address"
                value={bookingDetails.address}
                onChange={handleChange}
                className="w-80 p-1 border rounded-md"
              />
            </div>
          </div>

          {/* Booking Details Card */}
          <div className="bg-white p-4 rounded-md shadow-md flex-1">
            <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
            <div className="mb-4 flex">
              <label className="block text-lg mr-4 font-medium text-gray-700">
                Start Date:
              </label>
              <input
                type="date"
                name="startDate"
                value={bookingDetails.startDate}
                min={today} 
                onChange={handleStartDateChange}
                onBlur={calculateNumberOfDays}
                className="w-80 p-1 border rounded-md"
              />
            </div>
            <div className="mb-4 flex">
              <label className="block text-lg mr-4 font-medium text-gray-700">
                End Date:
              </label>
              <input
                type="date"
                name="endDate"
                value={bookingDetails.endDate}
                min={bookingDetails.startDate || today} 
                onChange={handleBookingChange}
                onBlur={calculateNumberOfDays}
                className="w-80 p-1 border rounded-md"
              />
            </div>
            <div className="mb-4 flex">
              <label className="block text-lg mr-4 font-medium text-gray-700">
                Number of Days:
              </label>
              <input
                type="text"
                value={bookingDetails.numberOfDays}
                readOnly
                className="w-80 p-1 border rounded-md"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={handleCheckout}
            className="bg-black text-white py-2 px-5 rounded-md hover:bg-gray-700 focus:outline-none"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;