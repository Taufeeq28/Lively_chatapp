import { Link } from "react-router-dom";
//import hero from "../assets/react.svg";
import lottieFile from '../assets/lotti.json';
import { useAuth } from "../context/authContext";
import AnimationLottie from "./helper/animation-lottie";

const Hero = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <section className="">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:grid-cols-12 lg:gap-8 xl:gap-0 lg:py-16">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
            Lively Chat: Instant Connections, Effortless Conversations
          </h1>
          <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl">
            Connect Seamlessly, Chat Effortlessly: Elevate Your Communication
            with Our Intuitive Chat Application!
          </p>
          {!isAuthenticated && (
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Login
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12.707V11h2.293l-3.293 3.293-1.414-1.414L11.586 11H9V5.293l-1.707 1.707L6 6l4-4 4 4-1.293 1.293L11 5.293z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/chathome"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
            >
              Chat Home
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8zm4.707-1.707a1 1 0 011.414-1.414L10 9.586l1.879-1.879a1 1 0 011.414 1.414L10 12.414l-2.879-2.879z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          )}
          {!isAuthenticated && (
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-5 py-3 ml-3 text-base font-medium text-center text-gray-900 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Register
            </Link>
          )}
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <AnimationLottie animationPath={lottieFile} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
