import asyncHandler from "express-async-handler";
import db from "../../../db/queries/api/v1/commentQueries.mjs";
import postDb from "../../../db/queries/api/v1/postQueries.mjs";
import { body, validationResult } from "express-validator";
import { handleJWTUserAuthorization } from "./util.mjs";
import passport from "../../../config/passport.mjs";

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
    handleJWTUserAuthorization,
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
            creatorId: parseInt(req.user.id),
            text: req.body.text
        });
    
        res.json(comment);
    })
]

const editCommentPut = [
    handleJWTUserAuthorization,
    checkIfPostExists,
    validateComment,
    asyncHandler(async (req, res) => {
        const errorsResult = validationResult(req);
        if (!errorsResult.isEmpty()) {
            return res.status(400).json({
                commentDetails: {
                    ...req.body,
                },
                errors: errorsResult.errors
            });
        }
        const commentId = req.params.commentId ? parseInt(req.params.commentId) : null;
    
        if (!commentId) {
            return res.status(400).json({
                message: "Invalid comment id"
            });
        }
    
        const commentDetails = await db.findCommentGet(req.postId, commentId);
    
        if (!commentDetails) {
            return res.status(404).json({
                message: `Comment with id ${commentId} in post with id ${req.postId} not found`
            });
        }
    
        if (!(commentDetails.creatorId === req.user.id)) {
            return res.status(403).json({
                message: "You are not the owner of this comment"
            });
        }
    
        const comment = await db.editCommentPut(req.postId, commentId, {
            text: req.body.text
        });
    
        res.json(comment);
    })
]

const removeCommentDelete = [
    handleJWTUserAuthorization,
    checkIfPostExists,
    asyncHandler(async (req, res) => {
        const commentId = req.params.commentId ? parseInt(req.params.commentId) : null;
    
        if (!commentId) {
            return res.status(400).json({
                message: "Invalid comment id"
            });
        }
    
        const commentDetails = await db.findCommentGet(req.postId, commentId);
    
        if (!commentDetails) {
            return res.status(404).json({
                message: `Comment with id ${commentId} in post with id ${req.postId} not found`
            });
        }
    
        if (!(req.user.id === commentDetails.creatorId)) {
            return res.status(403).json({
                message: "You are not the owner of this comment"
            });
        }
    
        const comment = await db.removeCommentDelete(req.postId, commentId);
    
        res.json(comment);
    })

]





export { commentsListGet, createCommentPost, editCommentPut, removeCommentDelete }