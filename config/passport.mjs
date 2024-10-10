import passport from "passport";
import LocalStrategy from "passport-local";
import pool from "../db/pool.mjs";
import bcrypt from "bcryptjs";

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await pool.user.findUnique({
                where: {
                    username: username
                }
            });
    
            if (!user) {
                done(null, false, { message: "Incorrect username or password" });
                return;
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
    
            if (!isMatch) {
                done(null, false, { message :"Incorrect username or password" });
            }
    
            return done(null, user);
        }
        catch(err) {
            done(err);
        }
    })
)



export default passport;