import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import loggerCreate from './log/DevLogs';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8080;

app.get('/',(req:Request, res : Response) => {
    res.send("Welcome to Logger Template");
})


loggerCreate.info('server started');

app.listen(port , ()=>{
    loggerCreate.warn(`Server is running at http://localhost:${port}`);
});