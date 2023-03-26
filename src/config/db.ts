import { DataSource } from 'typeorm'
import { City } from '../models/city';
import { DifficultLevel } from '../models/difficult-level';
import { State } from '../models/state';
import { Trekking } from '../models/trekking';
import { User } from '../models/user';

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Trekking, State, City, DifficultLevel, User],
  subscribers: [],
  migrations: [],
});

export { AppDataSource }