import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import statusCode from "../constant/statusCode";
import ErrorHandler from "../utils/errorHandler";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || statusCode.INTERNAL_SERVER_ERROR;
  err.message = err.message || "Internal server error";

  //wrong mongo id errror
  if (err.name == "CastError") {
    const message = "Resource not found. Invalid: " + err.path;
    err = new ErrorHandler(message, statusCode.NOT_FOUND);
  }

  //Duplicate Error
  if (err.code == 11000) {
    console.log("err", err);
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, statusCode.BAD_REQUEST);
  }

  //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `JWT token is invalid. try again`;
    err = new ErrorHandler(message, statusCode.UNAUTHORIZED);
  }

  //jwt expire error
  if (err.name === "TokenExpiredError") {
    const message = `JWT token is expired. try again`;
    err = new ErrorHandler(message, statusCode.UNAUTHORIZED);
  }

  // console.log("Testing Error", err);
  res.status(err.statusCode || statusCode.BAD_REQUEST).json({
    success: false,
    message: err.message || err,
    stack_trace: err.stack,
  });
};
