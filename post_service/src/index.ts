import express from 'express';
import cors from 'cors';
import db from "./db.js"
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}))

app.get("/posts/", (req, res) => res.json("hello world"));


try {
    await db.authenticate();
    await db.sync({ alter: true });
    app.listen(port, () => console.log(`Listening on port ${port}.`));
} catch (error) {
    console.log('Error while establishing connection with database: ', error);
}