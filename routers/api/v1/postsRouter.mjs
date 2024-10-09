import { Router } from "express";
import * as postsController from "../../../controllers/api/v1/postsController.mjs";

const postsRouter = Router();

postsRouter.get("/", postsController.postsListGet);

postsRouter.post("/", postsController.postsPost);

postsRouter.get("/:postId", postsController.postGet);

postsRouter.put("/:postId", postsController.updatePostPut);

postsRouter.delete("/:postId", postsController.removePostDelete);

export default postsRouter;