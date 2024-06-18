import mongoose, { mongo } from "mongoose";
let connected: boolean = false;
export async function connectDB() {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("MongoDB already connected");
  }

  const mongoUri: string | undefined = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.log("MongoDB URI not found");
    return;
  }
  // connect to mongodb
  try {
    await mongoose.connect(mongoUri);
    connected = true;
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err);
  }
}
