# Recruit Tracker
Runner Up: Fullstack Development @ UA Innovate 2024

This is one of three repositories for this project. To see the database and backend go to the organization page.

### Tools Used
* `React` For rendering jsx elements and creating UI
* `Npm` Package management and frontend server management
* `OpenAI` For automated candidate review via passed in parsed resume data
* `Docker` Containerization of frontend, backend, and database
* `FastAPI` Python api creating routes for MongoDB and OpenAI queries
* `JWT Tokens` For login authentication and authorization preventing students accessing HR platform
* `MongoDB` For candidate data tracking

### Architecture
<img width="750" alt="Screenshot 2024-03-04 at 3 39 14 PM" src="https://github.com/user-attachments/assets/08c59751-6c21-439a-96c6-398d8203e213">




##### This is a CRUD (Create Read Update Delete) Application implemented with MongoDB. So students can `create` data. Recruiters can `read` data by searching via different fields. Both recruiters and candidates can `update` their data, and only recruiters can `delete` candidates. 

### Login
<img width="750" alt="Screenshot 2024-03-04 at 3 39 14 PM" src="https://github.com/ua-innovate-cgi/frontend/assets/107063397/8c561bd4-f5a8-4734-8ebb-18bf5c9a7db0">

### Candidate Form Submission

<img width="750" alt="Screenshot 2024-03-04 at 3 40 04 PM" src="https://github.com/ua-innovate-cgi/frontend/assets/107063397/27986e3c-c6c8-44bc-a1e4-94f337671661">

### Candidate Portal

<img width="750" alt="Screenshot 2024-03-04 at 3 40 36 PM" src="https://github.com/ua-innovate-cgi/frontend/assets/107063397/009cd138-7ca6-4240-80c1-9314bb91d6f5">

### Candidate Portal

<img width="1504" alt="Screenshot 2024-03-04 at 10 40 28 PM" src="https://github.com/ua-innovate-cgi/frontend/assets/107063397/7954478b-9ef6-452a-9646-ed5b95267014">

### Using Search Functionality

![searchFunction-copy-2](https://github.com/ua-innovate-cgi/frontend/assets/107063397/5b5653e9-599b-4080-a1ac-19d35785b89a)

### Editing Candidate Profile

![editCandidate](https://github.com/ua-innovate-cgi/frontend/assets/107063397/b202024c-9440-40cf-944b-586e19582b62)

### AI Feedback
Recruiters can either add feedback manually with the `+` button, they can also use AI. This is produced by parsing of the uploaded resume and a call to OpenAI. 
![AIFeedback-copy-1](https://github.com/ua-innovate-cgi/frontend/assets/107063397/a02dc539-ee31-4b11-83b1-80f2bd48c4e7)


### Updating Student
![UpdatingStudentInfo-1](https://github.com/ua-innovate-cgi/frontend/assets/107063397/8bc5476e-51e1-4cca-9c74-00a1663ce902)


### Authentication
![Authentication-copy](https://github.com/ua-innovate-cgi/frontend/assets/107063397/de726ee3-5104-4370-8e3d-b24e1004743c)

#### **Quick Overview of Authentication**
Authentication is handled using **JWT (JSON Web Tokens)**, where users (students or HR) log in with their email and password. When a user submits their credentials via `/api/login`, the system verifies them against MongoDB. If authentication is successful, a JWT is generated, containing user details like their **role (student/hr)**, and is then sent back to the client. The client stores this token in `localStorage` for subsequent requests.

For protected routes, **role-based access control (RBAC)** is enforced using the `ProtectedRoute` component in the frontend. This component checks `localStorage.role` and ensures users can only access authorized pages (`/student` for students, `/hr` for HR). Unauthorized users are **redirected away** to prevent access to restricted areas.

On the backend, the JWT token is verified before granting access to protected endpoints. When a user requests a resource, their token is decoded, and their role is checked. If authentication or authorization fails, the system responds with a `401 Unauthorized` error, ensuring that only authorized users can modify or retrieve data.

