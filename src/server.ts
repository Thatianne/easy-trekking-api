import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import serverless from 'serverless-http';
import 'reflect-metadata';
import { Routes } from './routes';
import { AppDataSource } from './database/configuration/db-data-source';

const app = express();

app.use(express.json());

// Database connection
AppDataSource.initialize().then(() => {
  // Routes
  app.use('/', Routes);
});

app.listen(3333, () => 'server running on port 3333'); // for local
module.exports.handler = serverless(app); // for lambda
