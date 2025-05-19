import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Nav = () => {
  const { logout, isAuthenticated, loading } = useAuth();
  const [isMobile, setIsMobile] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <>
      <button
        onClick={() => setIsMobile(!isMobile)}
        className="flex fixed top-6 h-8 lg:hidden z-50 left-4 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {isMobile && (
        <header className="fixed h-screen w-[150px] z-40 lg:static lg:mr-2 p-8 bg-black flex flex-col lg:gap-6">
          <Link
            to="/"
            onClick={() => setIsMobile(false)}
            className="flex gap-2 items-center justify-center border-b border-gray-600 pb-6 lg:mb-6"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Lively Logo"
            />
            <span className="font-semibold text-xl text-white">Lively</span>
          </Link>

          <nav className="h-full flex flex-col my-4 justify-between">
            <div className="flex flex-col gap-5">
              <Link to="/" className="flex gap-1 items-center text-white">
                🏠 <span>Home</span>
              </Link>
              <Link to="/profile" className="flex gap-1 items-center text-white">
                👤 <span>Profile</span>
              </Link>
              <Link to="/chathome" className="flex gap-1 items-center text-white">
                💬 <span>Chats</span>
              </Link>
            </div>
            <div className="mb-14 flex items-end gap-2 text-white">
              <button onClick={logout} className="flex gap-1 items-center">
                🚪 Logout
              </button>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Nav;
