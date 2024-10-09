import pool from "../../../pool.mjs";

async function getPostsList() {
    const posts = await pool.post.findMany({
        select: {
            id: true,
            title: true,
            timestamp: true,
            published: true,
            creatorId: true
        }
    })

    return posts;
}

async function postPosts(postDetails) {
    const post = await pool.post.create({
        data: {
            title: postDetails.title,
            text: postDetails.text,
            published: postDetails.published,
            creatorId: postDetails.creatorId
        }
    })

    return post;
}

export default { getPostsList, postPosts }