import express from 'express';
import dotenv from 'dotenv';
import paymentRoutes from './Routes/paymentRoutes.js'; 
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json());

app.use('/api', paymentRoutes);

app.listen(PORT, ()=> {
    console.log(`Planting server is listening on port ${PORT}`);
})