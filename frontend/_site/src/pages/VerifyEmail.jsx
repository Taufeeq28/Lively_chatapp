import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { id, token } = useParams();
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, checkAuth, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/user/${id}/verify/${token}`);
        toast.success(response.data.message);
        // console.log("Verification successful:", response.data);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  return (
    <div className="bg-dark min-h-screen text-white flex justify-center items-center">
      {loading && (
        <div className="mb-10 flex flex-col items-center" role="status">
          <svg
            aria-hidden="true"
            className="w-20 h-20 animate-spin fill-primarySecond"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0072 33.5074C92.3492 20.5111 80.2062 10.6074 66.0422 8.7802C63.3484 8.39671 61.0118 10.3682 60.6278 13.048C60.2439 15.7278 62.2154 18.0644 64.8956 18.4483C75.2905 19.9975 83.7528 27.0492 87.2851 36.6171C88.1849 39.0806 90.5427 40.5291 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="my-4  text-xl font-medium">Loading...</span>
        </div>
      )}
      {!loading && (
        <span className="my-4 text-xl font-medium">Verification Successful!</span>
      )}
      {!loading && !isAuthenticated && (
        <Link
          to="/login"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default VerifyEmail;
