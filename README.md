TO-DOMERN
# Full-Stack Task Management P
A full-stack project demonstrating a clean architecture with **React / Vite / Tailwind CSS** frontend and an **Express-style backend** structure with routes, controllers, models, and middleware. The backend is demo-ready, returns JSON responses, and is PostgreSQL-ready.

**Project Structure:**

- `backend/` (server.js, routes/, controllers/, models/, middleware/)  
- `src/` (frontend code)  
- `package.json`  
- `README.md`

**Backend Demo Endpoints:**

- `GET /api/tasks` → Returns a list of tasks  
- `POST /api/tasks` → Creates a new task  

Example GET response:

```json
[
  { "id": 1, "title": "Buy groceries", "status": "Pending" },
  { "id": 2, "title": "Finish project", "status": "Completed" }
]
How to Run:

bash
Copy code
git clone <your-repo-url>
cd project
npm install
cd backend
npm install express cors
node server.js
cd ../src
npm run dev
