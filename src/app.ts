import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(cors());

// app.use('/api/v1/students', StudentRoutes);
const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a.toString());
};

app.get('/', getAController);

export default app;
