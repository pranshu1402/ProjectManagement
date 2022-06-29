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
projectRouter.get(paths.get, (req: Request, res: Response) => {
  /**
   * @Todo
   * Implement filter, sorting, pagination
   */
  projectService.getAll().then((projects) => {
    res.status(OK).json({ totalCount: projects.length, data: projects });
  });
});

/**
 * Get project by ID.
 */
projectRouter.get(paths.getById, (req: Request, res: Response) => {
  const projectId = req.params.id;

  if (!projectId) {
    throw new ParamMissingError();
  }
  projectService
    .getById(projectId)
    .then((project) => res.status(OK).json({ data: project }));
});

/**
 * Add one project.
 */
projectRouter.post(paths.add, (req: Request, res: Response) => {
  const { project } = req.body;
  // Check param
  if (isEmpty(project)) {
    throw new ParamMissingError();
  }

  projectService
    .addOne(project as IProject)
    .then((newProject) => res.status(CREATED).json({ data: newProject }));
});

/**
 * Update one project.
 */
projectRouter.put(paths.update, (req: Request, res: Response) => {
  const { data } = req.body;

  if (isEmpty(data) || !data.id) {
    throw new ParamMissingError();
  }

  projectService.updateOne(data as IProject).then((updatedProject) =>
    res.status(OK).json({
      data: updatedProject,
    })
  );
});

/**
 * Patch one project.
 */
projectRouter.patch(paths.update, (req: Request, res: Response) => {
  const { data } = req.body;

  if (isEmpty(data) || !data.id) {
    throw new ParamMissingError();
  }

  projectService.updateOne(data).then((updatedProject) =>
    res.status(OK).json({
      data: updatedProject,
    })
  );
});

/**
 * Delete one project.
 */
projectRouter.delete(paths.delete, (req: Request, res: Response) => {
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
    );
});

export default projectRouter;
