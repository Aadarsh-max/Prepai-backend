import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import questionRoutes from './routes/questionRoutes.js'
import { generateInterviewQuestions } from "./controllers/aiController.js";
import {generateConceptExplanation} from "./controllers/aiController.js"
import { protect } from "./middlewares/authMiddleware.js";

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"],
  })
);

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use('/api/questions' , questionRoutes);
app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(`🚀 Server running on http://localhost:${PORT}`);
