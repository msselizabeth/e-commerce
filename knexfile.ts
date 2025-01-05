// knexfile.ts
import type { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    `.env.${process.env.NODE_ENV || 'development'}`
  ),
});

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'rootroot',
      database: process.env.DB_NAME || 'ecommerce_dev',
      port: Number(process.env.DB_PORT) || 3306,
    },
    migrations: {
      directory: './src/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './src/seeds',
      extension: 'ts',
    },
    pool: {
      min: 2,
      max: 10,
    },
    debug: process.env.DEBUG === 'true',
  },
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST, 
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 3306,
    
    },
    migrations: {
      directory: './src/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './src/seeds',
      extension: 'ts',
    },
    pool: {
      min: 10,
      max: 50,
    },
    debug: false,
  },

};

module.exports = config;
