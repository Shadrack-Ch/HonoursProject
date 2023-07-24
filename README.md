### **Design Document for Web Application Productivity System For Students with Attention Disorder**

---

#### **Title of the Project:**
Web Application Productivity System for Students with ADHD

---

#### **Problem Statement:**
Students with ADHD often face challenges in organizing and tracking tasks, assignments, and deadlines for their academic courses. This difficulty can lead to feeling overwhelmed, missing essential deadlines, and an overall decrease in academic performance.

---

#### **Project Scope:**
The objective is to build a centralized web application where students can efficiently organize and track tasks specific to each class. They can maintain sections for materials, resources, assignments, due dates, and potentially integrate a full-fledged calendar. Technologies in focus:
- Frontend: React.js
- Backend: Node.js/Express
- Database: MongoDB
- Deployment: Heroku

---

#### **Motivation:**
Offer a simplified, structured, and centralized location for ADHD students to mitigate the overwhelming process of tracking class-specific tasks and deadlines. By organizing data by class and urgency, students can prioritize and streamline their academic activities efficiently.

---

#### **Main Objectives:**
- Enhance the capability of ADHD students to meet their academic deadlines.
- Facilitate effortless access to academic materials and resources.

---

#### **Equipment & Technologies Required:**
- Full Stack Development
- Frontend: React.js
- Backend: Node.js/Express
- Database: MongoDB
- Deployment: Heroku

---

#### **Requirements for the Project:**

| #  | Requirement                                  | Description                                                                                                                         | Priority  |
|----|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|-----------|
| 1  | User Authentication System                   | Allow students to securely sign up and log into the platform.                                                                       | High      |
| 2  | Course/Class Creation                        | Ability to add a class or course, specifying the name, timeframe (winter, summer, fall), and other essential details.               | High      |
| 3  | Resource Management                          | Allow users to add, edit, or remove links to resources (e.g., Books, course websites, additional resources).                        | High      |
| 4  | Assignment & Test Tracking                   | Facility to add, modify, or remove assignments with their respective deadlines and tests with their schedules.                      | High      |
| 5  | Modular Data Management                       | Students should be able to modify or remove class/course objects, resources, and associated details anytime.                        | High      |
| 6  | Optional Calendar Integration                | (Optional) Integration of a full-fledged calendar to visually track tasks, assignments, and test dates.                             | Medium    |

---

#### **Milestones:**

1. **Milestone 1:** Setup and Project Initialization
   - Configure the development environment.
   - Set up React.js for frontend, Node.js/Express for the backend, MongoDB for database, and Heroku for deployment.
   
2. **Milestone 2:** User Authentication System
   - Implement sign-up and log-in functionality.
   - Ensure secure data storage and password hashing.
   - Test user registration and authentication.

3. **Milestone 3:** Course/Class Module Development
   - Design and integrate the course/class addition module.
   - Allow resource link integration and assignment/test date tracking.
   - Test course/class module thoroughly.

4. **Milestone 4:** Resource Management System
   - Develop the functionality to add, edit, or remove resource links.
   - Test link addition, removal, and editing functions.

5. **Milestone 5:** Assignment & Test Tracking
   - Design and implement the feature to add, modify, or remove assignments/tests and their respective dates.
   - Thorough testing of the tracking system.

6. **Milestone 6:** Optional Features & Final Touches
   - Optionally, add a calendar integration feature.
   - Finalize UI/UX improvements.
   - Conduct comprehensive testing of the entire platform.

7. **Milestone 7:** Deployment & Final Testing
   - Deploy the application on Heroku.
   - Conduct end-to-end testing in the live environment.
   - Address any last-minute bugs or issues.


---

### **Web Application Productivity System For Students with ADHD: Project To-Do List**

---

#### **1. Initial Setup & Configuration:**
- [ ] Set up the development environment:
  - [ ] Install Node.js and npm.
  - [ ] Initialize a new project using `npm init`.
- [ ] Set up a Git repository for version control:
  - [ ] Initialize a new repository.
  - [ ] Create a `.gitignore` file for Node.js.
  - [ ] Commit the initial project structure.

#### **2. Backend Development:**

- **2.1. Setting Up Express Server:**
  - [ ] Install Express using `npm install express`.
  - [ ] Create an `index.js` (or `server.js`) file.
  - [ ] Set up a basic Express server.
  - [ ] Test the server on a local host.
  
- **2.2. Database Configuration:**
  - [ ] Install MongoDB.
  - [ ] Set up a MongoDB connection using Mongoose.
  - [ ] Create models for Users, Courses, Resources, Assignments, and Tests.
  
- **2.3. API Endpoints Creation:**
  - [ ] Create CRUD (Create, Read, Update, Delete) endpoints for Users.
  - [ ] Create CRUD endpoints for Courses.
  - [ ] Create CRUD endpoints for Resources.
  - [ ] Create CRUD endpoints for Assignments & Tests.
  
- **2.4. User Authentication:**
  - [ ] Install packages for authentication (e.g., `passport`, `bcrypt`).
  - [ ] Set up user registration and login routes.
  - [ ] Implement password hashing.
  - [ ] Implement JWT for token-based authentication.
  
#### **3. Frontend Development (React.js):**

- **3.1. React Setup:**
  - [ ] Use Create React App to initialize the frontend.
  - [ ] Set up routing using `react-router-dom`.
  
- **3.2. Components Creation:**
  - [ ] Create a layout component (header, footer).
  - [ ] Develop a login/register component.
  - [ ] Design course addition and display component.
  - [ ] Craft assignment and test tracking components.
  - [ ] Formulate components to add, view, edit, and delete resources.
  
- **3.3. State Management:**
  - [ ] Use React's Context API or Redux for state management.
  - [ ] Set up state and reducers/actions for Users, Courses, Resources, Assignments, and Tests.
  
- **3.4. Connect Frontend with Backend:**
  - [ ] Use Axios to send and receive HTTP requests to/from the backend.
  - [ ] Connect registration and login components to backend authentication routes.
  - [ ] Link course, resource, assignment, and test components to their respective CRUD endpoints.
  
#### **4. Styling and User Interface:**
- [ ] Design a responsive and intuitive layout.
- [ ] Use CSS frameworks/libraries like Bootstrap or TailwindCSS for styling.
- [ ] Implement animations or transitions for better user experience (optional).

#### **5. Testing:**
- [ ] Write unit tests for backend routes using tools like `jest` or `mocha`.
- [ ] Create frontend component tests using `jest` and `react-testing-library`.
- [ ] Conduct end-to-end testing.

#### **6. Deployment:**
- [ ] Prepare the app for production (e.g., set NODE_ENV to 'production').
- [ ] Deploy the backend on a platform like Heroku.
- [ ] Build the React app for production and deploy on platforms like Vercel, Netlify, or directly on Heroku.

#### **7. Post Deployment & Maintenance:**
- [ ] Monitor server logs and application behavior.
- [ ] Address any bugs or issues that arise.
- [ ] Periodically update all dependencies.
- [ ] Seek feedback from users and make iterative improvements.

---
