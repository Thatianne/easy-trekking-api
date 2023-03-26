import { DataSource } from 'typeorm'
import { AvailableEntities } from '../../entities'

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: AvailableEntities,
  subscribers: [],
  migrations: [],
});

export { AppDataSource }
