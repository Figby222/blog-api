import pool from "../../../pool.mjs";

async function getUsersList() {
    const users = await pool.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
            password: true,
            role: true
        }
    })

    return users;
}

async function postUserCreate(userDetails) {
    const user = await pool.user.create({
        data: {
            username: userDetails.username,
            email: userDetails.email,
            password: userDetails.password,
            role: userDetails.role
        }
    })

    return user;
}

async function findUserByUsername(username) {
    const user = await pool.user.findUnique({
        where: {
            username: username
        }
    })

    return user;
}

async function findUserByEmail(email) {
    const user = await pool.user.findUnique({
        where: {
            email: email
        }
    });

    return user;
}

async function getUserPosts(userId) {
    const userPosts = pool.post.findMany({
        where: { creatorId: userId },
        select: {
            id: true,
            title: true,
            text: true,
            timestamp: true,
            published: true,
        }
    });

    return userPosts;
}
export default { getUsersList, postUserCreate, findUserByUsername, findUserByEmail, getUserPosts }