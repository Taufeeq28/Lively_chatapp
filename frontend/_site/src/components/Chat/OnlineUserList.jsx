import { useState } from "react";
import PropTypes from "prop-types";
import Contact from "./Contact";

const OnlineUsersList = ({
  onlinePeople,
  offlinePeople,
  selectedUserId,
  setSelectedUserId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOnlinePeople = Object.keys(onlinePeople).filter((userId) => {
    const username = onlinePeople[userId].username || "";
    return username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredOfflinePeople = Object.keys(offlinePeople).filter((userId) => {
    const { firstName, lastName } = offlinePeople[userId];
    const fullName = `${firstName} ${lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <section className="w-[29%] py-3 border-r px-2 lg:px-4 border-[#000000]">
      <div className="text-white flex items-center gap-2 p-1 px-2">
      <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="currentColor"
  className="w-6 h-6 text-gray-400"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M15.5 15.5L19 19m-9.5-3.5a7 7 0 1 1 7-7 7 7 0 0 1-7 7z"
  />
</svg>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent outline-none text-gray-400"
        />
      </div>
      <div className="mt-4 max-h-[85vh] overflow-auto no-scrollbar">
        {filteredOnlinePeople.map((userId) => {
          const { username, avatarLink } = onlinePeople[userId];
          console.log(userId);
          return (
            <Contact
              key={userId}
              userId={userId}
              username={username}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              isOnline={true}
              avatarLink={avatarLink} // Include avatarLink for avatars
            />
          );
        })}
        {filteredOfflinePeople.map((userId) => {
          const { _id, firstName, lastName, avatarLink } = offlinePeople[userId];
          return (
            <Contact
              key={_id}
              userId={_id}
              username={`${firstName} ${lastName}`}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              isOnline={false}
              avatarLink={avatarLink}
            />
          );
        })}
      </div>
    </section>
  );
};

OnlineUsersList.propTypes = {
  onlinePeople: PropTypes.object.isRequired,
  offlinePeople: PropTypes.object.isRequired,
  selectedUserId: PropTypes.string.isRequired,
  setSelectedUserId: PropTypes.func.isRequired,
};

export default OnlineUsersList;
