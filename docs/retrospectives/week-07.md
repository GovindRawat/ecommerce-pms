# Week 7 Retrospective

## What I built

* PostgreSQL database with products, orders, and order_items tables
* Migration system with transaction safety
* Seed script with proper sequence handling
* Product controllers rewritten from in-memory arrays to SQL queries
* Validation extracted into reusable middleware
* Orders API with transaction-safe multi-table INSERT operations
* Full checkout flow: cart → POST /api/orders → order persisted in the database
* Order retrieval endpoint using SQL JOINs to fetch order details with product names

## The biggest shift this week

The biggest shift was seeing data survive a server restart. Before this week, everything was stored in memory and disappeared whenever the server stopped. After moving to PostgreSQL, I could create products and orders, restart the server, and still see the same data. That made the project feel much more like a real application instead of a temporary demo.

## SQL concepts I'm now comfortable with

* CREATE TABLE and schema design
* Primary keys and foreign keys
* SERIAL auto-increment IDs
* NOT NULL constraints
* CHECK constraints
* NUMERIC(10,2) for money values
* INSERT, SELECT, UPDATE, DELETE queries
* Parameterized queries ($1, $2, etc.)
* SQL injection prevention
* Transactions (BEGIN, COMMIT, ROLLBACK)
* JOIN queries
* ON DELETE CASCADE
* ON DELETE RESTRICT
* Database migrations
* Seed scripts
* Connection pools
* ORDER BY clauses
* RETURNING * after INSERT and UPDATE