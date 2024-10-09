import pool from "../../../pool.mjs";

async function commentsListGet(postId) {
    const comments = await pool.comment.findMany({
        where: {
            postId: postId
        }
    })

    return comments;
}

async function createCommentPost(postId, commentDetails) {
    const comment = await pool.comment.create({
        data: {
            postId: postId,
            creatorId: commentDetails.creatorId,
            text: commentDetails.text
        }
    })

    return comment;
}




export default { commentsListGet, createCommentPost }