import { useState } from "react";
import styles from "./Card.module.css";
import { formatDate } from "../utils/dateUtils";

type CardProps = {
  id: number;
  clicks: number;
  first_clicked_at: string | null;
  onClick: (id: number) => void;
};

export const Card: React.FC<CardProps> = ({
  id,
  clicks,
  first_clicked_at,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 100);
    onClick(id);
  };

  const scale = pressed ? 0.9 : hovered ? 1.03 : 1;

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: `
          scale(${scale})
        `,
        zIndex: hovered ? 10 : 1,
        boxShadow: hovered
          ? "0 10px 25px rgba(0, 0, 0, 0.2)"
          : "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1>{id}</h1>
      <p>clicks: {clicks}</p>
      <h6>first click:</h6>
      <p style={{ whiteSpace: "pre-line" }}>
        {formatDate(first_clicked_at) ?? "—"}
      </p>
    </div>
  );
};
