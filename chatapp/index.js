require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const cookieParser = require("cookie-parser");
const connection = require("./db/db.js");
const userRoute = require("./routes/userRoute.js");
const avatarRoute = require("./routes/avatarRoute.js");
const createWebSocketServer = require("./wsServer.js");

const app = express();

// Database connection
connection();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
  "https://lively-chatapp-backend.vercel.app",
  "https://lively-chatapp-frontend.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true, // Allow credentials like cookies
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Routes
app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);

// Health check route
app.get("/health", (req, res) => {
  res.send("Server is running");
});

// Serve static files
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend/dist/index.html"), (err) => {
    if (err) {
      console.error("Error sending file:", err);
    }
  });
});
//abcd
// Create HTTP server
const port = process.env.PORT || 8000;
const server = http.createServer(app);

// Initialize WebSocket server
createWebSocketServer(server);

server.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
