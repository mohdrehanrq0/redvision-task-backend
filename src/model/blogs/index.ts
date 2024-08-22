import mongoose from "mongoose";

import { IBlog } from "./interface";
import userSchema from "./schema";

const Blog = mongoose.model<IBlog>("blog", userSchema);

export default Blog;
