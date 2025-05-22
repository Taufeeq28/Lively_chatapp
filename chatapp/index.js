require("dotenv").config();
require("./firebase");

const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
  "https://lively-chatapp-frontend.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// ✅ Manually respond to preflight (fix for CORS error on OPTIONS)
app.options("*", cors(corsOptions));

const connection = require("./db/db.js");
const userRoute = require("./routes/userRoute.js");
const avatarRoute = require("./routes/avatarRoute.js");
const createWebSocketServer = require("./wsServer.js");



// ✅ Connect MongoDB
connection();

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ CORS setup (Handles frontend properly avoids 500 on OPTIONS)


// ✅ Routes
app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);

// ✅ Health check route
app.get("/health", (req, res) => {
  res.send("Server is running");
});

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"), (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Error loading frontend");
    }
  });
});

// ✅ Start HTTP server
const port = process.env.PORT || 8000;
const server = http.createServer(app);

// ✅ Attach WebSocket server
createWebSocketServer(server);

server.listen(port, () => {
  console.log(`✅ Application is running on port ${port}`);
});
