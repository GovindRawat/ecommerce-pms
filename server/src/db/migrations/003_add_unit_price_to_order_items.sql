ALTER TABLE order_items
ADD COLUMN unit_price NUMERIC(10,2) 
NOT NULL 
DEFAULT 0 
CHECK (unit_price >= 0);
