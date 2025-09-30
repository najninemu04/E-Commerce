import React from "react";
import Container from "../components/Container";
import aboutImg1 from "../assets/product.png"; 
import aboutImg2 from "../assets/pr10.png";

const About = () => {
  return (
    <div className="mt-[124px] mb-[60px]">
      <Container>
        {/* Header */}
        <h1 className="text-[50px] font-bold text-primary font-dm mb-2 text-center lg:text-left">
          About
        </h1>
        <p className="text-gray-500 mb-8 text-center lg:text-left">
          Home &gt; About
        </p>

        {/* Two Images Side by Side */}
        <div className="flex flex-col sm:flex-row justify-center mb-6 sm:gap-2 gap-2">
          {[aboutImg1, aboutImg2].map((img, index) => (
            <div
              key={index}
              className="relative w-full sm:w-[400px] h-[450px] rounded-lg overflow-hidden group mx-auto"
            >
              <img
                src={img}
                alt={`About ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Small Black Box in Center */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black px-4 py-2 text-white font-semibold text-lg rounded">
                Our Stores
              </div>
            </div>
          ))}
        </div>

        {/* Description below images */}
        <p className="text-gray-700 text-lg mb-8 text-center max-w-4xl mx-auto font-bold">
  Orebi is one of the world’s leading ecommerce brands and is internationally recognized for celebrating the essence of classic Worldwide cool looking style.
</p>


        {/* Our Vision, Our Story, Our Brands */}
        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          <div className="flex-1 bg-gray-100 p-6 rounded-lg text-center hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
          <div className="flex-1 bg-gray-100 p-6 rounded-lg text-center hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Our Story</h3>
            <p className="text-gray-600 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
          <div className="flex-1 bg-gray-100 p-6 rounded-lg text-center hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Our Brands</h3>
            <p className="text-gray-600 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
