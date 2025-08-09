const { Router } = require("express");
import { pool } from "../db";

const router = Router();

// GET all cards
router.get("/", async (req: any, res:any) => {
  try {
    const result = await pool.query("SELECT * FROM cards ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// POST click a card
router.post("/:id/click", async (req: any, res:any) => {
  const { id } = req.params;
  try {
    await pool.query(
      `UPDATE cards
       SET clicks = clicks + 1,
           first_clicked_at = CASE
             WHEN first_clicked_at IS NULL THEN NOW()
             ELSE first_clicked_at
           END
       WHERE id = $1`,
      [id]
    );
    res.json({ message: "Card clicked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// POST reset cards
router.post("/reset", async (req: any, res:any) => {
  try {
    await pool.query("UPDATE cards SET clicks = 0, first_clicked_at = NULL");
    res.json({ message: "Cards reset" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
