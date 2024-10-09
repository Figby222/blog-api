import asyncHandler from "express-async-handler";
import db from "../../../db/queries/api/v1/commentQueries.mjs";
import postDb from "../../../db/queries/api/v1/postQueries.mjs";
import { body, validationResult } from "express-validator";

const validateComment = [
    body("creatorId")
        .toInt(),
    body("text")
        .notEmpty().withMessage("Text must not be empty")
        .isLength({ max: 255 }).withMessage("Text must contain a maximum of 255 characters")
]

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

const createCommentPost = [
    checkIfPostExists,
    validateComment,
    asyncHandler(async (req, res) => {
        const errorsResult = validationResult(req);
        if (!errorsResult.isEmpty()) {
            return res.status(400).json({
                commentInfo: {
                    ...req.body,
                },
                errors: errorsResult.errors
            });
        }
        const comment = await db.createCommentPost(req.postId, {
            creatorId: parseInt(req.body.creatorId),
            text: req.body.text
        });
    
        res.json(comment);
    })
]
export { commentsListGet, createCommentPost }