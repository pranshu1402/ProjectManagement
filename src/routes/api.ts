import { Router } from "express";
import projectRouter from "./projects";
import taskRouter from "./tasks";

// Export the base-router
const baseRouter = Router();

// Setup routers for all routes
baseRouter.use("/project", projectRouter);
baseRouter.use("/tasks", taskRouter);

export default baseRouter;
