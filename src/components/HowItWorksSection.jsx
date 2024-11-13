import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    step: 1,
    title: "Create A Profile",
    description:
      "Create your profile in seconds with our easy sign-up. Don't forget to add a photo!",
    icon: "fas fa-user-plus", // Placeholder for the step icon
  },
  {
    step: 2,
    title: "Build A Match",
    description:
      "Build the perfect match with 31 filters, including visual filters for body type and skin tone.",
    icon: "fas fa-female", // Placeholder for the step icon
  },
  {
    step: 3,
    title: "View Match Results",
    description: "Browse matches that are based on your imagination.",
    icon: "fas fa-search", // Placeholder for the step icon
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
          How It Works
        </h2>
        <p className="text-lg lg:text-xl text-gray-700 mb-12">
          Get started on LiiQwise today in 3 simple steps:
        </p>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-12 space-y-8 lg:space-y-0">
          {steps.map((step) => (
            <motion.div
              key={step.step}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 text-center w-full lg:w-1/4"
            >
              <div className="bg-lime-400 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
                {step.step}
              </div>
              <div className="text-5xl mb-4 text-lime-400">
                <i className={step.icon}></i> {/* Step icon */}
              </div>
              <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
        <button className="bg-lime-400 text-white text-xl py-2 px-6 mt-8 rounded-full hover:bg-lime-500 transition-all">
          Find Your Match
        </button>
      </div>
    </section>
  );
};

export default HowItWorksSection;
