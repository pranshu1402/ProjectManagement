export const isEmpty = (objectToCheck: any) => {
  if (objectToCheck === null || objectToCheck === undefined) return true;
  if (Array.isArray(objectToCheck)) return !objectToCheck.length;
  if (typeof objectToCheck === "string") return !objectToCheck.trim().length;

  if (objectToCheck instanceof Date)
    return objectToCheck.getTime && isNaN(objectToCheck.getTime());

  if (typeof objectToCheck === "object")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.keys(objectToCheck).length === 0;
  if (typeof objectToCheck === "number")
    return !objectToCheck && objectToCheck !== 0;
  return !objectToCheck;
};
