import { Router } from "express";
import usersRouter from "./usersRouter.mjs";
import * as indexController from "../../../controllers/api/v1/indexController.mjs";

const indexRouter = Router();
indexRouter.use("/users", usersRouter);

indexRouter.get("/", indexController.indexRouteGet);

export default indexRouter;