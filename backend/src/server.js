// Imports
// Import Dependencies
import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
config({ path: "./.env" });

// Import Routes
import apiProducts from "./routes/apiProducts.routes.js";
import authRouter from "./routes/authUsers.routes.js";

// Session Store
import { makeSession } from "./config/session.manager.js";

// Variables
const app = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Init Session manager
makeSession(app);

// App Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// app.disable('x-powered-by');

// Router app
app.use(apiProducts, authRouter);
console.log(__dirname);
app.use(
  ["/login", "/logut", "/signup", "/products", "/user", "/"],
  express.static(join(__dirname, "../../client/dist/"))
);

// Public
// app.use(express.static(join(__dirname, "public")));

// Server Up
app.listen(port);
console.log(`Server up on port ${port}`);
