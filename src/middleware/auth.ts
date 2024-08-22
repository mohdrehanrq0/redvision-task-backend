import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { ProtectedRequest } from "../../types/app-request";
import statusCode from "../constant/statusCode";
import User from "../model/user";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "./catchAsyncError";

export const isAuthenticatedUser = async (
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(
      new ErrorHandler(
        "Please login to access this page",
        statusCode.UNAUTHORIZED
      )
    );
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  // @ts-expect-error
  req.user = await User.findById(decodeData._id);

  next();
};

export const authorizeRole = (...roles: string[]) => {
  return (req: ProtectedRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource.`,
          statusCode.UNAUTHORIZED
        )
      );
    }
    next();
  };
};
