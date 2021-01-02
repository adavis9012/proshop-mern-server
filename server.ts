import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';
import {errorHandler, notFound} from "./middleware/errorMiddleware";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV;
const app = express();

app.get('/', (request: express.Request, response: express.Response) => {
    response.send('API is running');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running in ${ENVIRONMENT} mode on port ${PORT}`);
});
