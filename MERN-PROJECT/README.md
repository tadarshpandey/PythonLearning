# ✨ ZenTask — Visually Stunning Task Dashboard (MERN)

ZenTask is a modern, high-fidelity, and fully responsive MERN stack task management Kanban board. It is built using **React + Vite** on the frontend and **Node + Express** on the backend.

Following your design requests, it features:
- **Curated slate-dark HSL color schemes** that prevent default browser styling.
- **Glassmorphic controls and borders** featuring premium box-shadow glows.
- **Fluid transitions and slide-in keyframe animations** for exit, entry, and active tasks.
- **State-of-the-art dual-mode backend repository**: Complete with authentic MongoDB/Mongoose connection settings, schemas, and queries, but supports a transparent, pre-seeded **In-Memory fallback** mode when MongoDB is offline.

---

## 📂 Project Architecture

```
MERN-PROJECT/
├── backend/
│   ├── config/db.js          <-- MongoDB connection boilerplate & fallback switcher
│   ├── controllers/
│   │   └── taskController.js <-- Dual-mode CRUD controller (Mongoose or In-Memory)
│   ├── models/
│   │   └── taskModel.js      <-- Mongoose Schema definitions for tasks
│   ├── routes/
│   │   └── taskRoutes.js     <-- Express Router REST endpoints
│   ├── .env                  <-- Port and connection string configuration
│   ├── package.json          <-- Backend dependencies (Express, Mongoose, nodemon)
│   └── server.js             <-- Core Express server booting entrypoint
│
└── client/
    ├── index.html            <-- Main single-page mount with Google Fonts Outfit
    ├── package.json          <-- Client React / Vite dev script sets
    └── src/
        ├── App.jsx           <-- High-order states and API fetch connectors
        ├── index.css         <-- Premium design system, colors, layout grids
        ├── main.jsx          <-- StrictMode renderer binding index.css
        └── components/
            ├── TaskBoard.jsx <-- Column mapping Kanban layout
            ├── TaskCard.jsx  <-- Interactive cards with priority & inline status shifts
            └── TaskForm.jsx  <-- Sleek glassmorphic add task modal
```

---

## 🛠️ MongoDB Connection Section

The MongoDB/Mongoose database configuration is fully coded and ready. It is managed in the following segments:

### 1. The Database Connector (`backend/config/db.js`)
Here you'll find the dedicated section for the mongoose connection. If no `MONGO_URI` is detected inside `backend/.env`, it automatically logs a notice and turns off database active states, gracefully switching the entire server into in-memory storage mode.
```javascript
// ----------------------------------------------------------------
// SECTION: MONGODB CONNECTION CODE
// ----------------------------------------------------------------
console.log('🔄 Attempting connection to MongoDB...');
const conn = await mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 5000,
});
console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
// ----------------------------------------------------------------
```

### 2. The Data Schema (`backend/models/taskModel.js`)
A standard, optimized Mongoose Schema setting up validation for tasks, which maps directly to your MongoDB document collection structure.

### 3. How to Connect a Live MongoDB Instance:
1. Open the [backend/.env](file:///d:/MyLearning/MERN-PROJECT/backend/.env) file.
2. Uncomment the `MONGO_URI` line and replace it with your MongoDB URI (Local or MongoDB Atlas cluster connection string):
   ```env
   MONGO_URI=mongodb://localhost:27017/zentask
   ```
3. Restart the backend server. The app will immediately swap its active repository from the in-memory array to the live MongoDB database seamlessly! No code changes are required!

---

## 🚀 How to Run ZenTask

### Step 1: Start the Backend API
1. Navigate into the `backend/` directory:
   ```bash
   cd backend
   ```
2. Start the hot-reloading development server:
   ```bash
   npm run dev
   ```
3. The server will launch on port `5000` with the health indicator pointing to `http://localhost:5000/api/health`.

### Step 2: Start the Client Frontend
1. Open a new terminal session and navigate to the `client/` directory:
   ```bash
   cd client
   ```
2. Launch the Vite developer server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to the printed local URL (normally `http://localhost:5173`). Enjoy ZenTask!
