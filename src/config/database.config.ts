/**
 * Database Configuration
 *
 * This file defines the database configuration using environment variables.
 * @constant databaseConfig
 */

import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'azilen_nestjs',
  autoLoadModels: true,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  ssl: false,
}));
