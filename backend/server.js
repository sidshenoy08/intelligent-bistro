import "dotenv/config";
import express from "express";
import cors from "cors";
import { orderRouter } from "./src/routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", orderRouter);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Intelligent Bistro backend running on port ${PORT}`);
});