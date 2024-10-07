import pool from "./pool.mjs";
import { genPasswordHash } from "../lib/passwordHashingUtils.mjs";

async function main() {
    await pool.user.createManyAndReturn({
        data: [
            { username: "cookies", email: "cookies@cookies.com", password: genPasswordHash("cookies") },
            { username: "sandwich", email: "sandwich@sandwich.com", password: genPasswordHash("sandwich") },
            { username: "cookiesSandwich", email: "cookies@sandwich.com", password: genPasswordHash("cookiesSandwich") },
            { username: "sandwichCookies", email: "sandwich@cookies.com", password: genPasswordHash("sandwichCookies") }
        ]
    }).then(console.log);

    await pool.post.createManyAndReturn({
        data: [
            { title: "Hi", text: "Stuff", creatorId: 1 },
            { title: "Hi again", text: "Stuff again", creatorId: 2 },
            { title: "Super Hi again again", text: "Super Stuff again again", creatorId: 3 },
            { title: "Super Hi again again again", text: "Super Stuff again again again", creatorId: 4 }

        ]
    }).then(console.log);

    await pool.comment.createManyAndReturn({
        data: [
            { text: "Hi", creatorId: 1, postId: 1 },
            { text: "Hi Hi", creatorId: 2, postId: 2 },
            { text: "Hi Hi Hi", creatorId: 3, postId: 3 },
            { text: "Hi Hi Hi Hi", creatorId: 4, postId: 4 }
        ]
    }).then(console.log);
}

main()
    .catch(async (err) => {
        console.log(err);
        await pool.$disconnect();
    })