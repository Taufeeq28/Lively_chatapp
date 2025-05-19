import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Chat/Nav";
import { useProfile } from "../context/profileContext";
import SelectAvatar from "./SelectAvatar";

const Profile = () => {
  const { userDetails } = useProfile();
  const [formData, setFormData] = useState({});
  const [selectedLink, setSelectedLink] = useState("");

  useEffect(() => {
    if (userDetails) {
      setFormData({
        firstName: userDetails.firstName || "",
        lastName: userDetails.lastName || "",
      });
      setSelectedLink(userDetails.avatarLink || "");
    }
  }, [userDetails]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/user/profile/update", {
        ...formData,
        avatarLink: selectedLink,
      });
      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex h-full min-h-screen bg-background">
      <Nav />
      <div className="bg-background w-[91%] flex items-center justify-center">
        <div className="max-w-xl mx-auto">
          <h2 className="mb-4 text-2xl font-bold text-white">Update Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6">
              <div>
                <label htmlFor="firstName" className="text-sm text-white">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="text-sm text-white">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="text-sm text-white">Email</label>
                <input
                  type="email"
                  id="email"
                  value={userDetails?.email || ""}
                  disabled
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5"
                />
              </div>
              <div className="sm:col-span-2">
                <SelectAvatar setSelectedLink={setSelectedLink} selectedLink={selectedLink} />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-2.5"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
