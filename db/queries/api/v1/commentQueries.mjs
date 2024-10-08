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

async function findCommentGet(postId, commentId) {
    const comment = await pool.comment.findUnique({
        where: {
            postId: postId,
            id: commentId
        }
    });

    return comment;
}

async function editCommentPut(postId, commentId, commentDetails) {
    const comment = await pool.comment.update({
        where: {
            postId: postId,
            id: commentId,
        },
        data: {
            text: commentDetails.text
        }
    });

    return comment;
}

async function removeCommentDelete(postId, commentId) {
    const comment = await pool.comment.delete({
        where: {
            postId: postId,
            id: commentId
        }
    });

    return comment;
}




export default { commentsListGet, createCommentPost, findCommentGet, editCommentPut, removeCommentDelete }