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



export default { getPostsList }