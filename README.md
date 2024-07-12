# Grocery Store Web Application
<br>

**Project video link :**   [Watch Video](https://drive.google.com/file/d/1grHevDyDm_bEYvLIAL8fCAYTtPxibOm-/view?usp=sharing)

## Project Description

This is a multipage responsive web application named **“Online Grocery Store.”** The first page is a login page; if you are a normal user (customer), you can register and log in as a normal user; if you are a manager, you can register and log in as a manager; and if you are an admin, then you can only log in (registration for admin is not allowed). Different features are: 

- Login
- Register
- Landing page for normal users
- Landing page for managers
- Landing page for admin
- Search-product
- Search-category
- Filter (based on price range)
- Settings (for a user to select which type of report he/she wants to receive i.e. HTML or text)
- A daily reminder for a user in case he/she has not bought anything that day
- Monthly progress report for a user
- For managers, an option to download details of products in inventory as CSV file
- Caching

### Extra features

- You can give a discount on products
- An accessibility menu is available for users who are color-blind or have other visual impairments

## About Database

It uses an SQLite database and contains eight tables: RolesUsers, User, Role, Category, Product, category_product, ShoppingCart, and Orders.

- **User:** The user table stores different details about users (normal user, manager, and admin)
- **Role:** The role table lists the different types of roles defined i.e. normal_user, manager, and admin
- **RolesUsers:** This RolesUsers table is a many-to-many relationship table between the User and Role tables.
- **Category:** The category table stores different names of categories/sections.
- **Product:** The product table stores different features of a product like product_id, product_name, manufacture date, expiry date, quantity, unit, price, discount, etc.
- **Category_product:** The Category_Product table is a relationship table between the category table and the product table.
- **ShoppingCart:** This table stores the items selected for buying by the customers.
- **Orders:** This table stores the items ordered by the customers.

## About APIs

- CRUD for categories
- CRUD for products

## Technologies Used

- Python
- Flask (for creating the web application)
- Sqlalchemy (for creating the database)
- Flask_restful
- HTML
- CSS
- JavaScript
- Vue 2 (for frontend)
- Vuex (Vue’s state management library)
- Bootstrap
- Flask-caching

