import Router from "express";

import blogRouter from "./modules/blog/router";
import userRouter from "./modules/user/router";

const router = Router();

router.get("/", (_, res) =>
  res.status(200).json({
    success: true,
    status: 200,
    data: "App in up and running!!!!",
  })
);

router.use("/user", userRouter);
router.use("/blog", blogRouter);

export default router;
