import dotenv from 'dotenv';
import app from './app.js';
import { connectDb } from './config/db.js';
dotenv.config();

const PORT = process.env.PORT || 4000;
connectDb();


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));