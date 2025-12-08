# 📝 Todo Task Management Application

A full-stack todo application built with **React**, **Node.js**, **Express**, **MySQL**, and **Docker**. 

## 🎯 Features

- ✅ **Create Tasks** - Add new tasks with title and description
- ✅ **View Tasks** - See your 5 most recent incomplete tasks
- ✅ **Complete Tasks** - Mark tasks as done with smooth animations
- ✅ **Beautiful UI** - Modern purple gradient design with responsive layout
- ✅ **Docker Support** - One-command deployment
- ✅ **Full Test Coverage** - Unit and integration tests included


## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **Vite** - Fast build tool
- **CSS3** - Custom styling with animations

### Backend
- **Node. js 18** - JavaScript runtime
- **Express** - Web framework
- **MySQL 8.0** - Relational database
- **Jest** - Testing framework

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server for frontend



## 🚀 Quick Start with Docker (Recommended)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Git

### Steps

1. **Clone the repository:**
   ```
   git clone <https://github.com/Sabryilyas/todo-app-assessment.git>
   cd todo-app-assessment

Start all services:

bash
    docker-compose up --build

Access the application:

Frontend: http://localhost:3000
Backend API: http://localhost:5000
Database: localhost:3307
Stop the application:


# Press Ctrl+C, then:
docker-compose down
That's it The application includes sample data and is ready to use.


💻 Local Development Setup (Without Docker)

Prerequisites
    Node.js 18+ installed
    MySQL 8.0 installed and running
    npm or yarn

Backend Setup

Navigate to backend:

    cd backend
    Install dependencies:

    npm install
    Create . env file:


cp .env.example . env
Update .env with your MySQL credentials:

env -
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todo_db
DB_PORT=3306
PORT=5000
NODE_ENV=development
Create database and tables:

mysql -u root -p < ../database/init.sql
Start backend server:

npm run dev
Frontend Setup
Navigate to frontend:

cd frontend
Install dependencies:

bash
npm install
Start frontend:

bash
npm run dev
Access application:

Frontend: http://localhost:5173

Running Tests
Backend Tests
bash
cd backend

# Run all tests
npm test

# Run with coverage
npm run test:all

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration
Frontend Tests
bash
cd frontend

# Run tests
npm test

# Run with coverage
npm run coverage
📁 Project Structure
Code
todo-app-coveragex/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   └── utils/           # Helper functions
│   ├── tests/               # Test files
│   ├── Dockerfile           # Backend container config
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── features/        # Redux slices & API
│   │   └── store/           # Redux store
│   ├── Dockerfile           # Frontend container config
│   ├── nginx.conf           # Nginx configuration
│   └── package.json
├── database/
│   └── init.sql             # Database schema and seed data
├── docker-compose.yml       # Docker orchestration
└── README.md

🔌 API Endpoints

Base URL: http://localhost:5000/api

GET	/tasks	Get 5 most recent incomplete tasks
GET	/tasks/all	Get all tasks
POST /tasks	Create a new task
PUT	/tasks/:id/  complete Mark task as completed
GET	/health	Health check
Example Request
Create a Task:

curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Buy milk and eggs"
  }'


🎨 UI Features
Responsive Design - Works on desktop, tablet, and mobile
Smooth Animations - Task creation and completion animations
Color-coded Cards - Different colors for visual organization
Form Validation - Real-time input validation
Loading States - Visual feedback for all operations
Error Handling - User-friendly error messages

🐳 Docker Details
Container Architecture
todo-db (MySQL 8.0) - Database server on port 3307
todo-backend (Node.js 18) - API server on port 5000
todo-frontend (Nginx + React) - Web server on port 3000
Docker Commands
bash

# Build and start
docker-compose up --build

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Remove volumes (fresh start)
docker-compose down -v

# Restart a specific service
docker restart todo-backend

📊 Database Schema

✅ Testing Checklist
 Create a task
 View tasks list
 Mark task as completed
 Form validation working
 API error handling
 Docker deployment
 Unit tests passing
 Integration tests passing
 Responsive design
 Browser compatibility


📝 Development Notes
Backend runs on port 5000 (configurable via . env)
Frontend development server on port 5173 (Vite default)
Frontend production build served by Nginx on port 80 (mapped to 3000)
Database exposed on port 3307 to avoid conflicts with local MySQL

👤 Author
Sabry Ilyas

🙏 Acknowledgments
UI design inspired by modern task management applications
Built with industry-standard tools and best practices
Follows RESTful API design principles
Implements professional error handling and logging

Made with ❤️ and ☕ by [Sabryilyas](https://www.sabryilyas.com)