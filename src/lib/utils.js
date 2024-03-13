import mongoose from "mongoose";

let isConnected = false; // track the connection
const uril = process.env.MONGODB_URL;

export const connectTODb = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("=> Mongodb is already connected ");
    return;
  }
  try {
    await mongoose.connect(uril, {
      dbName: "lamaDevNExtFull",
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("=> Connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};
