import mysql2 from "mysql2/promise";
import { config } from "dotenv";
config({ path: './.env' })

export const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password:process.env.DB_PASSWORD
})
