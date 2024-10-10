import express from "express";
import "dotenv/config";
import cors from "cors";
const app = express();
import routers from "./routers/index.mjs";

app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use("/api", routers.apiRouter);


app.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).json({
        message: err.message
    })
})



app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})