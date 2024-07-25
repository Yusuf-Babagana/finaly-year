# Course Material Management System

A database management system to organise notes, slides, question papers, etc. for university courses.

## Tech Stack
- Node.js with Express.js
- MySQL
- EJS

## Prequisites
- Node.js and npm installed on your machine
- MySQL installed on your machine

## Getting Started
1. Clone the repository: `git clone https://github.com/sushma1031/course-material-management.git`.
2. Start the MySQL server and set up a MySQL account via your MySQL client (workbench or command line).
3. Execute the SQL statements in `database/schema.sql`.
    - **Important:** Note the foreign key relations and execute the statements in the corresponding order.

4. Create a `.env` file in the root directory of the project.
5. Add your MySQL credentials as well as a [session secret key](https://www.npmjs.com/package/express-session#secret) to the .env file:
   ```
   MYSQL_USER=<your-username>
   MYSQL_PASSWORD=<your-password>
   MYSQL_DB=course_management_db
   SESS_SECRET=<any-string>
   ```
6. Run `npm install` to install dependencies.
7. Run `npm run dev` to start the application.
8. Open your browser and navigate to `http://localhost:3000`.

## User Roles and Permissions

The Course Material Management System has different user roles with specific permissions:

**Admin**
- Manage users (view, delete)
- Manage all course materials (add, edit, delete)

**Teacher**
- View, add and edit course materials
- View all users
- Cannot delete materials or users

**Student**
- View access to all course materials
- Cannot add, edit or delete course materials
- Cannot view all users
