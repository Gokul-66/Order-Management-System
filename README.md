Order Management System (OMS)

A backend Order Management System API built with Node.js, Express, and MongoDB Atlas.
The system manages manufacturers, sellers, customers, products, and orders, and provides reporting APIs.

Tech Stack

Node.js

Express.js

MongoDB Atlas

Mongoose

Postman (API Testing)

Project Architecture

The project follows a service-based architecture.

Routes → Controllers → Services → Models → MongoDB

Example request flow:

API Request
   ↓
Route
   ↓
Controller
   ↓
Service (Business Logic)
   ↓
Model
   ↓
MongoDB
Features

Manufacturer management

Seller management

Customer management

Product management

Product status updates (seller or manufacturer)

Order creation

Pagination support

Aggregation reports

Reports include:

Most Ordered Products
Monthly Revenue
Setup Instructions
1. Clone Repository
git clone <repository-url>
cd order-management-system
2. Install Dependencies
npm install
3. Environment Variables

Create .env file based on .env.example

Example:

PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
4. Run Server
npm run dev

Server will start at:

http://localhost:3000
API Testing Flow

Create data in this order to ensure required references exist.

1. Manufacturer
2. Seller
3. Customer
4. Product
5. Order
API Endpoints
Create Manufacturer
POST /api/manufacturers

Body

{
  "name": "John Smith",
  "companyName": "Tech Manufacturing Ltd"
}
Create Seller
POST /api/sellers

Body

{
  "name": "Michael Brown",
  "companyName": "ElectroMart"
}
Create Customer
POST /api/customers

Body

{
  "name": "Alice Johnson",
  "email": "alice@example.com"
}
Create Product
POST /api/products

Body

{
  "name": "Laptop X1",
  "manufacturerId": "MANUFACTURER_OBJECT_ID"
}
Update Product Status
PATCH /api/products/:id/status

Body

{
  "status": "faulty",
  "updatedById": "SELLER_OR_MANUFACTURER_ID",
  "updatedByType": "seller"
}

Status values:

instock
outofstock
faulty
Get Faulty Products
GET /api/products/faulty

Supports pagination.

Create Order
POST /api/orders

Body

{
  "productId": "PRODUCT_ID",
  "sellerId": "SELLER_ID",
  "customerId": "CUSTOMER_ID",
  "quantity": 2,
  "price": 500,
  "totalAmount": 1000
}
Pagination

Orders support pagination.

Example:

GET /api/orders?page=1&limit=5

Response format:

{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 5,
    "pages": 1
  }
}
Reports
Most Ordered Products
GET /api/orders/reports/most-ordered-products
Monthly Revenue
GET /api/orders/reports/monthly-revenue

Example response:

{
  "success": true,
  "data": [
    {
      "year": 2026,
      "month": 3,
      "totalRevenue": 3300,
      "totalOrders": 4
    }
  ]
}
Postman Api
Md file is used to test Api's

Database Backup

Database backup is included in:

db-backup/dump

Project Structure
order-management-system
│
├── config
├── controllers
├── services
├── models
├── routes
│
├── db-backup
├── postman
│
├── server.js
├── package.json
├── README.md
└── .env.example
Notes

Readable codes are generated automatically for each entity:

MFR-001
SEL-001
CUST-001
PROD-001
ORD-001

MongoDB ObjectIds are used for relationships between collections.
