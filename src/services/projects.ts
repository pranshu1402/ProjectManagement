import projectRepo from "../models/project.model";
import { ProjectNotFoundError } from "@shared/errors";
import { IProject } from "@models/interfaces";
import { isEmpty } from "@shared/utility";

const defaultProjection = { deleted: 0, __v: 0 };

/**
 * Get all projects.
 *
 * @returns
 */
async function getAll(tenantId: number): Promise<IProject[]> {
  return await projectRepo.find(
    { $and: [{ deleted: false }, { tenantId: { $eq: tenantId } }] },
    defaultProjection
  );
}

/**
 * Get project by Id.
 *
 * @returns
 */
async function getById(projectId: any): Promise<IProject | any> {
  const projectData = await projectRepo.findOne(
    { _id: projectId, deleted: false },
    defaultProjection
  );
  if (isEmpty(projectData)) {
    throw new ProjectNotFoundError();
  }
  return projectData;
}

/**
 * Add one project.
 *
 * @param project
 * @returns
 */
function addOne(project: IProject): Promise<any> {
  const newProject = new projectRepo(project);
  return newProject.save();
}

/**
 * Update one project.
 *
 * @param project
 * @returns
 */
async function updateOne(project: any): Promise<any> {
  const updatedProject = await projectRepo.findOneAndUpdate(
    { _id: project._id, deleted: false },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    project,
    { projection: defaultProjection }
  );
  if (isEmpty(updatedProject)) {
    throw new ProjectNotFoundError();
  }
  return updatedProject;
}

/**
 * Hard delete a project by their id.
 *
 * @param id
 * @returns
 */
async function deleteOne(id: number): Promise<any> {
  const deletedProject = await projectRepo.findOneAndDelete({
    _id: id,
    deleted: false,
  });
  if (isEmpty(deletedProject)) {
    throw new ProjectNotFoundError();
  }
  return deletedProject;
}

// Export default
export default {
  getAll,
  getById,
  addOne,
  updateOne,
  delete: deleteOne,
} as const;
