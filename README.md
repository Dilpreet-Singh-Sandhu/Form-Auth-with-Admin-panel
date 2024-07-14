<h1>Full Stack React Application</h1>
This is a full stack MERN (MongoDB, Express.js, React.js, Node.js) application that includes user authentication with admin features. The admin can view all logins and the application is styled using Tailwind CSS.

Features
User Authentication (Login, Signup)
Admin Dashboard to view all logins
Responsive design using Tailwind CSS
RESTful API with Express.js
MongoDB for database management
Prerequisites
Make sure you have the following installed on your machine:

Node.js (v12 or higher)
MongoDB

User Authentication (Login, Signup)

cd client
npm install
cd ../server
npm install

Create a .env file in the server directory with the following contents:

PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

Running the Application


Start the server:
cd server
npm run dev

Start the client:
Open a new terminal window and navigate to the client directory:
cd client
npm start

Open your browser and go to:

http://localhost:4000, http://localhost:5173

Technologies Used
Frontend:

React.js
Tailwind CSS
Backend:

Node.js
Express.js
MongoDB
Mongoose
JSON Web Tokens (JWT) for authentication