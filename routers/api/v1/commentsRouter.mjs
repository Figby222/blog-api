import { Router } from "express";
import * as commentsController from "../../../controllers/api/v1/commentsController.mjs";

const commentsRouter = Router({ mergeParams: true });

commentsRouter.get("/", commentsController.commentsListGet);

export default commentsRouter;