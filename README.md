# School Management Mini System

A full-stack web application built with **MERN Stack** (MongoDB, Express.js, React, Node.js) for managing students and their assignments/tasks.

## Features

### Authentication
- **Admin Login**: Secure login with JWT-based authentication
- **Token Storage**: JWT tokens stored in localStorage
- **Protected Routes**: All dashboard routes require authentication

### Student Management
- **Add Students**: Create new student records with name, class, age, and email
- **View Students**: Display all students in a responsive table format
- **Search Students**: Search students by name in real-time
- **Edit Student**: Update student information
- **Delete Student**: Remove student records with confirmation

### Task / Assignment Management
- **Assign Tasks**: Create tasks/homework and assign to students
- **Task Details**: Include title, description, due date, and completion status
- **Mark Complete**: Toggle task completion status
- **Filter Tasks**: View all, pending, or completed tasks
- **Delete Tasks**: Remove tasks with confirmation

### Dashboard Features
- Clean and modern black & white theme
- Responsive design (works on desktop and mobile)
- Real-time data updates
- Success/error message notifications
- Admin logout functionality

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin request handling

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## Project Structure

```
Project1/
├── backend/
│   ├── controller/
│   │   ├── Student.controller.js     # Auth & student CRUD logic
│   │   └── Task.controller.js        # Task CRUD logic
│   ├── middleware/
│   │   └── auth.js                   # JWT authentication middleware
│   ├── model/
│   │   └── student.models.js         # Mongoose schemas (User, Student, Task)
│   ├── routes/
│   │   ├── auth.js                   # Authentication routes
│   │   ├── students.js               # Student routes
│   │   └── tasks.js                  # Task routes
│   ├── app.js                        # Express app setup
│   ├── server.js                     # Server entry point
│   ├── package.json                  # Dependencies
│   └── .env                          # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   │   ├── login.jsx          # Login page
    │   │   │   └── auth.css           # Auth styles
    │   │   └── dashboard/
    │   │       ├── Dashboard.jsx      # Main dashboard
    │   │       ├── StudentList.jsx    # Student list component
    │   │       ├── AddStudent.jsx     # Add student form
    │   │       ├── TaskList.jsx       # Task list component
    │   │       ├── AddTask.jsx        # Add task form
    │   │       └── dashboard.css      # Dashboard styles
    │   ├── services/
    │   │   └── api.js                 # Axios API configuration
    │   ├── App.jsx                    # Main app component
    │   ├── App.css                    # App styles
    │   ├── index.css                  # Global styles
    │   └── main.jsx                   # React entry point
    ├── package.json                   # Dependencies
    └── .env                           # Environment variables
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (already created, update if needed)
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/school_management
   JWT_SECRET=school_management_secret_key_2024
   ```

4. **Setup MongoDB**
   - If using local MongoDB, ensure MongoDB service is running
   - If using MongoDB Atlas, replace `MONGO_URI` with your connection string

5. **Create Admin User** (Optional - for initial login)
   - Connect to MongoDB and insert a user:
   ```javascript
   db.users.insertOne({
     email: "admin@school.com",
     password: "$2a$10$..." // bcrypt hash of "admin123"
   })
   ```

6. **Start the backend server**
   ```bash
   npm run dev
   ```
   Server will run at `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend folder** (in a new terminal)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Frontend will run at `http://localhost:5173` (or another port)

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
  - Body: `{ email, password }`
  - Returns: `{ token, user }`

### Students
- `GET /api/students` - Get all students
- `GET /api/students/search?query=name` - Search students
- `POST /api/students` - Add new student
  - Body: `{ name, class, age, email }`
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Add new task
  - Body: `{ title, description, student, dueDate }`
- `PUT /api/tasks/:id` - Update task (mark complete)
  - Body: `{ completed, ... }`
- `DELETE /api/tasks/:id` - Delete task

All endpoints (except login) require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Usage

### First Login
1. Open frontend at `http://localhost:5173`
2. Login with credentials:
   - Email: `admin@school.com`
   - Password: `admin123`
3. You'll be redirected to the dashboard

### Adding Students
1. Click "+ Add Student" button
2. Fill in student details (name and class are required)
3. Click "Add Student"

### Assigning Tasks
1. Click "+ Add Task" button
2. Fill in task details
3. Select the student from dropdown
4. Click "Add Task"

### Managing Tasks
- Click checkbox to mark task as complete/incomplete
- Use filter buttons to view all, pending, or completed tasks
- Click "Delete" to remove a task

### Searching Students
- Use the search box in the student list section
- Type student name to filter results

## Authentication Flow

1. User enters credentials on login page
2. Backend validates credentials and generates JWT token
3. Token is stored in localStorage
4. Token is sent with every API request in Authorization header
5. Backend middleware verifies token on protected routes
6. If token expires or is invalid, user is redirected to login

## Database Models

### User (Admin)
```javascript
{
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Student
```javascript
{
  name: String (required),
  class: String (required),
  age: Number,
  email: String (unique, sparse),
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  title: String (required),
  description: String,
  student: ObjectId (reference to Student),
  completed: Boolean (default: false),
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The application handles various error scenarios:
- **Invalid credentials**: Returns 400 error
- **Non-existent records**: Returns 404 error
- **Duplicate emails**: Returns 400 error
- **Unauthorized access**: Returns 401 error and redirects to login
- **Server errors**: Returns 500 error with message

## Security Features

- **Password Hashing**: Passwords are hashed using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: All dashboard routes require valid token
- **CORS**: Cross-origin requests handled securely
- **Input Validation**: Server-side validation of all inputs

## Performance Features

- **Responsive UI**: Mobile-friendly design
- **Real-time Updates**: Data loads and updates without page refresh
- **Search Functionality**: Client-side filtering for instant results
- **Confirmation Dialogs**: Prevents accidental deletions
## Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check if port 3000 is available
- Verify `.env` file has correct values

### Login fails
- Ensure admin user exists in database
- Check MongoDB URI in `.env`
- Verify backend server is running
### API calls fail
- Check if CORS is enabled (it is by default)
- Verify API baseURL in `frontend/src/services/api.js` is correct
- Ensure backend is running at the correct port
### Token expires too quickly
- Modify token expiration in `backend/controller/Student.controller.js`
- Default expiration is 7 days
## Contributing
Feel free to fork this project and submit pull requests!
---
**Happy learning! 🎓**
