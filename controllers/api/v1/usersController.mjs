import asyncHandler from "express-async-handler";
import db from "../../../db/queries/api/v1/userQueries.mjs";
import { genPasswordHash } from "../../../lib/passwordHashingUtils.mjs";
import { body, validationResult } from "express-validator";

const validateUser = [
    body("username")
        .trim()
        .notEmpty().withMessage("Username must not be empty")
        .isAlphanumeric("en-US").withMessage("Username must be alphanumeric")
        .isLength({ max: 30 }).withMessage("Username must contain a maximum of 30 characters")
        .custom(async (username) => {
            const userExists = await db.findUserByUsername(username);

            if (userExists) {
                throw new Error("Username not available");
            }

            return true;
        }),
    body("password")
        .notEmpty().withMessage("Password must not be empty")
        .isLength({ min: 10, max: 50 }).withMessage("Password must contain between 10 & 50 characters"),
    body("email")
        .notEmpty().withMessage("Email must not be empty")
        .isEmail().withMessage("Email must be formatted like so: example@example.com")
        .isLength({ max: 50 }).withMessage("Email must contain a maximum of 50 characters")
        .custom(async (email) => {
            const emailExists = await db.findUserByEmail(email);

            if (emailExists) {
                throw new Error("Email not available");
            }

            return true;
        })
]

const usersListGet = asyncHandler(async (req, res) => {
    const users = await db.getUsersList();

    res.json(users)
})

const createUserPost = [
    validateUser,
    asyncHandler(async (req, res) => {
        const errorsResult = validationResult(req);
        if (!errorsResult.isEmpty()) {
            return res.json({
                userDetails: {
                    ...req.body
                },
                errors: errorsResult.errors
            })
        }
        
        const userDetails = await db.postUserCreate({
            username: req.body.username,
            email: req.body.email,
            password: await genPasswordHash(req.body.password),
            role: req.body.role
        })
    
        res.json(userDetails);
    })
]

export { usersListGet, createUserPost };