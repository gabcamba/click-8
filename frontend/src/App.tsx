import { useEffect, useState } from "react";

import CardGrid from "./components/CardGrid";
import { getCards, incrementClick, resetCards } from "./api/cards";
import type { CardData } from "./types/Card";

import "./App.css";
import styles from "./components/CardGrid.module.css";
import {
  ASC,
  CLICKS,
  DESC,
  FIRST_CLICKED_AT,
  type SortField,
  type SortOrder,
} from "./constants/constants";

function App() {
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

  const BUTTONS = [
    { label: "clear", onClick: handleReset },
    { label: "sort by click count", onClick: () => handleSort(CLICKS, DESC) },
    {
      label: "sort by first click date",
      onClick: () => handleSort(FIRST_CLICKED_AT, ASC),
    },
  ];

  useEffect(() => {
    fetchCards(FIRST_CLICKED_AT, ASC);
    // fetch cards by first clicked time stamp
  }, []);

  return (
    <>
      <div className="btn-container">
        {BUTTONS.map((btn, index) => (
          <button key={index} className={styles.button} onClick={btn.onClick}>
            {btn.label}
          </button>
        ))}
      </div>
      <CardGrid cards={cards} handleClick={handleClick} />
    </>
  );
}

export default App;
