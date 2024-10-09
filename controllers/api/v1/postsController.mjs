import asyncHandler from "express-async-handler";
import db from "../../../db/queries/api/v1/postQueries.mjs";

const postsListGet = asyncHandler(async (req, res) => {
    const posts = await db.getPostsList();

    res.json(posts);
})

export { postsListGet }