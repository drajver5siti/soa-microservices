import express from 'express';
import cors from 'cors';
import db from "./db.js"
import dotenv from "dotenv";
import postRoutes from "./routes/postRoutes.js"
import { validateJwt } from './middleware/index.js';
import { registerListeners } from './listeners/index.js';
import { establishConnection } from './rabbitmq.js';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}))

app.use(validateJwt);

app.use("/api/posts", postRoutes)


try {
    await db.authenticate();
    await db.sync({ alter: true });
    await establishConnection();
    registerListeners();
    // await db.sync({ force: true })
    app.listen(port, () => console.log(`Listening on port ${port}.`));
} catch (error) {
    console.log('Error while establishing connection with database: ', error);
}