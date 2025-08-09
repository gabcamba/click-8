import CardGrid from "./components/CardGrid";
import './App.css'

function App() {
  const mockData = [
    {
      id: 1,
      clickCount: 3,
      firstClickedAt: "2025-08-08T12:30:00.000Z",
    },
    {
      id: 2,
      clickCount: 0,
      firstClickedAt: null,
    },
    {
      id: 3,
      clickCount: 5,
      firstClickedAt: "2025-08-08T11:20:45.000Z",
    },
    {
      id: 4,
      clickCount: 1,
      firstClickedAt: "2025-08-08T14:00:00.000Z",
    },
    {
      id: 5,
      clickCount: 0,
      firstClickedAt: null,
    },
    {
      id: 6,
      clickCount: 2,
      firstClickedAt: "2025-08-08T15:00:00.000Z",
    },
    {
      id: 7,
      clickCount: 0,
      firstClickedAt: null,
    },
    {
      id: 8,
      clickCount: 0,
      firstClickedAt: null,
    },
  ];

  return <CardGrid cards={mockData} />;
}

export default App;
