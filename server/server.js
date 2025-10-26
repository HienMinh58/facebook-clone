import express from "express";
import dotenv from "dotenv";
import { connect_mg, connect_pg } from "./config/db.js";
import postRoutes from "./routes/home.route.js";
import authRoutes from "./routes/auth.route.js"
import friendRoutes from "./routes/friend.route.js"
import likeRoutes from "./routes/like.route.js"
import path from "path";
const app = express()
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use("/api/likes", likeRoutes);
app.use("/api/posts", postRoutes);
app.use("/auth", authRoutes);
app.use('/api/friends', friendRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/dist")));
	app.get("/*splat", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
    connect_mg();
	connect_pg();
    console.log("Server started at http://localhost:" + PORT);
})