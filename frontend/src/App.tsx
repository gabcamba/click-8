import { useEffect, useState } from "react";
import CardGrid from "./components/CardGrid";
import "./App.css";
import { getCards, incrementClick, resetCards } from "./api/cards";
import type { CardData } from "./types/Card";
import styles from "./components/CardGrid.module.css";
import { ASC, CLICKS, DESC, FIRST_CLICKED_AT, type SortField, type SortOrder } from "./constants/constants";

function App() {
  const [cards, setCards] = useState<CardData[]>([]);

  const fetchCards = async (
    sort?: SortField,
    order?: SortOrder
  ) => {
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
      await resetCards().then(() => {
        fetchCards();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (
    key: SortField,
    order: SortOrder
  ) => {
    fetchCards(key, order);
  };

  useEffect(() => {
    fetchCards(FIRST_CLICKED_AT, ASC);
    // fetch cards by first clicked time stamp
  }, []);

  return (
    <>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          padding: "1rem",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <button className={styles.button} onClick={handleReset}>
          clear
        </button>
        <button
          className={styles.button}
          onClick={() => handleSort(CLICKS, DESC)}
        >
          sort by click count
        </button>
        <button
          className={styles.button}
          onClick={() => handleSort(FIRST_CLICKED_AT, ASC)}
        >
          sort by first click date
        </button>
      </div>
      <CardGrid cards={cards} handleClick={handleClick} />
    </>
  );
}

export default App;
