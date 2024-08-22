import path from 'path';

import statusCode from '../../constant/statusCode';
import catchAsyncError from '../../middleware/catchAsyncError';
import Blog from '../../model/blogs';
import uploadToCloudinary from '../../utils/cloudinary';
import ErrorHandler from '../../utils/errorHandler';

export const uploadAssets = catchAsyncError(async (req, res, next) => {
  if (!req.file)
    return new ErrorHandler("Please add file.", statusCode.BAD_REQUEST);

  const localFilePath = req.file.path;
  const fileName = req.file.filename;

  const result = await uploadToCloudinary(
    localFilePath,
    path.parse(fileName).name
  );

  res.status(statusCode.SUCCESS).json({
    success: true,
    message: "File uploaded successfully",
    url: result.fileData.secure_url,
  });
});

export const createBlog = catchAsyncError(async (req, res, next) => {
  let payload = {
    ...req.body,
    slug: req.body.title.replace(/\s+/g, "-").toLowerCase(),
  };

  let blog = await Blog.create(payload);

  res.status(statusCode.SUCCESS).json({
    success: true,
    message: "Blog created successfully.",
    blog,
  });
});

export const getBlogUsingSlug = catchAsyncError(async (req, res, next) => {
  const { slug } = req.params;

  let blog = await Blog.findOne({ slug });

  if (!blog) {
    return next(new ErrorHandler("Blog not found", statusCode.NOT_FOUND));
  }

  res.status(statusCode.SUCCESS).json({
    success: true,
    message: "Blog fetch successfully.",
    blog,
  });
});

export const updateBlog = catchAsyncError(async (req, res, next) => {
  let { blogId } = req.params;
  let payload = { ...req.body };

  let blog = await Blog.findById(blogId);

  if (!blog) {
    return next(new ErrorHandler("Blog not found", statusCode.NOT_FOUND));
  }

  blog = await Blog.findByIdAndUpdate(blogId, payload, {
    new: true,
    runValidators: true,
  });

  res.status(statusCode.SUCCESS).json({
    success: true,
    message: "Blog update successfully.",
    blog,
  });
});

export const deleteBlog = catchAsyncError(async (req, res, next) => {
  let { blogId } = req.params;
  let blog = await Blog.findById(blogId);

  if (!blog) {
    return next(new ErrorHandler("Blog not found", statusCode.NOT_FOUND));
  }

  blog = await Blog.findByIdAndDelete(blogId);

  res.status(statusCode.SUCCESS).json({
    success: true,
    message: "Blog deleted successfully.",
  });
});

export const getAllBlog = catchAsyncError(async (req, res, next) => {
  const blog = await Blog.find().sort({ createdAt: -1 });

  if (blog && blog.length === 0) {
    return next(
      new ErrorHandler(
        "No Blog found. Please make it one.",
        statusCode.NOT_FOUND
      )
    );
  }

  res.status(statusCode.SUCCESS).json({
    success: true,
    message: "Fetch all blogs",
    blog,
  });
});
