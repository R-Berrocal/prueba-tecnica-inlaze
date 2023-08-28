export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  db_port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  jwt_secret: process.env.JWT_SECRET,
});
