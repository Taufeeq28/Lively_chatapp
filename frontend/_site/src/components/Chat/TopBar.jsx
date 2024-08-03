import PropTypes from 'prop-types';

const TopBar = ({ setSelectedUserId, selectedUserId, offlinePeople, onlinePeople }) => {
  const user = onlinePeople[selectedUserId] || offlinePeople[selectedUserId];
  const isOnline = !!onlinePeople[selectedUserId];

  return (
    <div className="flex items-center px-4 py-5 bg-transparent text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 mr-2"
        role="button"
        onClick={() => setSelectedUserId(null)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
      <span className="flex items-center ">
        {user?.username || user?.firstName}{" "}
        <span
          className={`ml-2 w-2 h-2 rounded-full ${
            isOnline ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
      </span>
    </div>
  );
};

TopBar.propTypes = {
  setSelectedUserId: PropTypes.func.isRequired,
  selectedUserId: PropTypes.string,
  offlinePeople: PropTypes.object.isRequired,
  onlinePeople: PropTypes.object.isRequired,
};

export default TopBar;
