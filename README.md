# Should We Build This Game? — Backend

This is the Express/Node.js backend for our group project. It connects to a MySQL database and provides API routes for authentication, game data, game ideas, and market stats.

---

## Tech Stack

- Node.js + Express
- MySQL
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/vlastobartoska/miniproject3-backend.git
cd miniproject3-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your `.env` file

Copy the example file and fill in your own values:

```bash
cp .env.example .env
```

Then open `.env` and update it:

```
PORT=3001
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=game_studio
DB_PORT=3306
JWT_SECRET=any_long_random_string
```

### 4. Set up the database

Open MySQL and run:

```sql
CREATE DATABASE game_studio;
```

Then create the three tables:

```sql
USE game_studio;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  genre VARCHAR(50),
  platform VARCHAR(50),
  publisher VARCHAR(150),
  year INT,
  na_sales DECIMAL(6,2),
  eu_sales DECIMAL(6,2),
  jp_sales DECIMAL(6,2),
  global_sales DECIMAL(6,2),
  rating DECIMAL(4,2)
);

CREATE TABLE game_ideas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  ref_game_id INT DEFAULT NULL,
  idea_name VARCHAR(200) NOT NULL,
  genre VARCHAR(50),
  platform VARCHAR(50),
  target_audience VARCHAR(100),
  budget DECIMAL(10,2),
  description TEXT,
  status ENUM('draft', 'submitted') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (ref_game_id) REFERENCES games(id) ON DELETE SET NULL
);
```

### 5. Start the server

```bash
node src/app.js
```

You should see:

```
Server running on port 3001
Connected to MySQL database
```

---

## API Routes

### Auth (no token required)

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive a JWT token |

**Register example:**
```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "password": "yourpassword"
}
```

**Login example:**
```json
{
  "email": "you@example.com",
  "password": "yourpassword"
}
```

---

### Games (no token required)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/games` | Get all games (supports ?genre= and ?platform= filters) |
| GET | `/api/games/:id` | Get a single game by ID |

---

### Game Ideas 🔒 (token required)

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/game-ideas` | Save a new game idea |
| GET | `/api/game-ideas` | Get all ideas for the logged in user |

Add this header to protected requests:
```
Authorization: Bearer your_token_here
```

**Save idea example:**
```json
{
  "idea_name": "Space Shooter",
  "genre": "Action",
  "platform": "PC",
  "target_audience": "18-25",
  "budget": 50000,
  "description": "A fast paced space shooting game"
}
```

---

### Stats (no token required)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/stats/top-genres` | Top 10 genres by total sales |
| GET | `/api/stats/top-platforms` | Top 10 platforms by total sales |
| GET | `/api/stats/sales-by-year` | Total sales grouped by year |
| GET | `/api/stats/analyze` | Score a genre + platform combo |

**Analyze example:**
```
GET /api/stats/analyze?genre=Action&platform=PS4
```

---

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── gamesController.js
│   │   ├── gameIdeasController.js
│   │   └── statsController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── games.js
│   │   ├── gameIdeas.js
│   │   └── stats.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── db.js
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Notes

- The `.env` file is not pushed to GitHub for security reasons — create your own using `.env.example` as a guide
- The `games` table will be empty until the dataset is seeded — stats and analyze endpoints will return empty results until then
- The backend runs on port 3001 by default