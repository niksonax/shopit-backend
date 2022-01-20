import pg from 'pg';

const { Pool } = pg;

let localPoolConfig = {
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  host: 'localhost',
  port: '5432',
  database: process.env.DATABASE_NAME || 'shopit',
};

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : localPoolConfig;

const pool = new Pool(poolConfig);

export default pool;
