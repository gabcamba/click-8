import { useState, useEffect } from "react";
import { getCards, incrementClick, resetCards } from "../api/cards";
import type { CardData } from "../types/Card";
import {
  FIRST_CLICKED_AT,
  ASC,
  type SortField,
  type SortOrder,
} from "../constants/constants";

export const useCards = () => {
  const [cards, setCards] = useState<CardData[]>([]);

  const fetchCards = async (sort?: SortField, order?: SortOrder) => {
    try {
      const fetchedCards = await getCards(sort, order);
      setCards(fetchedCards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handleClick = async (id: number) => {
    try {
      await incrementClick(id);
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === id
            ? {
                ...card,
                clicks: card.clicks + 1,
                first_clicked_at:
                  card.first_clicked_at ?? new Date().toISOString(),
              }
            : card
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = async () => {
    try {
      await resetCards();
      await fetchCards();
    } catch (error) {
      console.error("Error resetting cards:", error);
    }
  };

  const handleSort = (key: SortField, order: SortOrder) => {
    fetchCards(key, order);
  };

  useEffect(() => {
    fetchCards(FIRST_CLICKED_AT, ASC);
  }, []);

  return { cards, handleClick, handleReset, handleSort };
};
