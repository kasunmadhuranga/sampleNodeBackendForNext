import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db";

dotenv.config();

const app = express();

// Allow requests from your frontend
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public."productTable" ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
