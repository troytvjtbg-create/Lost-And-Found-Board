CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'Unclaimed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO items (title, description, category, location) VALUES
('Blue Water Flask', 'AquaFlask blue color, left at Lab 3', 'Lost', 'Computer Lab 3'),
('Black Umbrella', 'Folding black umbrella near canteen', 'Found', 'Campus Canteen');
