import { Router } from "express";
import * as commentsController from "../../../controllers/api/v1/commentsController.mjs";

const commentsRouter = Router({ mergeParams: true });

commentsRouter.get("/", commentsController.commentsListGet);

commentsRouter.post("/", commentsController.createCommentPost);

export default commentsRouter;