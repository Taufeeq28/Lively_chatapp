import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chathome");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      if (!user.emailVerified) {
        toast.error("Please verify your email before logging in.");
        return;
      }

      toast.success("Logged in successfully");
      navigate("/chathome");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="bg-dark min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <h1 className="text-xl font-bold leading-tight text-white">Sign in to your account</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="border rounded-lg w-full p-2.5 bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="border rounded-lg w-full p-2.5 bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-400 text-black font-medium rounded-lg px-5 py-2.5"
          >
            Sign in
          </button>
        </form>
        <p className="text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
