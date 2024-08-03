// Nav.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Nav = () => {
  const { logout, isAuthenticated } = useAuth();
  const [isMobile, setIsMobile] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <button
        onClick={() => setIsMobile(!isMobile)}
        className="flex fixed top-6 h-8 lg "
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
        <header className="fixed h-screen w-[150px] z-40 lg:static lg:mr-2 p-8 bg-black  flex flex-col lg:gap-6">
          <Link
            
            className="flex gap-2 items-center justify-center border-b-[1px] border-gray-600 pb-6 lg:mb-6"
            onClick={() => setIsMobile(false)}
          >
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Swift Logo" />
            <span className="font-semibold text-xl mr-2">Lively</span>
          </Link>
          <nav className="h-full flex flex-col my-4 justify-between">
            <div className="flex flex-col gap-5">
            <Link to="/" className="flex gap-1">
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
    d="M3 12l7.5-7.5 7.5 7.5V19.5A1.5 1.5 0 0116.5 21h-9A1.5 1.5 0 016 19.5V12z"
  />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9.75 21v-6h4.5v6"
  />
</svg>

                <span>Home</span>
              </Link>
              <Link to="/profile" className="flex items-end gap-1 lg:gap-2">
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
                    d="M15.75 6.75a3 3 0 11-7.5 0 3 3 0 017.5 0zm-11.25 12v-1.5a5.25 5.25 0 015.25-5.25h4.5a5.25 5.25 0 015.25 5.25v1.5"
                  />
                </svg>
                <span>Profile</span>
              </Link>
              <Link to="/chathome" className="flex gap-1">
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
                    d="M3 8.25C3 7.007 4.007 6 5.25 6h13.5c1.243 0 2.25 1.007 2.25 2.25v7.5C21 17.243 19.993 18 18.75 18H5.25A2.25 2.25 0 013 15.75V8.25z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8.25V15.75C3 17.243 4.007 18 5.25 18H6L10.38 21.38C10.712 21.68 11.288 21.68 11.62 21.38L16 18H18.75C19.993 18 21 17.243 21 15.75V8.25C21 7.007 19.993 6 18.75 6H5.25A2.25 2.25 0 003 8.25z"
                  />
                </svg>
                <span>Chats</span>
              </Link>

            </div>
            <Link className="flex items-end gap-1 mb-14">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-7.5A2.25 2.25 0 003.75 5.25v13.5A2.25 2.25 0 006 21h7.5a2.25 2.25 0 002.25-2.25V15M12 9l-4 4m0 0l4 4m-4-4h12.75"
                />
              </svg>
              <button onClick={logout}>Logout</button>
            </Link>
          </nav>
        </header>
      )}
    </>
  );
};

Nav.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Nav;
