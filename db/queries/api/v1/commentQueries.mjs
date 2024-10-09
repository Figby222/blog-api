import pool from "../../../pool.mjs";

async function commentsListGet(postId) {
    const comments = await pool.comment.findMany({
        where: {
            postId: postId
        }
    })

    return comments;
}


export default { commentsListGet }