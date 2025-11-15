import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/database.js';
import authRoutes from './routes/authRoutes.js';
import morgan from 'morgan';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(morgan('dev'))

const db = await connectDb();
app.locals.db = db;

app.use('/api' , authRoutes);

app.listen(PORT , () => {console.log("App is listening at PORT " + PORT)})
