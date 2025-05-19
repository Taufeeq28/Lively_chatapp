import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const SelectAvatar = ({ setSelectedLink, selectedLink }) => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get("/api/avatar/all");
        setAvatars(response.data.avatars);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };

    fetchAvatars();
  }, []);

  return (
    <div className="mt-3">
      <p className="text-lg font-medium text-white mb-2">Choose Avatar</p>
      <div className="grid grid-cols-4 gap-2 mb-7">
        {avatars.map((avatar) => (
          <img
            key={avatar._id}
            src={avatar.link}
            alt={`Avatar ${avatar._id}`}
            onClick={() => setSelectedLink(avatar.link)}
            className={`rounded-full cursor-pointer p-2 bg-primary ${
              selectedLink === avatar.link ? "outline outline-2 outline-indigo-400" : ""
            }`}
            style={{ width: "90px", height: "90px", margin: "5px" }}
          />
        ))}
      </div>
    </div>
  );
};

SelectAvatar.propTypes = {
  setSelectedLink: PropTypes.func.isRequired,
  selectedLink: PropTypes.string.isRequired,
};

export default SelectAvatar;
