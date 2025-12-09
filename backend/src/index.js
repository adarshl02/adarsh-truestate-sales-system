// Import required dependencies
import express from "express"; // Express framework for building REST API
import cors from "cors"; // Middleware to handle Cross-Origin Resource Sharing
import dotenv from "dotenv"; // Load environment variables from .env file
import salesRoutes from "./routes/sales.routes.js"; // Sales API routes
import  pool  from "./utils/db.js" // Database connection pool
import logger from "./libs/logger.js" // Custom logger utility
import morgan from "morgan"; // HTTP request logger middleware

// Load environment variables from .env file
dotenv.config({
  quiet:true
});

// Initialize Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan("dev")); // Log HTTP requests in development format

// Health check endpoint
app.get("/health", (req, res) => {
  res.send("Welcome to the Sales API");
});

// Register API routes
app.use("/api/sales", salesRoutes);


// Catch-all middleware for unhandled routes (404 handler)
app.use((req, res, next) => {
  logger.warn(`Unhandled route: ${req.method} ${req.url}`);
  res.status(404).send("Route not found");
});

// Get port from environment variables or use default port 5000
const PORT = process.env.PORT || 5000;

// Database connection check - runs once on server startup
(async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Database Connected');
  } catch (error) {
    console.error('❌ Database Connection Failed:', error.message);
  }
})();

// Graceful shutdown handlers for different signals
process.on("SIGINT", () => shutdown("SIGINT")); // Ctrl+C
process.on("SIGTERM", () => shutdown("SIGTERM")); // Termination signal
process.on("SIGUSR2", () => shutdown("SIGUSR2")); // User-defined signal 2

// Start Express server and listen on specified PORT
const server = app.listen(PORT, () => {
  logger.info("Welcome To Sales API");
  logger.info(`Sales API Listening On Port ${PORT}`);
});
