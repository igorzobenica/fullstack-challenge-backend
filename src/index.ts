import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { auth } from './config/firebase';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Firebase Backend!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { auth };
