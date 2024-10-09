import { Router } from "express";
import postsRouter from "./postsRouter.mjs";
import usersRouter from "./usersRouter.mjs";
import * as indexController from "../../../controllers/api/v1/indexController.mjs";

const indexRouter = Router();
indexRouter.use("/users", usersRouter);
indexRouter.use("/posts", postsRouter);

indexRouter.get("/", indexController.indexRouteGet);

export default indexRouter;