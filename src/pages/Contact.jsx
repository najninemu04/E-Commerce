import React from "react";
import Container from "../components/Container";

const Contact = () => {
  return (
    <div className="mt-[100px] mb-[100px]">
      <Container>
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Message</label>
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Google Map */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902957989022!2d90.38437971543008!3d23.75090389402569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b1e7b944a3%3A0x3a3e3de29f0a8c0b!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1694688249610!5m2!1sen!2sus"
              width="100%"
              height="100%"
              className="h-full min-h-[400px]"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default Contact;
