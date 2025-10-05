// backend/server.js
import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

app.listen(5000, () => console.log("Simulated Express backend running on port 5000"));
