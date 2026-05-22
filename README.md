# MyLogbook

MyLogbook is a simple visitor logbook for recording who comes into a building, why they are there, when they arrived, and when they leave.

I built it as a small full-stack project to replace the usual paper visitor book with something cleaner, searchable, and easier to manage. The app has a check-in screen for new visitors and an activity page where visitor records can be viewed, filtered, searched, signed out, or removed.

## What It Does

- Registers visitors with their name, organisation, purpose of visit, contact, and tag number
- Automatically records the visitor's check-in time
- Shows visitor activity for a selected date
- Filters visitors by status, such as currently in the building or signed out
- Searches logs by visitor name or organisation
- Allows visitors to be signed out with a recorded time-out
- Supports deleting visitor records when needed

## Tech Stack

**Frontend**

- React
- Vite
- Tailwind CSS
- Axios
- React Router

**Backend**

- Node.js
- Express
- Prisma
- PostgreSQL

## Project Structure

```text
my-logbook/
+-- backend/
|   +-- prisma/
|   +-- src/
|   |   +-- routes/
|   |   +-- prismaClient.js
|   |   +-- server.js
|   +-- package.json
|
+-- frontend/
|   +-- src/
|   |   +-- components/
|   |   +-- pages/
|   |   +-- App.jsx
|   +-- package.json
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/my-logbook.git
cd my-logbook
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and add your database connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/mylogbook"
```

If you want to run PostgreSQL with Docker, there is a `docker-compose.yaml` file in the backend folder:

```bash
docker compose up -d
```

Run the Prisma migration:

```bash
npx prisma migrate dev
```

Start the backend server:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:9000
```

### 3. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on the local Vite URL shown in your terminal, usually:

```text
http://localhost:5173
```

## API Routes

```text
GET    /api/visitorlogs
GET    /api/visitorlogs?date=YYYY-MM-DD
POST   /api/visitorlogs
PUT    /api/visitorlogs/:id
DELETE /api/visitorlogs/:id
```

## Why I Built This

MyLogbook started as a practical way to manage visitor records in a more organized way. The goal was not to make something overly complicated, but to build a clean system that handles the basics well: check people in, keep the records visible, and make it easy to know who is still in the building.

It is also a learning project for working across a full-stack app: React on the frontend, Express on the backend, and Prisma with PostgreSQL for the database.

## Future Improvements

- Add authentication for admin users
- Add visitor photo or ID upload
- Export logs as CSV or PDF
- Add dashboard statistics
- Improve mobile layout and accessibility
- Add stronger validation for phone numbers and tag numbers

## Author

Built by Andy-Fidel Jude Fiifi.
