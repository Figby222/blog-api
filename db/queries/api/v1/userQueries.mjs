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







export default { getUsersList, postUserCreate, findUserByUsername }