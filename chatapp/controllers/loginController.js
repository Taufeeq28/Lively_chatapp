const bcrypt = require("bcryptjs");
const { User, validateLogin } = require("../models/userModel.js");

const loginController = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid Email" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    if (!user.verified) {
      return res.status(400).send({ message: "User doesn't exist" });
    }

    const token = user.generateAuthToken();
    res.status(200).cookie("authToken", token, {
      httpOnly: false,
      sameSite: "none",
      domain: process.env.NODE_ENV === "production" ? "lively-chatapp-backend.vercel.app" : "localhost", // Update this to match your domain
      secure: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    }).send({ message: "Login successful", status: 200 });
  }
   catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = loginController;
// const bcrypt = require("bcryptjs");
// const { User, validateLogin } = require("../models/userModel.js");

// const loginController = async (req, res) => {
//   try {
//     console.log("Login attempt with body:", req.body);

//     const { error } = validateLogin(req.body);
//     if (error) {
//       console.log("Validation Error:", error.details[0].message);
//       return res.status(400).send({ message: error.details[0].message });
//     }

//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       console.log("Invalid Email");
//       return res.status(401).send({ message: "Invalid Email" });
//     }

//     const validPassword = await bcrypt.compare(req.body.password, user.password);
//     if (!validPassword) {
//       console.log("Invalid Password");
//       return res.status(401).send({ message: "Invalid Password" });
//     }

//     if (!user.verified) {
//       console.log("User not verified");
//       return res.status(400).send({ message: "User doesn't exist" });
//     }

//     // Generate token
//     const token = user.generateAuthToken();
//     console.log("Generated token:", token);
//     console.log("Environment:", process.env.NODE_ENV);

//     // Set cookie with the token
//     res.status(200).cookie("authToken", token, {
//       httpOnly: true,
//       sameSite: "none",
//       secure: process.env.NODE_ENV === "production", // Use secure flag only in production
//       expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//       domain: process.env.NODE_ENV === "production" ? ".lively-chatapp-backend.vercel.app" : "localhost", // Update this to match your domain
//       path: "/",
//     }).send({ message: "Login successful", status: 200 });
//     console.log("Token set successfully:", token);
//   } catch (error) {
//     console.error("Error in loginController:", error);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// };

// module.exports = loginController;
