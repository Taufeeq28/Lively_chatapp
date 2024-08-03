import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const ChatMessages = ({ messages, userDetails, selectedUserId }) => {
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (container) {
      // Set the container scrollTop to the scrollHeight with smooth behavior
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, messagesContainerRef]);

  return (
    <div
      className="absolute bottom-24 w-full px-7 lg:px-20 left-1/2 transform -translate-x-1/2 overflow-y-auto max-h-[70vh]"
      ref={messagesContainerRef}
    >
      {!!selectedUserId && (
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`text-white ${
                message.sender !== userDetails._id
                  ? "bg-blue-500 self-start rounded-r-2xl"
                  : "bg-gray-700 self-end rounded-l-2xl"
              } relative group rounded-b-2xl px-5 py-3`}
            >
              <div
                style={{ wordWrap: "break-word" }}
                className="flex flex-wrap max-w-[500px] overflow-hidden"
              >
                {message.text}
              </div>
              <div
                className={`absolute top-0 w-0 h-0 ${
                  message.sender !== userDetails._id
                    ? "border-r-blue-500 -left-4 border-r-[20px]"
                    : "border-l-gray-700 -right-4 border-l-[20px]"
                } border-b-[20px] border-b-transparent`}
              ></div>
            </div>
          ))}
        </div>
      )}
      {selectedUserId && !messages.length && (
        <div className="text-gray-500 flex items-center justify-center py-6">
          Start a conversation
        </div>
      )}
    </div>
  );
};

ChatMessages.propTypes = {
  messages: PropTypes.array.isRequired,
  userDetails: PropTypes.object.isRequired,
  selectedUserId: PropTypes.string,
};

export default ChatMessages;
