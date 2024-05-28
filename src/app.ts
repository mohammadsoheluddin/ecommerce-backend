import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/Products/product.route';
import { OrderRoutes } from './app/modules/Orders/order.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

const getAController = (req: Request, res: Response) => {
  const server = 'App listening on port 5000';
  res.send(server);
};

app.get('/', getAController);

const handleNotFound = (req: Request, res: Response) => {
  res.status(500).json({ success: false, message: 'Route not found' });
};

app.use(handleNotFound);

export default app;
