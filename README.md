# mangoledger-expense

- Live demo: https://personal-expense-tracker-sigma-teal.vercel.app
- Backend API: https://personal-expense-tracker-49ur.onrender.com/api/expenses
- Note: the free backend sleeps when idle, so the first load can take about 50 seconds.
**MangoLedger** - Personal Expense Tracker. MERN app (MongoDB Atlas, Express, React with Vite, Node).
Add, view, edit and delete daily expenses. The total amount spent shows at the top and updates on every change.

## Folder layout

```
mangoledger-expense/
  backend/    Express + Mongoose API
  frontend/   React + Vite + MUI app
  README.md
  .gitignore
```

## Before you run

Atlas needs a free cluster, a DB user, and `0.0.0.0/0` in Network Access.
`backend/.env` already holds a test Atlas connection string, so the project runs as it is. If the connection fails, replace `MONGO_URI` with your own Atlas string:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/mangoledger?retryWrites=true&w=majority
```

`frontend/.env` holds `VITE_API_URL=http://localhost:5000`. If it is missing, the app falls back to the same URL.

Both `.env` files are in the repository on purpose, as the exam paper requires. They hold test credentials only.

## Run the backend

```
cd backend
npm install
npm start
```

Screen shows `MongoDB connected` then `Server running on 5000`.

## Run the frontend

Open a second terminal.

```
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## REST API

Base URL: `http://localhost:5000/api/expenses`

| Method | URL | Purpose | Success |
|---|---|---|---|
| GET | `/api/expenses` | List all, newest date first | 200 |
| GET | `/api/expenses/:id` | One expense | 200 |
| POST | `/api/expenses` | Create | 201 |
| PUT | `/api/expenses/:id` | Update | 200 |
| DELETE | `/api/expenses/:id` | Delete | 200 |

Bad values return **400** with an `errors` object. A missing or malformed id returns **404**.

Body example:

```json
{"title":"Lunch","amount":250,"category":"Food","date":"2026-10-27"}
```

## Names used in this project

| File | Role |
|---|---|
| `backend/src/boot.js` | Server start, Atlas connect |
| `backend/src/models/MangoSpend.js` | Mongoose model (collection `expenses`) |
| `backend/src/handlers/spendHandlers.js` | CRUD logic |
| `backend/src/paths/spendPaths.js` | Express routes |
| `backend/src/tools/checkSpend.js` | Backend validation |
| `frontend/src/MangoApp.jsx` | App shell, data load, toast |
| `frontend/src/theme.js` | All MUI overrides (Mango Sorbet) |
| `frontend/src/screens/LedgerScreen.jsx` | Dashboard screen |
| `frontend/src/screens/JotScreen.jsx` | Add and Edit form |
| `frontend/src/parts/TopRail.jsx` | Navbar, logo, subtitle |
| `frontend/src/parts/TotalBento.jsx` | Three bento tiles |
| `frontend/src/parts/ChipRail.jsx` | Category chips |
| `frontend/src/parts/FinderBar.jsx` | Search and sort |
| `frontend/src/parts/RowBoard.jsx` | Desktop table |
| `frontend/src/parts/PhoneCards.jsx` | Card list under 700px |
| `frontend/src/parts/ConfirmSticker.jsx` | Delete confirm dialog |
| `frontend/src/tools/ledgerApi.js` | Axios calls |
| `frontend/src/tools/ledgerKit.js` | Categories, formatting, sort helpers |

## Assumptions

- Category is a fixed dropdown of 5: Food, Travel, Bills, Shopping, Other.
- Date is a date only (`YYYY-MM-DD`). The Add form defaults to today.
- Amounts are shown in rupees (₹).
- Total Amount Spent covers all saved expenses. Search and category filter do not change it.
- Edit reuses the Add form, pre-filled, on the route `/edit/:id`.
- Teal tile shows the expense count. White tile shows the top category by amount.
- Amount must be greater than 0, up to 2 decimals. Title is required, 100 characters at most.

## Extras

- Toast messages (Snackbar) for success and failure.
- Delete confirmation dialog.
- Coloured category chips.
- Search by title, category filter, sort (date, amount, title).
- Stat tiles.
- Table on desktop, cards under 700px.

## Test checklist

Backend (Postman):
- [ ] POST valid body returns 201
- [ ] GET list returns 200
- [ ] GET one returns 200
- [ ] PUT valid body returns 200
- [ ] DELETE returns 200
- [ ] POST negative amount returns 400
- [ ] POST empty title returns 400
- [ ] PUT, GET, DELETE with id `000000000000000000000000` return 404

Frontend:
- [ ] Dashboard and Add tabs switch pages
- [ ] Empty form shows errors under each field
- [ ] Amount 0 or negative is rejected
- [ ] Add saves and the list refreshes with no reload
- [ ] Edit opens pre-filled, date included
- [ ] Edit saves and the list updates
- [ ] Delete asks for confirmation first
- [ ] Total updates after add, edit and delete
- [ ] Phone view at 375px shows cards, no sideways scroll
- [ ] Console has no errors
- [ ] Fresh clone, `npm install` in both folders, then run: everything still works
