import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express, { Application } from "express";
import { connect } from "./config/db.config";
import imageRouter from "./routes/image.routes";

const port : number = Number(process.env.PORT) || 3000;

const app : Application = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api', imageRouter);

app.get('/', async(req, res) => {
    res.send(`API running successfully from ${new Date()}`);
});

app.listen(
    port,
    () => {
        console.log(`Server started at port ${port}`);
        connect;
    }
);