import { Router, Request, Response } from "express";
import { pool } from "../db";

const router = Router();

// GET all cards
router.get("/", async (req: Request, res: Response) => {
  try {
    const sort = (req.query.sort as string) || "id";
    const order = (req.query.order as string) || "asc";

    const validSortFields = ["id", "clicks", "first_clicked_at"];
    const validOrders = ["asc", "desc"];

    if (!validSortFields.includes(sort) || !validOrders.includes(order)) {
      return res.status(400).json({ error: "Invalid sort or order value" });
    }

    let orderBy = `${sort} ${order}`;
    if (sort !== "id") {
      orderBy += `, id ASC`;
    }

    const result = await pool.query(`SELECT * FROM cards ORDER BY ${orderBy}`);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// POST click a card
router.post("/:id/click", async (req: Request, res: Response) => {
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
router.post("/reset", async (_req, res: Response) => {
  try {
    await pool.query("UPDATE cards SET clicks = 0, first_clicked_at = NULL");
    res.json({ message: "Cards reset" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
