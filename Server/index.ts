import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";

const app = express();
const port = 3000;

app.use(cors({origin: "*"}));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);


mongoose.connect('MongoDB Connection String')
  .then(res => {
    app.listen(3000, () => {
      console.log(`Server is running on port 3000`);
    });
  })
