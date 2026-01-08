# Survey / Feedback Application (Full Stack)

This project is a **full-stack Survey & Feedback application** built using **React, Node.js, Express, and MongoDB**.

The goal of this project is to allow users to:
- Create surveys with different types of questions
- Fill out surveys
- View survey results and analytics
- Manage surveys securely using authentication

I built this project to practice **real-world full-stack development**, including authentication, CRUD operations, UI design, and state management.

---

##  What I Did in This Project..

I approached this project step by step like a real application:

1. **Authentication First**
   - Implemented user **Register & Login**
   - Used **JWT (JSON Web Token)** for authentication
   - Stored the token in `localStorage`
   - Protected routes like *Create Survey* and *View Results*

2. **Survey Creation**
   - Logged-in users can create surveys
   - Each survey can have:
     - Short answer questions
     - Multiple choice questions
   - Questions and options are handled dynamically using React state

3. **Survey Participation**
   - Any user can fill out available surveys
   - Answers are collected and stored in the database
   - Each submission is saved separately for analytics

4. **Survey Analytics & Results**
   - Total responses are counted
   - Results are displayed using charts
   - Data updates correctly when responses change

5. **Survey Management**
   - Survey owners can delete surveys
   - UI updates instantly without page reload
   - Clean confirmation handling for delete actions

6. **UI & Styling**
   - Used **CSS Modules** for clean, scoped styling
   - Designed simple, readable, responsive UI
   - Separate styles for:
     - Login
     - Register
     - Survey List
     - Create Survey
     - Fill Survey
     - Navbar

---

## Tech Stack Used

### Frontend
- **React (Vite)**
- **React Router DOM** – routing
- **Axios** – API requests
- **Chart.js + react-chartjs-2** – analytics charts
- **CSS Modules** – component-scoped styling

### Backend
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT (jsonwebtoken)** – authentication
- **bcryptjs** – password hashing
- **CORS**
- **dotenv**

---

##  Packages Used

### Frontend Packages

npm install react-router-dom axios chart.js react-chartjs-2
