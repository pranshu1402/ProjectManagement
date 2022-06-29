import logger from "jet-logger";
import mongoose from "mongoose";
import { isEmpty } from "./utility";

const username = process.env.DB_USERNAME || process.argv?.[1];
const password = process.env.DB_PASSWORD || process.argv?.[2];
const databaseName = process.env.DB_NAME || "projectManagement";

// eslint-disable-next-line max-len
const connectionString = `mongodb+srv://${username}:${password}@cluster0.9mevd.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const createDBConnection = async () => {
  if (isEmpty(username) || isEmpty(password)) {
    logger.err("No credentials found to connect with DB");
    return;
  }

  mongoose.connection.on("connected", () => {
    logger.info("Connected to database");
  });

  mongoose.connection.on("error", (err) => {
    logger.info("Error: Connecting to database failed," + err.message);
  });

  return mongoose.connect(connectionString);
};

export default createDBConnection;
