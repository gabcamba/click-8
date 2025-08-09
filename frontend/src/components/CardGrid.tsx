import { Card } from "./Card";
import styles from "./CardGrid.module.css";
type CardData = {
  id: number;
  clickCount: number;
  firstClickedAt: string | null;
};

type CardGridProps = {
  cards: CardData[];
};

const CardGrid = ({ cards }: CardGridProps) => {
  return (
    <div className={styles.cardGrid}>
      {cards.map((card) => (
        <Card
          onClick={() => console.log(card.id)}
          key={card.id}
          id={card.id}
          clicks={card.clickCount}
          firstClickedAt={card.firstClickedAt}
        />
      ))}
    </div>
  );
};

export default CardGrid;
