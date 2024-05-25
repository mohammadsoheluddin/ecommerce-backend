import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/Products/product.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);

const getAController = (req: Request, res: Response) => {
  const server = 'App listening on port 5000';
  res.send(server);
};

app.get('/', getAController);

export default app;
