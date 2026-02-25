# 📰 Eskalate News API

A production-ready News Backend built using:

-   Node.js
-   Express
-   TypeScript
-   Prisma ORM
-   PostgreSQL (Render Cloud Database)
-   Redis (Caching Layer)
-   JWT Authentication
-   RBAC (Role-Based Access Control)
-   Cursor-based Pagination
-   Swagger API Documentation
-   Docker

------------------------------------------------------------------------

## 🚀 Overview

This system allows:

-   Authors to create and manage articles
-   Readers to consume published content
-   High-frequency engagement tracking
-   Daily analytics aggregation (GMT timezone)
-   Scalable architecture with caching support

Designed with production-level backend practices.

------------------------------------------------------------------------

# 🏗 Architecture

## Database

-   PostgreSQL hosted on Render Cloud
-   Managed using Prisma ORM
-   Optimized with indexes for filtering and analytics

## Caching Layer

-   Redis used for:
    -   Public feed caching
    -   Reducing database load
    -   Improving response performance

## Analytics Strategy

-   Raw `ReadLog` events stored
-   Aggregated daily into `DailyAnalytics`
-   Upsert strategy prevents duplicates
-   GMT timezone enforced

------------------------------------------------------------------------

# 🔐 Authentication & Authorization

## Authentication

-   JWT-based authentication
-   24-hour expiration
-   JWT payload includes:
    -   `sub` (userId)
    -   `role`

## Authorization

Role-based middleware: - Author-only routes - Reader-only routes -
Protected routes

------------------------------------------------------------------------

# 📰 Features

## Authentication

POST /auth/signup\
POST /auth/login

## Author Features

POST /articles\
PATCH /articles/:id\
DELETE /articles/:id\
GET /articles/me\
GET /author/dashboard

## Public Feed

GET /articles

Supports query parameters:

?category=Tech\
?author=John\
?q=AI\
?cursor=`<articleId>`{=html}&limit=10

## Engagement Tracking

GET /articles/:id

-   Creates non-blocking ReadLog entry
-   Supports guest and authenticated reads

------------------------------------------------------------------------

# ⚡ Performance Optimizations

## Redis Caching

Cache key format:

articles:{category}:{author}:{q}:{cursor}

TTL: 60 seconds (configurable)

## Cursor-Based Pagination

GET /articles?cursor=`<lastArticleId>`{=html}&limit=10

Advantages: - Better performance than offset pagination - Scales well
with large datasets

------------------------------------------------------------------------

# 🛡 Abuse Prevention Strategy

To prevent artificial view inflation:

-   Daily aggregation model
-   Optional rate limiting
-   Deduplication within short intervals
-   Redis throttling

------------------------------------------------------------------------

# 📚 Swagger API Documentation

Available at:

http://localhost:3000/api-docs

------------------------------------------------------------------------

# 🐳 Docker Support

Build:

docker build -t eskalate-news-api .

Run:

docker run -p 3000:3000 eskalate-news-api

------------------------------------------------------------------------

# 🛠 Setup Instructions

## 1️⃣ Clone Repository

git clone `<your-repo-url>`{=html}\
cd eskalate-news-api

## 2️⃣ Install Dependencies

npm install

## 3️⃣ Create .env file

DATABASE_URL=your_render_postgres_url\
JWT_SECRET=your_secret_key\
REDIS_URL=redis://localhost:6379\
PORT=3000

## 4️⃣ Run Migration

npx prisma migrate deploy

## 5️⃣ Start Server

npm run dev

------------------------------------------------------------------------

# 📁 Project Structure

src/\
├── config/\
├── controllers/\
├── middleware/\
├── routes/\
├── jobs/\
├── utils/\
├── types/\
└── server.ts

------------------------------------------------------------------------

# 🏆 Production Ready Features

-   Clean architecture
-   Strong validation
-   RBAC security
-   Soft delete lifecycle
-   Event logging system
-   Aggregation engine
-   Cache layer integration
-   Cursor-based pagination
-   Cloud database integration
-   Docker containerization

------------------------------------------------------------------------

