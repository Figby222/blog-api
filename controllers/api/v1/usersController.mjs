import asyncHandler from "express-async-handler";
import db from "../../../db/queries/api/v1/userQueries.mjs";

const usersListGet = asyncHandler(async (req, res) => {
    const users = await db.getUsersList();

    res.json(users)
})

export { usersListGet };