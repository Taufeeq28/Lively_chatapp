
import PropTypes from "prop-types";

const MessageInputForm = ({
  selectedUserId,
  newMessage,
  setNewMessage,
  sendMessage,
}) => {
  return (
    <>
      {!!selectedUserId && (
        <form onSubmit={sendMessage} className="relative m-4 w-full">
          <input
            type="search"
            id="search-dropdown"
            className="w-full px-4 py-3 rounded-xl bg-transparent border  text-white placeholder-gray-500"
            placeholder="Your Message"
            value={newMessage}
            onChange={(ev) => setNewMessage(ev.target.value)}
            required
          />
          <button
            type="submit"
            className="absolute end-0 bg-transparent aspect-square h-10 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
          <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.2}
  stroke="currentColor"
  className="w-6 h-6 text-white"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M2.273 20.616L21.727 12 2.273 3.384 2.273 10.575 15.136 12 2.273 13.425z"
  />
</svg>

          </button>
        </form>
      )}
    </>
  );
};

MessageInputForm.propTypes = {
  selectedUserId: PropTypes.any.isRequired, // Change to appropriate type
  newMessage: PropTypes.string.isRequired,
  setNewMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default MessageInputForm;
