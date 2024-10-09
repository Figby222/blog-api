import { Router } from "express";
import * as postsController from "../../../controllers/api/v1/postsController.mjs";

const postsRouter = Router();

postsRouter.get("/", postsController.postsListGet);

export default postsRouter;