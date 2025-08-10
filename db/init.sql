CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    clicks INT DEFAULT 0,
    first_clicked_at TIMESTAMP
);

INSERT INTO cards (title) VALUES
('Card 1'),
('Card 2'),
('Card 3'),
('Card 4'),
('Card 5'),
('Card 6'),
('Card 7'),
('Card 8');
