import type { CardData } from "../types/Card";
import { Card } from "./Card";
import styles from "./CardGrid.module.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type CardGridProps = {
  cards: CardData[];
  handleClick: (id: number) => void;
};

const CardGrid = ({ cards, handleClick }: CardGridProps) => {
  const [parent] = useAutoAnimate()

  return (
    <div ref={parent} className={styles.cardGrid}>
      {cards.map((card) => (
        <Card
          onClick={() => handleClick(card.id)}
          key={card.id}
          id={card.id}
          clicks={card.clicks}
          first_clicked_at={card.first_clicked_at}
        />
      ))}
    </div>
  );
};

export default CardGrid;
