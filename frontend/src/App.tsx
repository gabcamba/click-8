import CardGrid from "./components/CardGrid";
import { Buttons } from "./components/Buttons";
import { useCards } from "./hooks/useCards";
import { useTheme } from "./hooks/useTheme";
import "./App.css";

function App() {
  const { cards, handleClick, handleReset, handleSort } = useCards();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Buttons
        theme={theme}
        onReset={handleReset}
        onSort={handleSort}
        onToggleTheme={toggleTheme}
      />
      <CardGrid cards={cards} handleClick={handleClick} />
    </>
  );
}

export default App;
