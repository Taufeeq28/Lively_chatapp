const admin = require("../firebase");
const path = require("path");


async function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next(); // proceed to controller
  } catch (error) {
    console.error("Firebase token verification failed:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

module.exports = protect;
