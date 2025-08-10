import { useMemo, useState } from "react";
import styles from "./Card.module.css";
import { formatDate } from "../utils/dateUtils";

type CardProps = {
  id: number;
  clicks: number;
  firstClickedAt: string | null;
  onClick: (id: number) => void;
};

export const Card: React.FC<CardProps> = ({
  id,
  clicks,
  firstClickedAt,
  onClick,
}) => {
  const rotation = useMemo(() => Math.random() * 10 - 5, []);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const offsetY = useMemo(() => Math.random() * 40 - 10, []);
  const offsetX = useMemo(() => Math.random() * 20 - 10, []);

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
        {formatDate(firstClickedAt) ?? "—"}
      </p>
    </div>
  );
};
