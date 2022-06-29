import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";

import projectService from "@services/projects";
import { ParamMissingError } from "@shared/errors";
import { IProject } from "@models/interfaces";
import { isEmpty } from "@shared/utility";

/* Constants */
const projectRouter = Router();
const { CREATED, OK } = StatusCodes;

export const paths = {
  get: "/all",
  getById: "/:id",
  add: "/add",
  update: "/update",
  delete: "/delete/:id",
} as const;

/**
 * Get all projects.
 */
projectRouter.get(paths.get, (req: Request, res: Response, next) => {
  /**
   * @Todo
   * Implement filter, sorting, pagination,
   * Filter records by current user's tenantId
   */
  projectService
    .getAll()
    .then((projects) => {
      res.status(OK).json({ totalCount: projects.length, data: projects });
    })
    .catch((error) => next(error));
});

/**
 * Get project by ID.
 */
projectRouter.get(paths.getById, (req: Request, res: Response, next) => {
  const projectId = req.params.id;

  if (!projectId) {
    throw new ParamMissingError();
  }

  projectService
    .getById(projectId)
    .then((project) => res.status(OK).json({ data: project }))
    .catch((error) => next(error));
});

/**
 * Add one project.
 */
projectRouter.post(paths.add, (req: Request, res: Response, next) => {
  const { project } = req.body;
  // Check param
  if (isEmpty(project)) {
    throw new ParamMissingError();
  }

  /**
   * @Todo Need projection here for hiding default fields
   */
  projectService
    .addOne(project as IProject)
    .then((newProject) => res.status(CREATED).json({ data: newProject }))
    .catch((error) => next(error));
});

/**
 * Update one project.
 */
projectRouter.put(paths.update, (req: Request, res: Response, next) => {
  const { data } = req.body;

  if (isEmpty(data) || !data.id) {
    throw new ParamMissingError();
  }

  projectService
    .updateOne(data as IProject)
    .then((updatedProject) =>
      res.status(OK).json({
        data: updatedProject,
      })
    )
    .catch((error) => next(error));
});

/**
 * Patch one project.
 */
projectRouter.patch(paths.update, (req: Request, res: Response, next) => {
  const { data } = req.body;

  if (isEmpty(data) || !data._id) {
    throw new ParamMissingError();
  }

  projectService
    .updateOne(data)
    .then((updatedProject) =>
      res.status(OK).json({
        data: updatedProject,
      })
    )
    .catch((error) => next(error));
});

/**
 * Delete one project.
 */
projectRouter.delete(paths.delete, (req: Request, res: Response, next) => {
  const { id } = req.params;
  // Check param
  if (!id) {
    throw new ParamMissingError();
  }

  const dataToUpdate = { _id: id, deleted: true };
  projectService
    .updateOne(dataToUpdate)
    .then(() =>
      res.status(OK).send({ message: "Project deleted successfully!" })
    )
    .catch((error) => next(error));
});

export default projectRouter;
