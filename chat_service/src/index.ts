import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { validateJwt } from './middleware/index.js';
import mongoose from 'mongoose';
import { initWS } from './websocket.js';
import { establishConnection } from './rabbitmq.js';
import { registerListeners } from './listeners/index.js';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}))

app.use(validateJwt);

try {
    await mongoose.connect(process.env.MONGO_CONN_STRING as string)
    await establishConnection();
    registerListeners();
    initWS();
    app.listen(port, () => console.log(`Listening on port ${port}.`));
} catch (error) {
    console.log('Error while establishing connection with database: ', error);
}