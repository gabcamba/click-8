import express from "express";
import cors from "cors";
import cardsRouter from "./routes/cards";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cards", cardsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
