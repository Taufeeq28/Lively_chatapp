import { useEffect, useState } from "react";
import { useProfile } from "../context/profileContext";
import axios from "axios";
import ChatMessages from "../components/Chat/ChatMessages";
import MessageInputForm from "../components/Chat/MessageInputForm";
import Nav from "../components/Chat/Nav";
import OnlineUsersList from "../components/Chat/OnlineUserList";
import TopBar from "../components/Chat/TopBar";
import { socketUrl } from "../../apiConfig";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // ✅ Import Firebase auth

const ChatHome = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { userDetails } = useProfile();
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // ✅ Redirect unauthenticated users
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  // ✅ Connect to WebSocket
  const connectToWebSocket = async() => {
    const token = await auth.currentUser.getIdToken();
    const ws = new WebSocket(`${socketUrl}?token=${token}`);
  
    ws.addEventListener("message", handleMessage);
    setWs(ws);
  };

  useEffect(() => {
    if (userDetails) {
      connectToWebSocket();
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [userDetails, selectedUserId]);

  // ✅ Fetch messages for selected chat
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUserId) {
        try {
          const token = await auth.currentUser.getIdToken();
          const res = await axios.get(`/api/user/messages/${selectedUserId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setMessages(res.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [selectedUserId]);

  // ✅ Fetch all people (offline list)
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const token = await auth.currentUser.getIdToken();
        const res = await axios.get("/api/user/people", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const offlinePeopleArr = res.data
          .filter((p) => p._id !== userDetails?._id)
          .filter((p) => !onlinePeople[p._id]);

        setOfflinePeople(
          offlinePeopleArr.reduce((acc, p) => {
            acc[p._id] = p;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };

    if (userDetails) {
      fetchPeople();
    }
  }, [onlinePeople, userDetails]);

  // ✅ Handle incoming WebSocket messages
  useEffect(() => {
    const handleRealTimeMessage = (event) => {
      const messageData = JSON.parse(event.data);

      if ("text" in messageData) {
        setMessages((prev) => [...prev, { ...messageData }]);
      }
    };

    if (ws) {
      ws.addEventListener("message", handleRealTimeMessage);
    }

    return () => {
      if (ws) {
        ws.removeEventListener("message", handleRealTimeMessage);
      }
    };
  }, [ws, selectedUserId]);

  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId, username, avatarLink }) => {
      if (userId !== userDetails?._id) {
        people[userId] = { username, avatarLink };
      }
    });
    setOnlinePeople(people);
  };

  const handleMessage = (ev) => {
    const messageData = JSON.parse(ev.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      if (messageData.sender === selectedUserId) {
        setMessages((prev) => [...prev, { ...messageData }]);
      }
    }
  };

  const sendMessage = (ev) => {
    if (ev) ev.preventDefault();
    if (!newMessage.trim()) return;

    ws.send(JSON.stringify({ text: newMessage, recipient: selectedUserId }));
    setMessages((prev) => [
      ...prev,
      {
        text: newMessage,
        sender: userDetails?._id,
        recipient: selectedUserId,
        _id: Date.now(),
      },
    ]);
    setNewMessage("");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Nav />
      <OnlineUsersList
        onlinePeople={onlinePeople}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        offlinePeople={offlinePeople}
      />
      <section className="w-[71%] lg:w-[62%] relative pb-10">
        {selectedUserId && (
          <>
            <TopBar
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              offlinePeople={offlinePeople}
              onlinePeople={onlinePeople}
            />
            <ChatMessages
              messages={messages}
              userDetails={userDetails}
              selectedUserId={selectedUserId}
            />
            <div className="absolute w-full bottom-0 flex justify-center">
              <MessageInputForm
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                sendMessage={sendMessage}
                selectedUserId={selectedUserId}
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default ChatHome;
