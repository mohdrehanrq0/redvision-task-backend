import { Schema } from "mongoose";

import { UserRole } from "./constant";
import { IUser } from "./interface";

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: UserRole,
      default: "user",
    },
  },
  { timestamps: true }
);

export default userSchema;
