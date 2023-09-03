import express from 'express';
import cors from 'cors';
import cookies from "cookie-parser"
import userRoutes from "./routes/userRoutes.js"
import loginRoutes from "./routes/loginRoutes.js"
import registerRoutes from "./routes/registerRoutes.js"
import db from "./db.js"
import dotenv from "dotenv";
import { validateJwt } from './middleware/index.js';
import { establishConnection } from './rabbitmq.js';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(cookies());

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}))

app.use(validateJwt) 

app.use('/api/users', loginRoutes, registerRoutes, userRoutes)

try {
    await db.authenticate();
    await db.sync({ alter: true });
    await establishConnection();
    app.listen(port, () => console.log(`Listening on port ${port}.`));
} catch (error) {
    console.log('Error while establishing initial connections: ', error);
}