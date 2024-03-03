import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server running on port 8080")
})

const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

mongoose.Promise = Promise;
mongoose.connect(mongoConnectionString);
mongoose.connection.on('error', (error: Error) => console.log('Error'));

app.use('/', router());