import express from "express";
import corsMiddleware from "./middleware/cors";
import productRoutes from "./routes/productRoutes";

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Routes
app.use("/api", productRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

export default app;