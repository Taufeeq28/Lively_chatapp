// ✅ .env must include required Mongo URI, PORT, Firebase secrets
require("dotenv").config();
require("./firebase");

const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

// ✅ Define allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
  "https://lively-chatapp-frontend.vercel.app"
];

// ✅ Setup CORS
const corsOptions = {
  origin: (origin, callback) => {
    console.log("CORS Origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

// ✅ Apply CORS globally
app.use(cors(corsOptions));
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Database and routing setup
const connection = require("./db/db.js");
const userRoute = require("./routes/userRoute.js");
const avatarRoute = require("./routes/avatarRoute.js");
const createWebSocketServer = require("./wsServer.js");

connection(); // Connect MongoDB

// ✅ API routes
app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);

// ✅ Health check
app.get("/health", (req, res) => {
  res.send("Server is running");
});

// ✅ Debug route for CORS testing
app.get("/cors-test", (req, res) => {
  console.log("✔ /cors-test hit from:", req.headers.origin);
  res.set("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.set("Access-Control-Allow-Credentials", "true");
  res.send("CORS is working");
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

// ✅ Start server
const port = process.env.PORT || 8000;
const server = http.createServer(app);
createWebSocketServer(server);

server.listen(port, () => {
  console.log(`✅ Application is running on port ${port}`);
});
