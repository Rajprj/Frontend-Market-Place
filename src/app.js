import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Fix for __dirname with ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Views in src/views

// Middleware
app.use(express.json({ limit: "21kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, '../public'))); // Public folder one level up
app.use(cookieParser());
app.use('/images', express.static('/public'));


// Routes
import {userRouter} from "./routes/user.route.js";
import { adminRouter } from "./routes/admin.route.js";
app.use("/users", userRouter);
app.use("/admin", adminRouter);

export { app };