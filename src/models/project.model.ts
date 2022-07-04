import mongoose from "mongoose";
import { ITask } from "./interfaces";

const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
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
    deleted: {
      type: Boolean,
      default: false
    },
    tenantId: Number,
    createdBy: Number,
    updatedBy: Number 
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", ProjectSchema);

export default ProjectModel;
