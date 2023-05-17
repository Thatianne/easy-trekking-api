import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import 'reflect-metadata';
import { Routes } from './routes';
import { AppDataSource } from './database/configuration/db-data-source';

const app = express();
app.use(cors())
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use((req, res, next) => {
  if (!AppDataSource.isInitialized) {
    AppDataSource.initialize()
      .then(() => {
          next();
      })
      .catch(err => {
        console.log(err)
      });
  }
});

app.use('/', Routes);

app.listen(3333, () => 'server running on port 3333'); // for local
module.exports.handler = serverless(app); // for lambda
