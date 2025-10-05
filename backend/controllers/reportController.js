import { Pool } from "pg";

const pool = new Pool({
  user: "your_pg_user",
  host: "localhost",
  database: "bolt_db",
  password: "your_pg_password",
  port: 5432,
});

export const getReports = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reports ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createReport = async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO reports (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
