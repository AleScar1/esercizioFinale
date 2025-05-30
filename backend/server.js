import express from 'express';
import "dotenv/config";
import db from './db.js';
import cors from "cors";
import authorsRoutes from "./routes/author.route.js";
import postsRoutes from "./routes/blogPost.route.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import './middlewares/OAuthMiddleware.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/authors", authorsRoutes);
app.use("/posts", postsRoutes);
app.use("/blogPosts", postsRoutes)
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

db();

app.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT);
});