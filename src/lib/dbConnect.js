import mongoose from "mongoose";

// mongoose
const MONGOOSE_URI = 'mongodb://'.concat(process.env.MONGO_HOST, process.env.MONGO_PORT, process.env.MONGO_NAME);
const MONGOOSE_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 10000
};

var cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
};

const dbConnect = async function () {
  if (cached.conn) { return cached.conn; };

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGOOSE_URI, MONGOOSE_OPTIONS).then(mongoose => mongoose);
  };

  cached.conn = await cached.promise
  return cached.conn;
};

export default dbConnect;