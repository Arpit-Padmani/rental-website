import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";

const Payment = () => {
  // Sample booking details

  const [checkout,setCheckout] = useState([]);
  const [products, setProducts] = useState([]);
  const sampleBookingDetails = {
    depositPrice: 4000,
    rentPrice: 5000,
    tax: 500,
    noOfDays: 2,
  };

  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    fetch(`http://localhost:5000/api/checkout/getcheckoutDetial/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setCheckout(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  console.log(checkout);
  
  const productId=checkout.carId;
  useEffect(() => {
    fetch(`http://localhost:5000/api/detail/getProduct/ProductById/${productId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProducts(data);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [productId]);
  console.log(products);

  const totalRent = products.price * checkout.numberOfDays;
  const taxAmount = totalRent * 5 / 100;

  // Calculate total amount
  const calculateTotal = () => {
    return products.depositPrice + totalRent + taxAmount;
  };

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");

  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Handle payment processing
  const handlePayment = () => {
    if (paymentMethod === "Deposit" || paymentMethod === "Total") {
      console.log(`Payment processed for ${paymentMethod} amount`);
      // Here you can add logic for actual payment processing
    } else if (paymentMethod === "CashOnDelivery") {
      console.log("Payment on delivery");
      // Here you can add logic for cash on delivery
    } else {
      console.error("Please select a payment method.");
    }
  };

  // Render pay button based on selected payment method
  const renderPayButton = () => {
    if (paymentMethod === "Deposit" || paymentMethod === "Total") {
      return (
        <div className="flex justify-center"> {/* Centering container */}
          <button
            className="bg-black text-white py-2 px-5 rounded-md mt-10 hover:bg-gray-700 focus:outline-none"
            onClick={handlePayment}
          >
            Pay ₹{paymentMethod === "Deposit" ? products.depositPrice : calculateTotal()}
          </button>
        </div>
      );
    } else if (paymentMethod === "CashOnDelivery") {
      return (
        <div className="flex justify-center"> {/* Centering container */}
          <button
            className="bg-black text-white py-2 px-5 rounded-md mt-10 hover:bg-gray-700 focus:outline-none"
            onClick={handlePayment}
          >
            Pay on Delivery
          </button>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex-1 h-full p-8">
        <p className="text-4xl font-semibold text-center mb-4">Payment Page</p>
        <hr className="my-4" />
        <div className="mt-8 w-1/2 mx-auto">
          {/* Payment Details Card */}
          <div className="bg-white p-4 rounded-md shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
            <div className="flex justify-between mb-2">
              <p>Deposit Price:</p>
              <p>₹{products.depositPrice}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Rent Price:</p>
              <p>₹{totalRent}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Tax: (5% of rent)</p>
              <p>₹{taxAmount}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="font-semibold">Total:</p>
              <p className="font-semibold">₹{calculateTotal()}</p>
            </div>
          </div>
          {/* Payment Method Selection */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-xl font-semibold mb-4">Select Payment Method:</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="deposit"
                  name="paymentMethod"
                  value="Deposit"
                  checked={paymentMethod === "Deposit"}
                  onChange={() => handlePaymentMethodChange("Deposit")}
                />
                <label htmlFor="deposit" className="ml-2">Deposit Amount</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="total"
                  name="paymentMethod"
                  value="Total"
                  checked={paymentMethod === "Total"}
                  onChange={() => handlePaymentMethodChange("Total")}
                />
                <label htmlFor="total" className="ml-2">Total Amount</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentMethod"
                  value="CashOnDelivery"
                  checked={paymentMethod === "CashOnDelivery"}
                  onChange={() => handlePaymentMethodChange("CashOnDelivery")}
                />
                <label htmlFor="cashOnDelivery" className="ml-2">Pay on Delivery</label>
              </div>
            </div>
            {renderPayButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
