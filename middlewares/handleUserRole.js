import jwt from "jsonwebtoken";
import userModel from "../DB/models/user.model.js";
import { asyncHandler } from "../src/utils/handlers.js";

const handleUserRole = (accessRoles) => {
  return asyncHandler(async (req, res, next) => {
    if (!accessRoles.includes(req.user.role)) {
      return next(new Error("unAuthorized to access", { cause: 401 }));
    }
    next();
  });
};

export default handleUserRole;
