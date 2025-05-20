const admin = require("firebase-admin");

if (!admin.apps.length) {
  // Decode base64 env variable and parse it as JSON
  const decodedKey = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, "base64").toString("utf-8");
  const serviceAccount = JSON.parse(decodedKey);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
