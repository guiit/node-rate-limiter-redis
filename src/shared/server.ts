/* eslint-disable no-console */
import 'dotenv/config';
import 'express-async-errors';
import { createConnection } from 'typeorm';
import config from '@shared/infra/typeorm/ormconfig';

createConnection(config)
  .then(async () => {
    const app = (await import('@shared/infra/config/app')).default;

    app.listen(process.env.PORT, () => {
      console.log('Server listening on PORT:', process.env.PORT);
    });
  })
  .catch(console.error);
