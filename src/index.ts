import "./config"; // Must be the first import
import createDBConnection from "@shared/createConnection";
import server from "./server";
import logger from "jet-logger";

const serverStartMsg = "Express server started on port: ",
  port = process.env.PORT || 3001;

/* ************ Start server ************ */
createDBConnection()
  .then(() => {
    server.listen(port, () => {
      logger.info(serverStartMsg + port);
    });
  })
  .catch((err) => {
    logger.info("Unable to start server: " + err.message);
  });
