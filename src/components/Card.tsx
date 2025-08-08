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
}) => (
  <div onClick={() => onClick(id)} className="card">
    <h2>Card {id}</h2>
    <p>Clicks: {clicks}</p>
    <p>First Click: {firstClickedAt ?? "—"}</p>
  </div>
);
