import { Router } from "express";
import * as usersController from "../../../controllers/api/v1/usersController.mjs";

const usersRouter = Router();

usersRouter.get("/", usersController.usersListGet);

usersRouter.post("/", usersController.createUserPost);

usersRouter.post("/log-in", usersController.logInPost);

usersRouter.get("/posts", usersController.userPostsGet);

export default usersRouter;