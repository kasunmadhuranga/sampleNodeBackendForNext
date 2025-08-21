import { Request, Response } from "express";
import pool from "../config/database";
import { Product } from "../types/product";

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query<Product>('SELECT * FROM public."productTable" ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};