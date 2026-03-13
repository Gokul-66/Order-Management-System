
# API Testing Guide

## Create Manufacturer

api post - http://localhost:3000/api/manufacturers
{
  "name": "John Smith",
  "companyName": "Tech Manufacturing Ltd"
}

result ;{
    "success": true,
    "data": {
        "name": "John Smith",
        "companyName": "Tech Manufacturing Ltd",
        "_id": "69b4052d169c7f10a00c59d2",
        "createdAt": "2026-03-13T12:38:05.598Z",
        "updatedAt": "2026-03-13T12:38:05.598Z",
        "manufacturerCode": "MFR-001",
        "__v": 0
    }
}

## Create Sellers

POST /api/sellers
http://localhost:3000/api/sellers
body = {
  "name": "Michael Brown",
  "companyName": "ElectroMart"
}
result 
{
    "success": true,
    "data": {
        "name": "Michael Brown",
        "companyName": "ElectroMart",
        "_id": "69b405d80282321f52f0eb18",
        "createdAt": "2026-03-13T12:40:56.277Z",
        "updatedAt": "2026-03-13T12:40:56.277Z",
        "sellerCode": "SEL-001",
        "__v": 0
    }
}
body = {
  "name": "Michael Brown",
  "companyName": "ElectroMart"
}
{
    "success": true,
    "data": {
        "name": "David Wilson",
        "companyName": "Gadget Hub",
        "_id": "69b4060a0282321f52f0eb1b",
        "createdAt": "2026-03-13T12:41:46.065Z",
        "updatedAt": "2026-03-13T12:41:46.065Z",
        "sellerCode": "SEL-002",
        "__v": 0
    }
}
## Create Customers

POST /api/customers
http://localhost:3000/api/customers
body = {
  "name": "Alice Johnson",
  "email": "alice@example.com"
}

result {
    "success": true,
    "data": {
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "_id": "69b406450282321f52f0eb1e",
        "createdAt": "2026-03-13T12:42:45.508Z",
        "updatedAt": "2026-03-13T12:42:45.508Z",
        "customerCode": "CUST-001",
        "__v": 0
    }
}


## Create Products

POST /api/products
http://localhost:3000/api/products
body {
  "name": "Laptop X1",
  "manufacturerId": "69b4052d169c7f10a00c59d2"
}

result = {
    "success": true,
    "data": {
        "productCode": "PROD-001",
        "name": "Laptop X1",
        "manufacturerId": "69b4052d169c7f10a00c59d2",
        "status": "instock",
        "_id": "69b407070282321f52f0eb24",
        "createdAt": "2026-03-13T12:45:59.378Z",
        "updatedAt": "2026-03-13T12:45:59.378Z",
        "__v": 0
    }
}
body = {
  "name": "Smartphone Pro",
  "manufacturerId": "69b4052d169c7f10a00c59d2"
}
{
    "success": true,
    "data": {
        "productCode": "PROD-002",
        "name": "Smartphone Pro",
        "manufacturerId": "69b4052d169c7f10a00c59d2",
        "status": "instock",
        "_id": "69b407660282321f52f0eb27",
        "createdAt": "2026-03-13T12:47:34.054Z",
        "updatedAt": "2026-03-13T12:47:34.054Z",
        "__v": 0
    }
}
body = {
   "name": "Wireless Headphones",
  "manufacturerId": "69b4052d169c7f10a00c59d2"
}
result = {
    "success": true,
    "data": {
        "productCode": "PROD-003",
        "name": "Wireless Headphones",
        "manufacturerId": "69b4052d169c7f10a00c59d2",
        "status": "instock",
        "_id": "69b407870282321f52f0eb2a",
        "createdAt": "2026-03-13T12:48:07.103Z",
        "updatedAt": "2026-03-13T12:48:07.103Z",
        "__v": 0
    }
}
## Update status

PATCH /api/products/:id/status
http://localhost:3000/api/products/69b407870282321f52f0eb2a/status

body = {
  "status": "faulty",
  "updatedById": "69b405d80282321f52f0eb18",
  "updatedByType": "seller"
}

result = {
    "success": true,
    "data": {
        "_id": "69b407870282321f52f0eb2a",
        "productCode": "PROD-003",
        "name": "Wireless Headphones",
        "manufacturerId": "69b4052d169c7f10a00c59d2",
        "status": "faulty",
        "createdAt": "2026-03-13T12:48:07.103Z",
        "updatedAt": "2026-03-13T12:50:22.037Z",
        "__v": 0,
        "lastUpdatedBy": "69b405d80282321f52f0eb18",
        "updatedByType": "seller"
    }
}

PATCH = http://localhost:3000/api/products/69b407660282321f52f0eb27/status
body = {
  "status": "outofstock",
  "updatedById": "69b4052d169c7f10a00c59d2",
  "updatedByType": "manufacturer"
}

result = {
    "success": true,
    "data": {
        "_id": "69b407660282321f52f0eb27",
        "productCode": "PROD-002",
        "name": "Smartphone Pro",
        "manufacturerId": "69b4052d169c7f10a00c59d2",
        "status": "outofstock",
        "createdAt": "2026-03-13T12:47:34.054Z",
        "updatedAt": "2026-03-13T12:51:44.337Z",
        "__v": 0,
        "lastUpdatedBy": "69b4052d169c7f10a00c59d2",
        "updatedByType": "manufacturer"
    }
}


## Get faulty products

GET /api/products/faulty
http://localhost:3000/api/products/faulty

result = {
    "success": true,
    "data": [
        {
            "_id": "69b407870282321f52f0eb2a",
            "productCode": "PROD-003",
            "name": "Wireless Headphones",
            "manufacturerId": "69b4052d169c7f10a00c59d2",
            "status": "faulty",
            "createdAt": "2026-03-13T12:48:07.103Z",
            "updatedAt": "2026-03-13T12:50:22.037Z",
            "__v": 0,
            "lastUpdatedBy": "69b405d80282321f52f0eb18",
            "updatedByType": "seller"
        }
    ],
    "pagination": {
        "page": 1,
        "limit": 10,
        "total": 1,
        "pages": 1
    }
}
## Create Orders
ORDERS
POST http://localhost:3000/api/orders

1 body = {
  "productId": "69b407070282321f52f0eb24",
  "sellerId": "69b405d80282321f52f0eb18",
  "customerId":"69b406450282321f52f0eb1e",
  "quantity": 2,
  "price": 500,
  "totalAmount": 1000
}

result = {
    "success": true,
    "data": {
        "orderCode": "ORD-001",
        "productId": "69b407070282321f52f0eb24",
        "sellerId": "69b405d80282321f52f0eb18",
        "customerId": "69b406450282321f52f0eb1e",
        "quantity": 2,
        "price": 500,
        "totalAmount": 1000,
        "_id": "69b4091f0282321f52f0eb35",
        "createdAt": "2026-03-13T12:54:55.179Z",
        "updatedAt": "2026-03-13T12:54:55.179Z",
        "__v": 0
    }
}
2 body {
  "productId": "69b407870282321f52f0eb2a",
  "sellerId": "69b4060a0282321f52f0eb1b",
  "customerId": "69b406450282321f52f0eb1e",
  "quantity": 1,
  "price": 500,
  "totalAmount": 500
}
result {
    "success": true,
    "data": {
        "orderCode": "ORD-002",
        "productId": "69b407870282321f52f0eb2a",
        "sellerId": "69b4060a0282321f52f0eb1b",
        "customerId": "69b406450282321f52f0eb1e",
        "quantity": 1,
        "price": 500,
        "totalAmount": 500,
        "_id": "69b409a40282321f52f0eb38",
        "createdAt": "2026-03-13T12:57:08.289Z",
        "updatedAt": "2026-03-13T12:57:08.289Z",
        "__v": 0
    }
}
3 body = {
  "productId": "69b407070282321f52f0eb24",
  "sellerId":  "69b405d80282321f52f0eb18",
  "customerId":  "69b406450282321f52f0eb1e",
  "quantity": 3,
  "price": 300,
  "totalAmount": 900
}
result = {
    "success": true,
    "data": {
        "orderCode": "ORD-003",
        "productId": "69b407070282321f52f0eb24",
        "sellerId": "69b405d80282321f52f0eb18",
        "customerId": "69b406450282321f52f0eb1e",
        "quantity": 3,
        "price": 300,
        "totalAmount": 900,
        "_id": "69b409e50282321f52f0eb3b",
        "createdAt": "2026-03-13T12:58:13.451Z",
        "updatedAt": "2026-03-13T12:58:13.451Z",
        "__v": 0
    }
}

## Get Orders based on pagination
PAGINATION 
GET http://localhost:3000/api/orders?page=1&limit=5

## Get Most Ordered Products 
Most Ordered Products 
GET http://localhost:3000/api/orders/reports/most-ordered-products

## Get Monthly Revenue 
Monthly Revenue 
GET http://localhost:3000/api/orders/reports/monthly-revenue

result ={
    "success": true,
    "data": [
        {
            "_id": {
                "year": 2026,
                "month": 3
            },
            "totalRevenue": 3300,
            "totalOrders": 4
        }
    ]
}