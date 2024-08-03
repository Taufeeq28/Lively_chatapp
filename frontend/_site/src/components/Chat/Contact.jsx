import PropTypes from "prop-types"; // Import PropTypes
import Avatar from "./Avatar";

const Contact = ({
  userId,
  username,
  selectedUserId,
  setSelectedUserId,
  isOnline,
  avatarLink,
}) => {
  return (
    <li
      key={userId}
      className={`${
        selectedUserId === userId ? "bg-primary" : ""
      } flex items-center gap-3 py-2 lg:py-3 px-2 lg:px-5 rounded-[1.3rem] cursor-pointer`}
      onClick={() => {
        setSelectedUserId(userId);
      }}
    >
      <Avatar
        userId={userId}
        username={username}
        isOnline={isOnline}
        avatarLink={avatarLink}
      />
      <div className="flex-1">
        <span className="text-xs lg:text-base text-white">
          {username}
        </span>
        {isOnline && (
          <span
            className="text-xs ml-2 text-green-500"
          >
            ●
          </span>
        )}
      </div>
    </li>
  );
};

Contact.propTypes = {
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  selectedUserId: PropTypes.string,
  setSelectedUserId: PropTypes.func.isRequired,
  isOnline: PropTypes.bool,
  avatarLink: PropTypes.string,
};

export default Contact;
