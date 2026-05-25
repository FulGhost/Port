# MyLogbook

MyLogbook is a full-stack visitor logbook for recording who enters a building, why they are there, when they arrived, and when they leave.

The app replaces a paper visitor book with a cleaner digital flow. Visitors check in from the home page, while the activity page lets staff review records by date, search by name or organisation, filter by sign-out status, and sign visitors out.

## What It Does

- Registers visitors with name, organisation, purpose of visit, contact, and tag number
- Automatically records check-in time in the database
- Shows visitor activity for a selected calendar date
- Filters visitors by `in-building` or `signed-out` status
- Searches logs by visitor name or organisation
- Signs visitors out by setting a time-out value
- Supports deleting visitor records through the API

## Tech Stack

**Frontend**

- React 19
- Vite 8
- Tailwind CSS 4
- Axios
- React Router 7

**Backend**

- Node.js
- Express 5
- Prisma 7
- `@prisma/adapter-pg`
- PostgreSQL

## Project Structure

```text
my-logbook/
+-- backend/
|   +-- prisma/
|   |   +-- migrations/
|   |   +-- schema.prisma
|   +-- src/
|   |   +-- generated/prisma/
|   |   +-- routes/
|   |   |   +-- logRoutes.js
|   |   +-- prismaClient.js
|   |   +-- server.js
|   +-- docker-compose.yaml
|   +-- Dockerfile
|   +-- package.json
|
+-- frontend/
|   +-- public/
|   +-- src/
|   |   +-- components/
|   |   +-- images/
|   |   +-- pages/
|   |   +-- App.jsx
|   |   +-- main.jsx
|   +-- vite.config.js
|   +-- package.json
```

## Getting Started

### 1. Install dependencies

From the project folder, install backend and frontend packages:

```bash
cd my-logbook/backend
npm install

cd ../frontend
npm install
```

### 2. Configure the backend

Create a `.env` file in `my-logbook/backend`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/mylogbook"
PORT=9000

POSTGRES_USER=USER
POSTGRES_PASSWORD=PASSWORD
POSTGRES_DB=mylogbook
```

`PORT=9000` matches the frontend Vite proxy in `frontend/vite.config.js`.

### 3. Run PostgreSQL

You can start the database with Docker Compose:

```bash
cd my-logbook/backend
docker compose up -d db
```

Or use any local or hosted PostgreSQL database and point `DATABASE_URL` at it.

### 4. Prepare Prisma

Run the migrations and generate the Prisma client:

```bash
cd my-logbook/backend
npx prisma migrate dev
npx prisma generate
```

The generated Prisma client is written to `backend/src/generated/prisma`.

### 5. Start the backend

```bash
cd my-logbook/backend
npm run dev
```

The backend should run at:

```text
http://localhost:9000
```

### 6. Start the frontend

Open a second terminal:

```bash
cd my-logbook/frontend
npm run dev
```

The frontend runs on the local Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Docker Compose

The backend folder includes `docker-compose.yaml` for running the database, backend, and frontend containers together:

```bash
cd my-logbook/backend
docker compose up --build
```

The compose setup exposes:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:9000`
- PostgreSQL: `localhost:5432`

## API Routes

```text
GET    /api/visitorlogs
GET    /api/visitorlogs?date=YYYY-MM-DD
POST   /api/visitorlogs
PUT    /api/visitorlogs/:id
DELETE /api/visitorlogs/:id
```

### Visitor Log Shape

```json
{
  "id": "uuid",
  "name": "Jane Doe",
  "organisation": "Example Ltd",
  "nature": "Meeting",
  "contact": "555-0100",
  "tag": "101",
  "timeIn": "2026-05-25T12:00:00.000Z",
  "timeOut": null,
  "status": "in-building"
}
```

## Pages

- `/` - visitor registration form
- `/visitor` - visitor activity, calendar filtering, status filtering, search, and sign-out controls

## Future Improvements

- Add authentication for admin users
- Add visitor photo or ID upload
- Export logs as CSV or PDF
- Add dashboard statistics
- Improve form validation for phone numbers and tag numbers
- Show the selected activity date dynamically in the page heading

## Author

Built by Andy-Fidel Jude Fiifi.
