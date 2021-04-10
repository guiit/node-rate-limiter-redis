import { redisClient } from '@shared/infra/middlewares/rateLimiter';
import { createConnection, getConnection } from 'typeorm';
import config from './ormconfig';

const connection = {
  async create() {
    await createConnection(config);
  },

  async close() {
    await getConnection().close();
    redisClient.quit();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);

      await repository.query(`DELETE FROM "${entity.tableName}"`);
    });
  }
};
export default connection;
