import express, { Express } from 'express';
import cors from 'cors';
import subscribeRouter from './api/subscribe';

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', subscribeRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 