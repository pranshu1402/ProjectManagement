import { FilterOperator, LogicalOperator } from "@shared/enums";
import { ObjectId } from "mongoose";

export interface AuditInfo {
  tenantId?: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

/* Components */
export interface ITask {
  id?: any;
  title?: string;
  startDate?: Date;
  endDate?: Date;
  duration?: number;
  additionalInfo?: string;
  color?: string;
  subTasks?: ITask[];
  isExpanded?: boolean;
  isTaskCompleted?: boolean;
  resource?: string[];
}

export interface IProject extends AuditInfo {
  _id?: string | ObjectId;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  tasks?: Array<ITask>;
  resources?: Array<string>;
  deleted?: boolean;
}

/* Controller interfaces */
export interface ITaskOperationData {
  tasks?: ITask[];
  taskData: ITask;
  parentTaskId?: string;
  isEdit?: boolean;
}

/* Requests */
export interface FilterCondition {
  colId: string;
  opr: FilterOperator;
  value: any;
}
export interface Filter {
  logicalOperator: LogicalOperator;
  conditions: FilterCondition[];
}

/* Responses */
export interface IPaginatedResponse {
  totalCount: number;
  sortCol?: string;
  sortDir?: number;
  pageNo?: number;
  pageSize?: number;
  data: IProject[];
}
