// Import necessary libraries and icons
//import React from "react";
import { 
  FaChartLine, 
  FaShieldAlt, 
  FaBusinessTime, 
  FaDollarSign, 
  FaPaintBrush, 
  FaCog 
} from 'react-icons/fa'; // Importing icons from react-icons

const Features = () => {
  return (
    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
            Designed for business teams like yours
          </h2>
          <p className="sm:text-xl text-gray-400">
            Here at Lively we focus on markets where technology, innovation, and
            capital can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-12 lg:space-y-0">
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:w-12 lg:h-12">
              <FaChartLine className="text-white lg:w-6 lg:h-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Marketing</h3>
            <p className="text-gray-400">
              Plan it, create it, launch it. Collaborate seamlessly to align
              your organization and hit your marketing goals every month with
              customized reports and marketing plan.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:w-12 lg:h-12">
              <FaShieldAlt className="text-white lg:w-6 lg:h-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Legal</h3>
            <p className="text-gray-400">
              Protect your organization, devices, and stay compliant with our
              structured workflows and custom permissions made for you.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:w-12 lg:h-12">
              <FaBusinessTime className="text-white lg:w-6 lg:h-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Business Automation</h3>
            <p className="text-gray-400">
              Auto-assign tasks, send Slack messages, and much more. Now you
              have the ability to collaborate with hundreds of new templates to
              help you get started.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:w-12 lg:h-12">
              <FaDollarSign className="text-white lg:w-6 lg:h-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Finance</h3>
            <p className="text-gray-400">
              Audit-proof software built for critical financial operations like
              month-end close and quarterly budgeting.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:w-12 lg:h-12">
              <FaPaintBrush className="text-white lg:w-6 lg:h-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Enterprise Design</h3>
            <p className="text-gray-400">
              Craft beautiful, delightful experiences for both marketing and
              product with real cross-company collaboration.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:w-12 lg:h-12">
              <FaCog className="text-white lg:w-6 lg:h-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Operations</h3>
            <p className="text-gray-400">
              Keep your company’s lights on with customizable, iterative, and
              structured workflows built for all efficient teams and individuals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
