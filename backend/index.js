import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import chatbotRoutes from './routes/chatbot.route.js';

const app = express()
dotenv.config()

const port =process.env.PORT || 3000

// middleware
app.use(express.json());
app.use(cors())

// Database Connection code (skip auto-connecting during tests — tests use in-memory DB)
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
      console.log("Connected to MongoDB")
  }).catch((error)=>{
      console.log("Error connecting to MongoDB:", error)
  })
}

// Defining Routes
app.use("/bot/v1/", chatbotRoutes)

// Only start server when not running tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is Running on Port ${port}`)
  })
}

export default app;
