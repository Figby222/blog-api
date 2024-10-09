import asyncHandler from "express-async-handler";
import db from "../../../db/queries/api/v1/commentQueries.mjs";
import postDb from "../../../db/queries/api/v1/postQueries.mjs";

const checkIfPostExists = asyncHandler(async (req, res, next) => {
    req.postId = req.params.postId ? parseInt(req.params.postId) : null;

    if (!req.postId) {
        return res.status(400).json({
            message: "Invalid post id"
        });
    }

    const post = await postDb.getPost(req.postId);

    if (!post) {
        return res.status(404).json({
            message: `Post with id ${req.postId} not found`
        });
    }

    next();
})

const commentsListGet = [
    checkIfPostExists,
    asyncHandler(async (req, res) => {
        const comments = await db.commentsListGet(req.postId);
    
        res.json(comments);
    })
]

export { commentsListGet }