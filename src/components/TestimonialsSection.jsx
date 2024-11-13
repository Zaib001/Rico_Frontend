import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Muhamad",
    quote: "I found the one I am looking for.",
    image:
      "https://randomuser.me/api/portraits/men/32.jpg", // Replace this with your image links
  },
  {
    name: "Ismail",
    quote: "We got engaged in Nador, Morocco!",
    image:
      "https://randomuser.me/api/portraits/men/58.jpg", // Replace this with your image links
  },
  {
    name: "Ruh",
    quote: "Met my wife(!) through Musilma, Alhamdulillah.",
    image:
      "https://randomuser.me/api/portraits/women/32.jpg", // Replace this with your image links
  },
  {
    name: "Adis",
    quote: "Allah guided us both halfway across the globe to find each other.",
    image:
      "https://randomuser.me/api/portraits/men/33.jpg", // Replace this with your image links
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
          Members Who Have Found Love
        </h2>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-lg p-6 text-center w-full lg:w-1/4 mb-8 lg:mb-0"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
              />
              <p className="text-lg italic text-gray-700 mb-2">
                "{testimonial.quote}"
              </p>
              <p className="text-lime-400 font-semibold">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
        <button className="bg-lime-400 text-white text-xl py-2 px-6 mt-8 rounded-full hover:bg-lime-500 transition-all">
          Read Testimonials
        </button>
      </div>
    </section>
  );
};

export default TestimonialsSection;
