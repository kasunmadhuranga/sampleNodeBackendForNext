import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import corsMiddleware from "./middleware/cors";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Build GraphQL schema
const schema = buildSchema(typeDefs);

// GraphQL endpoint
app.use('/graphql', createHandler({
  schema,
  rootValue: resolvers,
}));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

export default app;