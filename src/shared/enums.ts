/* *********** FILTER CONSTANTS ******** */

export enum LogicalOperator {
  AND = "and",
  OR = "or",
}

export enum FilterOperator {
  IS = "is",
  IS_NOT = "isnt",
  IN = "in",
  NOT_IN = "nin",
  CONTAINS = "c",
  NOT_CONTAINS = "nc",
  STARTS_WITH = "sw",
  ENDS_WITH = "ew",
  EQUALS = "eq",
  NOT_EQUALS = "neq",
  EMPTY = "emp",
  NOT_EMPTY = "nemp",
  LESS_THAN = "lt",
  GREATHER_THAN = "gt",
  LESS_THAN_EQ = "lte",
  GREATHER_THAN_EQ = "gte",
}
