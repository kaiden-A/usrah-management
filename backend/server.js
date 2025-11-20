import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/database.js';
import authRoutes from './routes/authRoutes.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(cors({
    origin : process.env.FRONTEND_URL  || 'http://localhost:5173',
    methods: ['GET' , 'POST' , 'PUT' , 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}))

const db = await connectDb();
app.locals.db = db;

app.get('/'  , (req , res) => {
    res.json({success : "opening website"})
    console.log("Opening website");
})

app.use('/api' , authRoutes);

app.listen(PORT , () => {console.log("App is listening at PORT " + PORT)})
