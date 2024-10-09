import asyncHandler from "express-async-handler";
import db from "../../../db/queries/api/v1/postQueries.mjs";
import { body, validationResult } from "express-validator";

const validatePost = [
    body("creatorId")
        .toInt(),
    body("title")
        .notEmpty().withMessage("Title must not be empty")
        .isLength({ max: 30 }).withMessage("Title must have a maximum of 30 characters"),
    body("text")
        .notEmpty().withMessage("Text must not be empty")
        .isLength({ max: 2500 }).withMessage("Text must have a maximum of 2500 characters"),
    body("published")
        .trim()
        .toBoolean()
        .notEmpty().withMessage("Published value must be selected")
        .isBoolean().withMessage("Published value must be true or false")
]

const postsListGet = asyncHandler(async (req, res) => {
    const posts = await db.getPostsList();

    res.json(posts);
})

const postsPost = [
    validatePost,
    asyncHandler(async (req, res) => {
        const errorsResult = validationResult(req);
        if (!errorsResult.isEmpty()) {
            return res.status(400).json({
                postDetails: {
                    ...req.body,
                },
                errors: errorsResult.errors
            })
        }
        const postDetails = await db.postPosts({
            title: req.body.title,
            text: req.body.text,
            published: req.body.published,
            creatorId: parseInt(req.body.creatorId)
        });
    
        res.json(postDetails);
    })
]

const postGet = asyncHandler(async (req, res) => {
    const postId = req.params.postId ? parseInt(req.params.postId) : null;

    if (!postId) {
        return res.status(400).json({
            message: "Invalid post id"
        });
    }

    const postDetails = await db.getPost(postId);

    if (!postDetails) {
        return res.status(404).json({
            message: `Post with id ${req.params.postId} not found`
        })
    }

    res.json(postDetails);
})
export { postsListGet, postsPost, postGet }