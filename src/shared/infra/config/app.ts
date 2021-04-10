import 'reflect-metadata';
import 'shared/container';
import cors from 'cors';
import express from 'express';
import { errors } from 'celebrate';
import {
  authExceptions,
  authentication,
  errorHandling,
  rateLimiter
} from '@shared/infra/middlewares';

import setupRoutes from '@shared/infra/routes/routes';

const app = express();

app.use(cors(), express.json(), authExceptions(authentication), rateLimiter);

setupRoutes(app);

app.use(errorHandling, errors());

export default app;
