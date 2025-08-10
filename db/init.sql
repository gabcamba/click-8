CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    clicks INT DEFAULT 0,
    first_clicked_at TIMESTAMP
);

INSERT INTO cards (clicks)
SELECT 0
FROM generate_series(1, 8);


