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


export default { getUsersList }