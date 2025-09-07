# Simple Quote Generator

#### Created by Taing Bunsou

## Brief Description:

This is just a simple quote generator that generates random quotes from a predefined list of quotes. The goal of this is just to make a simple project to practice my full stack development skills to integrate frontend, backend and database.

Tech Stack:

- UX/UI: Figma
- Frontend: NextJS, TailwindCSS, TypeScript, Shadcn UI
- Backend: NestJS, TypeScript
- Database: Neon (PostgreSQL), Drizzle ORM

## Setup Instructions:

1. Clone the repository
   ```bash
   git clone https://github.com/Bunsou/KIT---Simple-Quote-Generator-Backend.git
   cd KIT---Simple-Quote-Generator-Backend
   ```
2. Install dependencies for backend
   ```bash
   npm install
   ```
3. Set up environment variables for backend using `.env.example` as a reference
4. Run the backend server using `npm run start:dev`
5. Access the API documentation at `http://localhost:3001/api`
6. Go back to my [frontend repository](https://github.com/Bunsou/KIT---Simple-Quote-Generator-Frontend.git)

## Architecture Explanation:

This section briefly explains how the backend and database communicate.

- HTTP -> Controller
  - Incoming HTTP requests hit Nest controllers (e.g. src/quotes/quotes.controller.ts). Controllers validate input and delegate work to services.

- Controller -> Service
  - Controllers call business methods on services (e.g. src/quotes/quotes.service.ts). Services contain application logic and decide which DB operations to run.

- Service -> Drizzle (DB layer)
  - The Nest Drizzle provider (src/drizzle/drizzle.module.ts) injects a typed Drizzle client into services.
  - Services use Drizzle with the typed schema (src/drizzle/schema.ts and src/drizzle/types/drizzle.d.ts) to build and execute SQL queries.
  - Drizzle runs queries through a pg connection pool (Pool) using the DATABASE_URL/Neon connection string from environment variables.

- Database
  - Queries execute against your Neon/Postgres instance. Schema and migrations are managed with Drizzle migration SQL files.

- Cross-cutting concerns
  - Global validation and exception handling are configured in src/main.ts (ValidationPipe, HttpExceptionFilter).
  - Request logging middleware is applied via AppModule (src/middlewares/logging.middleware.ts).
  - Error handling: service/controller errors are thrown as Nest HttpExceptions and formatted by the HttpExceptionFilter.
