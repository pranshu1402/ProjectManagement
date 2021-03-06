import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import express, { NextFunction, Request, Response } from "express";

import apiRouter from "./routes/api";
import logger from "jet-logger";

import StatusCodes from "http-status-codes";
import "express-async-errors";
import { CustomError } from "@shared/errors";

// Constants
const app = express();

/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.origin,
  })
);

// Show routes called in console during development
if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "local"
) {
  app.use(morgan("dev"));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/
// route setup
app.use("/api", apiRouter);

// Error handling
app.use(
  (err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err, true);
    const status =
      err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST;
    return res.status(status).json({
      status,
      message: err.message,
    });
  }
);

export default app;
