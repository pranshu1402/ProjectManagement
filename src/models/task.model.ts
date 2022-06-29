import mongoose from "mongoose";
import { ITask } from "./interfaces";

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: String,
  startDate: Date,
  endDate: Date,
  duration: {
    type: Number,
  },
  additionalInfo: {
    type: String,
  },
  color: {
    type: String,
  },
  subTasks: {
    type: Array<ITask>,
  },
  isExpanded: {
    type: Boolean,
  },
  isTaskCompleted: {
    type: Boolean,
  },
  resource: {
    type: Array<string>,
  },
});

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
