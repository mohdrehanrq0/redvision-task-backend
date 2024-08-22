import { NextFunction, Request, Response } from "express";

import { ProtectedRequest } from "../../../types/app-request";
import statusCode from "../../constant/statusCode";
import catchAsyncError from "../../middleware/catchAsyncError";
import User from "../../model/user";
import ErrorHandler from "../../utils/errorHandler";
import { getJWTtoken } from "../../utils/jwt";
import { comparePassword, cookieConfig, hashPassword } from "./utils";

export const registerUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let payload = {
      ...req.body,
      password: hashPassword(req.body.password),
    };

    let user = await User.create(payload);

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "User added successfully.",
      user,
    });
  }
);

export const userLogin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let userData = await User.findOne({ email: email });

    if (!userData) {
      return next(new ErrorHandler("User not found", statusCode.NOT_FOUND));
    }

    let match = comparePassword(password, userData.password);

    if (!match) {
      return next(
        new ErrorHandler(
          "Email and password is invalid",
          statusCode.UNAUTHORIZED
        )
      );
    }

    const accessToken = await getJWTtoken(userData._id);

    res.cookie("accessToken", accessToken, cookieConfig);
    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "User login successfully.",
      user: userData,
      accessToken,
    });
  }
);

export const userLogout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", cookieConfig);

    res.status(statusCode.SUCCESS).json({
      success: true,
      message: "User loggedOut successfully.",
    });
  }
);

export const getUserDetails = catchAsyncError(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    res.status(statusCode.SUCCESS).json({
      success: true,
      user: req.user,
    });
  }
);
