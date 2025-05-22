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

// ✅ Define CORS options before everything
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
  "https://lively-chatapp-frontend.vercel.app"
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log("🔄 CORS request from origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

// ✅ Apply middlewares in correct order
app.use(cors(corsOptions));                 // CORS must come before routes
app.options("*", cors(corsOptions));        // Handle preflight OPTIONS

app.use(express.json());                    // JSON parser
app.use(cookieParser());                    // Cookie parser

// ✅ Connect MongoDB
connection();

// ✅ API Routes
app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);

// ✅ Health check
app.get("/health", (req, res) => {
  res.send("Server is running");
});

// ✅ Static frontend (after API)
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));
app.get("/*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "frontend", "dist", "index.html"),
    (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Error loading frontend");
      }
    }
  );
});

// ✅ Start HTTP + WebSocket server
const port = process.env.PORT || 8000;
const server = http.createServer(app);
createWebSocketServer(server);

server.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
