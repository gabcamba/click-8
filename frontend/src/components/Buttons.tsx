import { MoonStar, Sun } from "lucide-react";
import {
  ASC,
  CLICKS,
  DESC,
  FIRST_CLICKED_AT,
  type SortField,
  type SortOrder,
} from "../constants/constants";
import styles from "./CardGrid.module.css";

interface ActionButtonsProps {
  theme: "light" | "dark";
  onReset: () => void;
  onSort: (key: SortField, order: SortOrder) => void;
  onToggleTheme: () => void;
}

export const Buttons = ({
  theme,
  onReset,
  onSort,
  onToggleTheme,
}: ActionButtonsProps) => {
  const buttons = [
    { label: "clear", onClick: onReset },
    { label: "sort by click count", onClick: () => onSort(CLICKS, DESC) },
    {
      label: "sort by first click date",
      onClick: () => onSort(FIRST_CLICKED_AT, ASC),
    },
    {
      label: theme === "light" ? <MoonStar /> : <Sun />,
      onClick: onToggleTheme,
    },
  ];

  return (
    <div className="btn-container">
      {buttons.map((btn, index) => (
        <button key={index} className={styles.button} onClick={btn.onClick}>
          {btn.label}
        </button>
      ))}
    </div>
  );
};
