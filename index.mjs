import express from "express";
import "dotenv/config";
import cors from "cors";
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }))

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})