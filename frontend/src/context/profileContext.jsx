import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useAuth } from "./authContext";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user || !isAuthenticated) return;

      try {
        // Get Firebase ID token
        const token = await user.getIdToken();

        const response = await axios.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details in profile", error);
      }
    };

    fetchUserDetails();
  }, [user, isAuthenticated]);

  return (
    <ProfileContext.Provider value={{ isAuthenticated, userDetails }}>
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useProfile = () => useContext(ProfileContext);
