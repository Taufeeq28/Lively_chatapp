import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "./pages/VerifyEmail";
import { AuthProvider, useAuth } from "./context/authContext";
import axios from "axios";
import ChatHome from "./pages/ChatHome";
import { ProfileProvider } from "./context/profileContext";
import Profile from "./components/Profile";
import { baseUrl } from "../apiConfig.js";
import EmailSent from "./pages/EmailSent.jsx";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ import protected route

// Layout wrapper
const Layout = () => {
  const { loading } = useAuth();

  if (loading) return <p>Loading...</p>; // ✅ Firebase auth is initializing

  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

// React Router Setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "emailsent",
        element: <EmailSent />,
      },
      {
        path: "users/:id/verify/:token",
        element: <VerifyEmail />,
      },
      {
        path: "chathome",
        element: (
          <ProtectedRoute>
            <ChatHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

// Root App
function App() {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.withCredentials = true;

  return (
    <AuthProvider>
      <ProfileProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
