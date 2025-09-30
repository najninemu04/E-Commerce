import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import productimg from "../assets/pr10.png";
import ProductRating from "../components/ProductRating";
import { useDispatch } from "react-redux";
import { cartTotal } from "../slice/CartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [singleData, setSingleData] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [featureOpen, setFeatureOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [reviews, setReviews] = useState([
    { name: "John Ford", date: "2025-09-30", rating: 5, text: "Very satisfied, amazing!" },
    { name: "Jane Doe", date: "2025-09-28", rating: 4, text: "Good product overall." },
  ]);

  const getSingleData = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setSingleData(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getSingleData();
  }, [id]);

  const handleAdd = () => {
    if (singleData) {
      dispatch(cartTotal(singleData));
    }
  };

  const handleAddReview = () => {
    const name = document.getElementById("reviewName").value;
    const email = document.getElementById("reviewEmail").value;
    const text = document.getElementById("reviewText").value;
    if (name && email && text) {
      setReviews([
        ...reviews,
        {
          name,
          date: new Date().toLocaleDateString(),
          rating: 5,
          text,
        },
      ]);
      document.getElementById("reviewName").value = "";
      document.getElementById("reviewEmail").value = "";
      document.getElementById("reviewText").value = "";
      setActiveTab("reviews");
    }
  };

  if (!singleData) {
    return <p className="text-center mt-10">Loading product details...</p>;
  }

  const borderStyle = { borderColor: "#D8D8D8" };

  return (
    <div>
      <Container>
        <div className="pt-36 pb-36 max-w-6xl mx-auto">

          {/* Images */}
          <div className="flex flex-wrap justify-between gap-5">
            {singleData.images && singleData.images.length > 0 ? (
              singleData.images.map((img, i) => (
                <img key={i} className="w-[45%] rounded-lg shadow" src={img} alt={`product ${i}`} />
              ))
            ) : (
              <img className="w-[45%] rounded-lg shadow" src={productimg} alt="default product" />
            )}
          </div>

          {/* Title */}
          <div className="mt-12">
            <h4 className="text-4xl font-bold text-primary">{singleData.title}</h4>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-5 mt-4 mb-5">
            <div className="flex text-yellow-400 items-center gap-x-1">
              <ProductRating rating={singleData.rating} />
            </div>
            <p className="text-sm text-gray-500">({singleData.rating}) Reviews: {reviews.length}</p>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-5">
            <p className="text-gray-400 line-through">$88.00</p>
            <p className="font-bold text-xl">${singleData.price}</p>
          </div>

          <hr className="my-6 border" style={borderStyle} />

          {/* Color */}
          <div className="flex items-center space-x-5 my-4 border" style={borderStyle}>
            <p className="font-bold text-primary">Color:</p>
            <div className="flex space-x-3 items-center">
              <div className="h-5 w-5 rounded-full bg-gray-300"></div>
              <div className="h-7 w-7 rounded-full bg-red-300"></div>
              <div className="h-5 w-5 rounded-full bg-green-200"></div>
              <div className="h-5 w-5 rounded-full bg-gray-100"></div>
              <div className="h-5 w-5 rounded-full bg-gray-500"></div>
            </div>
          </div>

          {/* Size */}
          <div className="flex items-center space-x-5 my-4 border" style={borderStyle}>
            <p className="font-bold text-primary">Size:</p>
            <select className="border px-4 py-2 text-gray-700 rounded" style={borderStyle}>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="flex items-center space-x-5 my-4 border" style={borderStyle}>
            <p className="font-bold text-primary">Quantity:</p>
            <div className="flex items-center px-4 py-2 rounded space-x-4" style={borderStyle}>
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
          </div>

          <hr className="my-6 border" style={borderStyle} />

          {/* Status */}
          <div className="flex items-center space-x-5 my-4 border" style={borderStyle}>
            <p className="font-bold text-primary">Status:</p>
            <p className="text-green-600">{singleData.stock > 0 ? "Available" : "Out of Stock"}</p>
          </div>

          {/* Buttons */}
          <div className="flex space-x-5 my-5">
            <button className="py-3 px-6 border font-bold text-primary rounded" style={borderStyle}>
              Add to Wish List
            </button>
            <button
              onClick={handleAdd}
              className="py-3 px-6 border font-bold text-primary rounded" style={borderStyle}
            >
              Add to Cart
            </button>
          </div>

          <hr className="my-6 border" style={borderStyle} />

          {/* Feature & Shipping */}
          <div className="space-y-4">
            <div className="flex justify-between items-center cursor-pointer font-bold" onClick={() => setFeatureOpen(!featureOpen)}>
              <span>FEATURES & DETAILS</span>
              <span>{featureOpen ? "-" : "+"}</span>
            </div>
            <hr style={borderStyle} />
            {featureOpen && <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>}

            <div className="flex justify-between items-center cursor-pointer font-bold" onClick={() => setShippingOpen(!shippingOpen)}>
              <span>SHIPPING & RETURNS</span>
              <span>{shippingOpen ? "-" : "+"}</span>
            </div>
            <hr style={borderStyle} />
            {shippingOpen && <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>}
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 mt-6 border-t pt-4" style={borderStyle}>
            <button
              onClick={() => setActiveTab("description")}
              className={`font-bold ${activeTab === "description" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`font-bold ${activeTab === "reviews" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
            >
              Reviews
            </button>
          </div>

          {/* Tab Contents */}
          {activeTab === "description" && (
            <div className="mt-4 border-t pt-4" style={borderStyle}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

              {/* Add Review */}
              <div className="mt-6">
                <h3 className="font-bold text-lg">Add a Review</h3>
                <hr className="my-2 border" style={borderStyle} />
                <p className="font-semibold">Name</p>
                <input id="reviewName" type="text" className="border p-2 w-full my-2 rounded" style={borderStyle} />
                <p className="font-semibold">Email</p>
                <input id="reviewEmail" type="email" className="border p-2 w-full my-2 rounded" style={borderStyle} />
                <p className="font-semibold">Review</p>
                <textarea id="reviewText" className="border p-2 w-full my-2 rounded" style={borderStyle}></textarea>
                <button
                  onClick={handleAddReview}
                  className="py-2 px-4 bg-primary text-white font-bold rounded hover:bg-orange-600 transition"
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="mt-4 border-t pt-4" style={borderStyle}>
              {reviews.map((rev, index) => (
                <div key={index} className="mb-4 border-b pb-2" style={borderStyle}>
                  <p className="font-bold">
                    {rev.name} <span className="text-yellow-400">{"⭐".repeat(rev.rating)}</span>{" "}
                    <span className="text-sm text-gray-500">{rev.date}</span>
                  </p>
                  <p className="text-gray-700">{rev.text}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
