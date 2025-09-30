import React, { useState } from "react";
import Container from "../components/Container";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cartDetails.cartItems);

  const [formData, setFormData] = useState({
    firstName: "",
    company: "",
    country: "",
    street: "",
    city: "",
    postcode: "",
    phone: "",
    email: "",
    coupon: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Submitted", formData);
    alert("Order Placed Successfully!");
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.cartQun,
    0
  );

  const discount = formData.coupon ? subtotal * 0.1 : 0; // Example: 10% discount if coupon applied
  const total = subtotal - discount;

  return (
    <div className="mt-[80px] mb-[80px] font-dm">
      <Container>
        {/* Page Title */}
        <h1 className="text-5xl font-bold text-primary mb-2">Checkout</h1>

        {/* Breadcrumb */}
        <p className="text-gray-500 mb-6">Home &gt; Checkout</p>

        {/* Coupon Section */}
        <div className="bg-[#F5F5F5] p-4 mb-8 rounded">
          <p className="text-gray-700 cursor-pointer">
            Have a coupon?{" "}
            <span className="text-primary font-bold">
              Click here to enter your code
            </span>
          </p>
          <input
            type="text"
            name="coupon"
            value={formData.coupon}
            onChange={handleChange}
            placeholder="Enter coupon code"
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Billing Details */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Billing Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { label: "First Name*", name: "firstName", required: true },
                { label: "Company Name (Optional)", name: "company" },
                { label: "Country*", name: "country", required: true },
                { label: "Street Address*", name: "street", required: true },
                { label: "Town/City*", name: "city", required: true },
                { label: "Postcode*", name: "postcode", required: true },
                { label: "Phone*", name: "phone", required: true },
                { label: "Email Address*", name: "email", required: true, type: "email" },
              ].map((field, index) => (
                <div key={index} className="flex flex-col">
                  <label className="mb-1 text-gray-600">{field.label}</label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.label}
                    className="border-b border-gray-300 focus:outline-none py-2"
                    required={field.required || false}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded hover:bg-green-600 transition"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="flex-1 border border-gray-300 p-6 rounded bg-[#fafafa]">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Discount</p>
              <p>${discount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
