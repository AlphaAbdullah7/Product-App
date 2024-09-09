import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
import router from "./routes/productRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
	dbConnect();
	console.log(`Server is running on port ${PORT}`);
});
