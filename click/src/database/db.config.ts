export const dbConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'dungeon',
  password: process.env.DB_PASSWORD ?? 'dungeon',
  database: process.env.DB_NAME ?? 'dungeon',
};
