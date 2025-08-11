import { useState } from "react";
import styles from "./Card.module.css";
import { formatDate } from "../utils/dateUtils";
import { Calendar1, MousePointerClick } from "lucide-react";

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
  const [animateClicks, setAnimateClicks] = useState(false);

  const handleClick = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 100);
    onClick(id);
    setAnimateClicks(true);
    setTimeout(() => setAnimateClicks(false), 300);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  const scale = pressed ? 0.9 : hovered ? 1.03 : 1;

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
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
      <div className={styles.details}>
        <div title="total number of clicks" className={styles.detailContainer}>
          <MousePointerClick />
          <h4
            className={animateClicks ? styles.clicksAnimate : styles.detailText}
          >
            {`${clicks} click${clicks !== 1 ? "s" : ""}`}
          </h4>
        </div>
        <div title="first clicked date" className={styles.detailContainer}>
          <Calendar1 size={24} />
          <h5 className={styles.detailText}>{formatDate(first_clicked_at)}</h5>
        </div>
      </div>
    </div>
  );
};
