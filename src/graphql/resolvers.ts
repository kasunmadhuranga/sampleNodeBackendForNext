import { ProductService } from "../services/productService";
import { Product } from "../types/product";

export const resolvers = {
  products: async (): Promise<Product[]> => {
    return ProductService.getAllProducts();
  },
  
  product: async ({ id }: { id: string }): Promise<Product | null> => {
    return ProductService.getProductById(id);
  },

  createProduct: async ({ input }: { input: any }): Promise<Product> => {
    return ProductService.createProduct(input);
  },

  updateProduct: async ({ id, input }: { id: string; input: any }): Promise<Product> => {
    return ProductService.updateProduct(id, input);
  },

  deleteProduct: async ({ id }: { id: string }): Promise<boolean> => {
    return ProductService.deleteProduct(id);
  },
};