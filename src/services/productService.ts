import pool from "../config/database";
import { Product } from "../types/product";

export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    const result = await pool.query<Product>('SELECT * FROM public."productTable" ORDER BY id ASC');
    return result.rows;
  }

  static async getProductById(id: string): Promise<Product | null> {
    const result = await pool.query<Product>('SELECT * FROM public."productTable" WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async createProduct(input: any): Promise<Product> {
    const { name, description, price, stock = 0, category, image_url } = input;
    const result = await pool.query<Product>(
      `INSERT INTO public."productTable" (name, description, price, stock, category, image_url) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description, price, stock, category, image_url]
    );
    return result.rows[0];
  }

  static async updateProduct(id: string, input: any): Promise<Product> {
    const { name, description, price, stock, category, image_url } = input;
    const result = await pool.query<Product>(
      `UPDATE public."productTable" 
       SET name = COALESCE($1, name), description = COALESCE($2, description), 
           price = COALESCE($3, price), stock = COALESCE($4, stock), 
           category = COALESCE($5, category), image_url = COALESCE($6, image_url), 
           updated_at = NOW() 
       WHERE id = $7 RETURNING *`,
      [name, description, price, stock, category, image_url, id]
    );
    return result.rows[0];
  }

  static async deleteProduct(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM public."productTable" WHERE id = $1 RETURNING id', [id]);
    return result.rows.length > 0;
  }
}