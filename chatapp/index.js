require("dotenv").config();
require("./firebase");

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

// ✅ Connect MongoDB
connection();

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
  "https://lively-chatapp-frontend.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log("CORS request from origin:", origin);
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
app.options("*", cors(corsOptions)); // ✅ Handle all OPTIONS preflight requests

// ✅ Logging middleware (for debugging on Vercel)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// ✅ JSON & Cookie Parsers
app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);

// ✅ Health Check
app.get("/health", (req, res) => {
  res.send("Server is running");
});

// ✅ Serve Frontend
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"), (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Error loading frontend");
    }
  });
});

// ✅ Catch-all OPTIONS fallback for Vercel (safety net)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    next();
  }
});

// ✅ Start HTTP server and WebSocket
const port = process.env.PORT || 8000;
const server = http.createServer(app);
createWebSocketServer(server);

server.listen(port, () => {
  console.log(`✅ Application is running on port ${port}`);
});
