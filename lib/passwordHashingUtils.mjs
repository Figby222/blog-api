import bcrypt from "bcryptjs";

async function genPasswordHash(key) {
    bcrypt.hash(key, 10, async (err, hashedPassword) => {
        if (err) {
            console.log(err);
            return;
        }

        return hashedPassword;
    })
}

export { genPasswordHash }