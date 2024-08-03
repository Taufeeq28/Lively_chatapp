const mongoose = require('mongoose');

const cn= async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("DB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log(error);
    console.log("COULD NOT CONNECT TO DB");
  }
};
module.exports =cn;