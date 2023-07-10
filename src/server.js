// Imports
// Import Dependencies
import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import cors from "cors";
import { engine } from "express-handlebars";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
config({ path: "./.env" });

// Import Routes
import authRouter from "./routes/authUsers.routes.js";
import apiRouter from "./routes/apiProducts.routes.js";
import routerProducts from "./routes/products.routes.js";
import starsRouter from "./routes/apiStars.routes.js";

// Import Controllers and Middlewares
import { loginView, registerView } from "./controllers/auth.constroller.js";
import { verifyToekn } from "./middlewares/verifyToken.js";
import search from "./routes/searchProducts.routes.js";
import { verifySearch } from "./middlewares/verifySearchParam.js";
import userRoutes from "./routes/userProducts.routes.js";
import { userBack } from "./routes/apiUser.routes.js";

// Variables
const app = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const oneDay = 1000 * 60 * 60;
const options = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Whether or not to automatically check for and clear expired sessions:
  clearExpired: true,
  // How frequently expired sessions will be cleared; milliseconds:
  checkExpirationInterval: 1000 * 60 * 8,
  // The maximum age of a valid session; milliseconds:
  expiration: oneDay,
};

const sessioStore = new MySQLStore(options);

// App Settings
app.set("views", join(__dirname, "views"));
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main.hbs",
    layoutsDir: join(app.get("views"), "layouts"),
    partialsDir: join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("views engine", ".hbs");

// App Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: sessioStore,
    key: "cookie_user",
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: oneDay,
    },
  })
);
// app.disable('x-powered-by');

// Router app
app.use("/auth/", authRouter);
app.use("/login", loginView);
app.use("/register", registerView);
app.use("/api/products", apiRouter);
app.use("/api/stars", starsRouter);
app.use("/api/users", userBack);
app.use("/products", routerProducts);
app.use("/search", search);
app.use("/user", verifyToekn, userRoutes);
app.get("/", (req, res) => {
  res.render("./home.hbs", { title: "Home", nav: true });
});

// Public
app.use(express.static(join(__dirname, "public")));

// Server Up
app.listen(port);
console.log(`Server up on port ${port}`);
