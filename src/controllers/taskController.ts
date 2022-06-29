import { ITask, ITaskOperationData } from "@models/interfaces";

const addOrUpdateTask = (operationData: ITaskOperationData) => {
  const { tasks, parentTaskId, taskData: reqTaskData, isEdit } = operationData;

  /* Inserting tasks in level 0 */
  if (!isEdit && !parentTaskId) {
    const updatedTasks: ITask[] = [...(tasks || [])];
    updatedTasks.push(reqTaskData);
    return updatedTasks;
  }

  if (!tasks?.length) {
    return tasks;
  }

  const updatedTasks: ITask[] = tasks.map((task) => {
    let newTaskData = task;

    if (task.id === parentTaskId) {
      newTaskData.subTasks = newTaskData.subTasks?.concat(reqTaskData);
    } else if (task.id === reqTaskData.id) {
      newTaskData = { ...task, ...reqTaskData };
    } else {
      newTaskData.subTasks = addOrUpdateTask({
        tasks: newTaskData.subTasks,
        parentTaskId,
        taskData: reqTaskData,
        isEdit,
      });
    }

    return newTaskData;
  });

  return updatedTasks;
};

const addTask = (taskData: ITask, parentTaskId?: string, taskList?: ITask[]) =>
  addOrUpdateTask({
    tasks: taskList,
    taskData,
    parentTaskId,
  });

const updateTask = (taskDataToUpdate: ITask, taskList?: ITask[]) =>
  addOrUpdateTask({
    tasks: taskList,
    taskData: taskDataToUpdate,
    isEdit: true,
  });

const deleteTask = (taskId: string, taskList?: ITask[]) => {
  if (!taskList?.length) {
    return taskList;
  }

  const updatedTasks = taskList.filter((task) => {
    const newTaskData = task;

    if (task.id === taskId) {
      return false;
    } else {
      newTaskData.subTasks = deleteTask(taskId, newTaskData.subTasks);
    }

    return true;
  });

  return updatedTasks;
};

export default {
  addTask,
  updateTask,
  deleteTask,
} as const;
