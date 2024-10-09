import { Router } from "express";
import * as usersController from "../../../controllers/api/v1/usersController.mjs";

const usersRouter = Router();

usersRouter.get("/", usersController.usersListGet);

usersRouter.post("/", usersController.createUserPost);

export default usersRouter;