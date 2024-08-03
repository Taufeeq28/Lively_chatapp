const bcrypt = require("bcrypt");
const { User, validateRegister } = require("../models/userModel.js");
const { Token } = require("../models/tokenModel.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");

const registerController = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user && user.verified) {
      return res.status(409).send({ message: "User with given email already exists" });
    }
    if (user && user.verificationLinkSent) {
      return res.status(409).send({ message: "A verification link has been already sent to this email" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    user = await new User({ ...req.body, password: hashPassword }).save();

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    }).save();

    const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    user.verificationLinkSent = true;
    await user.save();
    res.status(201).send({ message: `Verification Email Sent to ${user.email}` });
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = registerController;
// const bcrypt = require("bcrypt");
// const { User, validateRegister } = require("../models/userModel.js");
// const { Token } = require("../models/tokenModel.js");
// const sendEmail = require("../utils/sendEmail.js");
// const crypto = require("crypto");

// const registerController = async (req, res) => {
//   console.log("Received request:", req.body); // Debugging line
//   try {
//     const { error } = validateRegister(req.body);
//     if (error) {
//       console.log("Validation error:", error.details[0].message); // Debugging line
//       return res.status(400).send({ message: error.details[0].message });
//     }

//     let user = await User.findOne({ email: req.body.email });
//     if (user && user.verified) {
//       console.log("User already exists and verified."); // Debugging line
//       return res.status(409).send({ message: "User with given email already exists" });
//     }
//     if (user && user.verificationLinkSent) {
//       console.log("Verification link already sent."); // Debugging line
//       return res.status(409).send({ message: "A verification link has been already sent to this email" });
//     }

//     const salt = await bcrypt.genSalt(Number(process.env.SALT));
//     console.log("Generated salt:", salt); // Debugging line
//     const hashPassword = await bcrypt.hash(req.body.password, salt);
//     console.log("Hashed password:", hashPassword); // Debugging line
//     user = await new User({ ...req.body, password: hashPassword }).save();
//     console.log("User saved:", user); // Debugging line

//     // If using tokens
//     // const token = await new Token({
//     //   userId: user._id,
//     //   token: crypto.randomBytes(16).toString("hex"),
//     //   createdAt: Date.now(),
//     //   expiresAt: Date.now() + 3600000,
//     // }).save();
//     // console.log("Token generated and saved:", token); // Debugging line

//     res.status(201).send({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error in registerController:", error);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// };

// module.exports = registerController;
