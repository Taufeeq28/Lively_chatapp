import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await sendEmailVerification(userCredential.user);
      const idToken = await userCredential.user.getIdToken();

      await axios.post(
        "/api/user/create-mongo",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          avatarLink: "",
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      toast.success("Verification email sent. Please check your inbox.");
      navigate("/emailsent");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email is already registered.");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <section className="bg-dark min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white">
          Create an account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Your email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              placeholder="name@company.com"
              required
            />
            {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">First Name</label>
              <input
                type="text"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-black bg-[#9e9fff] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Create an account
          </button>
        </form>
        <p className="text-sm font-light text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
