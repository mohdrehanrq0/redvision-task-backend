import { Router } from 'express';

import { authorizeRole, isAuthenticatedUser } from '../../middleware/auth';
import validator, { ValidationSource } from '../../middleware/validation';
import uploadFile from '../../utils/multerConfig';
import { createBlogContract, updateBlogContract } from './contract';
import {
    createBlog, deleteBlog, getAllBlog, getBlogUsingSlug, updateBlog, uploadAssets
} from './controller';

const blogRouter = Router();

blogRouter.post(
  "/create",
  isAuthenticatedUser,
  authorizeRole("admin"),
  validator(ValidationSource.BODY, createBlogContract),
  createBlog
);

blogRouter.post(
  "/upload",
  isAuthenticatedUser,
  authorizeRole("admin"),
  uploadFile.single("file"),
  uploadAssets
);

blogRouter.put(
  "/update/:blogId",
  isAuthenticatedUser,
  authorizeRole("admin"),
  validator(ValidationSource.BODY, updateBlogContract),
  updateBlog
);
blogRouter.delete(
  "/delete/:blogId",
  isAuthenticatedUser,
  authorizeRole("admin"),
  deleteBlog
);

blogRouter.get("/get-all", isAuthenticatedUser, getAllBlog);
blogRouter.get("/:slug", isAuthenticatedUser, getBlogUsingSlug);

export default blogRouter;
