import config from "config";
import mongoose from "mongoose";
import log from "./logger";
async function connectToDb() {
  const databaseUrl = config.get<string>("dbUrl");

  try {
    await mongoose.connect(databaseUrl);
    log.info("Connect to the database");
  } catch (error) {
    process.exit(1);
  }
}

export default connectToDb;
