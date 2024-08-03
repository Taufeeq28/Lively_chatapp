import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const navigate = useNavigate(); // Hook for navigation
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/user/register";
      const { data: res } = await axios.post(url, data);
      console.log(res.message);
      toast.success("Verification link sent to your email."); // Display success message
      navigate("/emailsent"); // Navigate to EmailSent component
      setErrorMessage("");
    } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrorMessage("User already exists");
        } else if (
          error.response &&
          error.response.status >= 300 &&
          error.response.status <= 500
        ) {
          setErrorMessage(error.response.data.message);
        }
      }
  };

  return (
    <section className="bg-dark min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white">
          Create an account
        </h1>
        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="email">
              Your email
            </label>
            <input
              onChange={handleChange}
              value={data.email}
              type="email"
              name="email"
              id="email"
              className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
              placeholder="name@company.com"
              required=""
            />
              {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="firstName">
                First Name
              </label>
              <input
                onChange={handleChange}
                value={data.firstName}
                type="text"
                name="firstName"
                id="firstName"
                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                placeholder="John"
                required=""
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="lastName">
                Last Name
              </label>
              <input
                onChange={handleChange}
                value={data.lastName}
                type="text"
                name="lastName"
                id="lastName"
                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                placeholder="Doe"
                required=""
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleChange}
              value={data.password}
              type="password"
              name="password"
              id="password"
              className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
              placeholder="••••••••"
              required=""
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-600 focus:ring-3 focus:ring-primary-500 bg-gray-700"
                required=""
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-light text-gray-300">
                I accept the{" "}
                <a
                  className="font-medium text-indigo-400 hover:underline"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-black bg-[#9e9fff] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
          >
            Create an account
          </button>
        </form>
        <p className="text-sm font-light text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-indigo-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
