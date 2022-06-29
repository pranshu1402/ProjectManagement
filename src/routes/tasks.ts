import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";

import projectService from "@services/projects";
import { ParamMissingError } from "@shared/errors";
import { IProject, ITask } from "@models/interfaces";
import TaskController from "src/controllers/taskController";

/* Constants */
const taskRouter = Router();
const { CREATED, OK } = StatusCodes;

export const paths = {
  get: "/:projectId/all",
  add: "/:projectId/add/:panelId",
  update: "/:projectId/update",
  delete: "/:projectId/delete/:taskId",
} as const;

/**
 * Get all tasks for a project
 */
taskRouter.get(paths.get, (req: Request, res: Response, next) => {
  const projectId = req.params.projectId;
  if (!projectId) {
    throw new ParamMissingError();
  }

  projectService
    .getById(projectId)
    .then((projectById) =>
      res.status(OK).json({ _id: projectId, tasks: projectById })
    )
    .catch((error) => next(error));
});

/**
 * Add one task
 */
taskRouter.post(paths.add, (req: Request, res: Response, next) => {
  const { data } = req.body;
  const projectId = req.params.projectId;

  // Check param
  if (!data || !projectId) {
    throw new ParamMissingError();
  }

  projectService
    .getById(projectId)
    .then((projectData: IProject) => {
      const panelId = req.params.panelId;
      const dataToUpdate = {
        _id: projectId,
        tasks: TaskController.addTask(
          data as ITask,
          panelId,
          projectData.tasks
        ),
      };

      projectService
        .updateOne(dataToUpdate)
        .then(() =>
          res.status(CREATED).send({ message: "Task added succesfully" })
        );
    })
    .catch((error) => next(error));
});

/**
 * Update one task.
 */
taskRouter.put(paths.update, (req: Request, res: Response, next) => {
  const { data } = req.body;
  const projectId = req.params.projectId;
  // Check params
  if (!data || !projectId) {
    throw new ParamMissingError();
  }

  projectService
    .getById(projectId)
    .then((projectData: IProject) => {
      const dataToUpdate = {
        _id: projectId,
        tasks: TaskController.updateTask(data as ITask, projectData.tasks),
      };

      projectService
        .updateOne(dataToUpdate)
        .then(() =>
          res.status(OK).send({ message: "Task updated succesfully" })
        );
    })
    .catch((error) => next(error));
});

/**
 * Delete one task.
 */
taskRouter.delete(paths.delete, (req: Request, res: Response, next) => {
  const { taskId, projectId } = req.params;
  // Check param
  if (!taskId || !projectId) {
    throw new ParamMissingError();
  }

  projectService
    .getById(projectId)
    .then((projectData: IProject) => {
      const dataToUpdate = {
        _id: projectId,
        tasks: TaskController.deleteTask(taskId, projectData.tasks),
      };

      projectService
        .updateOne(dataToUpdate)
        .then(() =>
          res.status(OK).send({ message: "Task updated succesfully" })
        );
    })
    .catch((error) => next(error));
});

export default taskRouter;
