const admin = require("../firebase");

async function protect(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // ✅ Handle missing or malformed token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Missing or invalid token format" });
  }

  const idToken = authHeader.replace("Bearer ", "").trim();

  try {
    // ✅ Verify Firebase ID Token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("🔥 Firebase token verification failed:", error.message);
    return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }
}

module.exports = protect;
