import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT ?? 4000,
  DB_URI: process.env.DB_URI ?? 'postgres://user:pass@example.com:5432/dbname',
  JWT_SECRET: process.env.JWT_SECRET ?? 'jwtsecret'
}

export default config;