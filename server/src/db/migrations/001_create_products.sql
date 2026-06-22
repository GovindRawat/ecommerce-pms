-- Migration: 001_create_products
-- Creates the products table
CREATE TABLE IF NOT EXISTS products (
 id SERIAL PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 description TEXT NOT NULL,
 price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
 image TEXT NOT NULL,
 in_stock BOOLEAN NOT NULL DEFAULT true,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);