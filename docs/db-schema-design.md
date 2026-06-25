# Database Schema Design

## Products Table

### What columns does it need?

* id
* name
* description
* price
* image
* in_stock
* created_at
* updated_at

### What are the data types?

 Column      | Data Type     
 ----------- | ------------- 
 id          | SERIAL        
 name        | VARCHAR(255)  
 description | TEXT          
 price       | NUMERIC(10,2) 
 image       | TEXT          
 in_stock    | BOOLEAN       
 created_at  | TIMESTAMPTZ   
 updated_at  | TIMESTAMPTZ   

### Which column is the primary key?

The primary key should be:
* `id`
Because every product needs a unique identifier.

### Should any columns have NOT NULL constraints?

Yes. The following columns should be NOT NULL:
* name
* description
* price
* image
* in_stock
* created_at
* updated_at
This ensures that important product information is always present.

### Should price be NUMERIC(10,2) or FLOAT?

I would use **NUMERIC(10,2)**.
Reason:
Money requires exact decimal precision. FLOAT stores approximate values and can create rounding errors such as:
0.1 + 0.2 = 0.30000000000000004
In an e-commerce application, even small rounding errors can cause incorrect totals and payment calculations. NUMERIC(10,2) stores exact decimal values and is the standard choice for money.

## What would a users table look like?

The users table would store customer account information.

 Column        | Data Type    
 ------------- | ------------ 
 id            | SERIAL       
 name          | VARCHAR(255) 
 email         | VARCHAR(255) 
 password_hash | TEXT         
 created_at    | TIMESTAMPTZ  
 updated_at    | TIMESTAMPTZ  

Primary Key:
* id

Important Notes:
* email should be UNIQUE.
* Store password hashes, never plain-text passwords.

## What would an orders table look like?

The orders table would store each purchase made by a user.
 Column       | Data Type     
 ------------ | ------------- 
 id           | SERIAL        
 user_id      | INTEGER       
 total_amount | NUMERIC(10,2) 
 status       | VARCHAR(50)   
 created_at   | TIMESTAMPTZ   
 updated_at   | TIMESTAMPTZ   

Primary Key:
* id

Foreign Key:
* user_id references users(id)

## What would an order_items table look like?

The order_items table connects products and orders.

 Column     | Data Type     
 ---------- | ------------- 
 id         | SERIAL        
 order_id   | INTEGER       
 product_id | INTEGER      
 quantity   | INTEGER       
 unit_price | NUMERIC(10,2) 

Primary Key:
* id

Foreign Keys:
* order_id references orders(id)
* product_id references products(id)

Important Note:
* unit_price is stored so that old orders remain accurate even if product prices change later.

# Relationships

users
│
└───< orders
│
└───< order_items >──── products

Relationship Summary:

* One user can have many orders.
* One order can have many order items.
* One product can appear in many order items.
* order_items acts as the bridge between orders and products.
