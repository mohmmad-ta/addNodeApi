import express, { Application, Request, Response, NextFunction } from 'express';
import {attachControllers} from "@decorators/express";
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

const app: Application = express();
dotenv.config();

const PORT = process.env.PORT || 3001;
import NotesController from './controllers/NodesController';

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

// *** Data Base Postgres ***
import {DataSource} from "typeorm";
import Note from "./models/nodesModels";

const myDataSource = new DataSource({
    host: "localhost",
    type: "postgres",
    port: 5432,
    database: "NodesProject",
    username: "postgres",
    password: "2029",
    entities: [
        Note,
    ],
    synchronize: true
})
myDataSource.initialize().then(dataSource => {
    console.log(`The db is connected`);
}).catch(error => {
    console.log(error);
});

// *** Server ***
app.listen(PORT,()=>{
    console.log(`Server is run on http://localhost:${PORT}`)
})

attachControllers(app,[NotesController]).then(() => {
    console.log("controllers");
})


export default app;