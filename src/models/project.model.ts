import mongoose from "mongoose";
import { ITask } from "./interfaces";

const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
    },
    description: {
      type: String,
      default: ""
    },
    startDate: {
      type: Date,
      required: [true, "Project start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "Project end date is required"],
    },
    tasks: {
      type: Array<ITask>,
      default: []
    },
    resources: {
      type: Array<number>,
      default: []
    },
    createdBy: {
      type: Number
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", ProjectSchema);

export default ProjectModel;
