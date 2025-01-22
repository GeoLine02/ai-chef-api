import dotenv from "dotenv";
import { Pool } from "pg";
import { dbConfig } from "../config/index";

// Load environment variables
dotenv.config({ path: "../.env" });

const dbPoolSettings = {
  min: 1,
  max: 5,
};

// Create a PostgreSQL connection pool
const pool = new Pool({
  ...dbConfig,
  ...dbPoolSettings,
});

export default pool;
