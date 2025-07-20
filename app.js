import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Route from  "./route/rooute.js";

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS for all routes
const corsOptions = {
  origin: 'https://front-sage-ten.vercel.app'
};
app.use(cors(corsOptions));

const mourl = process.env.MONGODB_URI;
mongoose.connect(mourl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


app.use('/', Route);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
