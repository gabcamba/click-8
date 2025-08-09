import type { CardData } from "../types/Card";
import { Card } from "./Card";
import styles from "./CardGrid.module.css";

type CardGridProps = {
  cards: CardData[];
  handleClick: (id: number) => void;
};

const CardGrid = ({ cards, handleClick }: CardGridProps) => {
  return (
    <div className={styles.cardGrid}>
      {cards.map((card) => (
        <Card
          onClick={() => handleClick(card.id)}
          key={card.id}
          id={card.id}
          clicks={card.clicks}
          firstClickedAt={card.first_clicked_at}
        />
      ))}
    </div>
  );
};

export default CardGrid;
