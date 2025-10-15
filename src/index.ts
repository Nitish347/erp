import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';

import { connectToDatabase } from './config/database';
import { registerGlobalMiddlewares } from './middlewares/global';
import { registerRoutes } from './routes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
registerGlobalMiddlewares(app);
registerRoutes(app);
app.use(errorHandler);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      // Server started
    });
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to database', error);
    process.exit(1);
  });

export default app;


