import { Card } from "./Card";

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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
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
