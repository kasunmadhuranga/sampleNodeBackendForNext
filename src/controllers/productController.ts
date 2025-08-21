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

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, stock = 0, category, image_url } = req.body;
    const result = await pool.query<Product>(
      `INSERT INTO public."productTable" (name, description, price, stock, category, image_url) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description, price, stock, category, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product", details: error instanceof Error ? error.message : String(error) });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, image_url } = req.body;
    const result = await pool.query<Product>(
      `UPDATE public."productTable" 
       SET name = $1, description = $2, price = $3, stock = $4, category = $5, image_url = $6, updated_at = NOW() 
       WHERE id = $7 RETURNING *`,
      [name, description, price, stock, category, image_url, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM public."productTable" WHERE id = $1 RETURNING id',
      [id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};