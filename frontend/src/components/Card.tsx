import { useMemo, useState } from "react";
import styles from "./Card.module.css";

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

  const scale = pressed ? 0.9 : hovered ? 1.1 : 1;

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: `
          translateY(${offsetY}px)
          translateX(${offsetX}px)
          rotate(${hovered ? 0 : rotation}deg)
          scale(${scale})
        `,
        zIndex: hovered ? 10 : 1,
        boxShadow: hovered
          ? "0 10px 25px rgba(0, 0, 0, 0.2)"
          : "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1>{id}</h1>
      <p>Clicks: {clicks}</p>
      <p>First Click: {firstClickedAt ?? "—"}</p>
    </div>
  );
};
