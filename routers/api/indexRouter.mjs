import { Router } from "express";
import v1Router from "./v1/indexRouter.mjs";

const indexRouter = Router();

indexRouter.use("/v1", v1Router);

export default indexRouter;
