import express from 'express';
import dotenv from 'dotenv';
import paymentRoutes from './Routes/paymentRoutes.js'; 
import shareRoute from './Routes/shareRoutes.js';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
      origin: process.env.FRONT_END_URL, // Allow access from your frontend
    })
  );

  app.use(express.json({limit: '50mb'}));
// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use('/api', paymentRoutes);
app.use('/api', shareRoute);


app.listen(PORT, ()=> {
    console.log(`Planting server is listening on port ${PORT}`);
})