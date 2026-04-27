# CourseHub

CourseHub is a full stack course management and online learning platform built with the MERN stack. It supports authentication, course creation, student enrollment, progress tracking, profile management, and instructor dashboards.

## Features

- User authentication with signup, login, OTP verification, and password reset
- Role-based access for students, instructors, and admins
- Course catalog and course details pages
- Instructor course creation, editing, and course management
- Section and subsection management for course content
- Student enrollment and enrolled courses dashboard
- Course progress tracking and lecture viewing flow
- Ratings and reviews
- Profile update and display picture update
- Contact form support
- Media upload support through Cloudinary

## Tech Stack

### Frontend

- React 18
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios
- React Hook Form

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Nodemailer
- Cloudinary

## Project Structure

```text
EduNest-EdTech/
|-- public/
|-- src/
|   |-- components/
|   |-- pages/
|   |-- services/
|   |-- slices/
|   |-- utils/
|-- server/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- utils/
|-- package.json
```

## Available Routes

### Frontend Pages

- `/`
- `/about`
- `/contact`
- `/login`
- `/signup`
- `/verify-email`
- `/forgot-password`
- `/update-password/:id`
- `/courses/:courseId`
- `/catalog/:catalogName`
- `/dashboard/...`
- `/view-course/:courseId/section/:sectionId/sub-section/:subSectionId`

### Backend API Base URL

`http://localhost:4000/api/v1`

Main route groups:

- `/auth`
- `/profile`
- `/course`
- `/reach`

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/zaid2904/CourseHub-Online-Course-Management-Learning-Platform.git
cd FolderName
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
cd ..
```

## Environment Variables

Create a `server/.env` file and add the required environment variables.

```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=your_cloudinary_folder_name

MAIL_HOST=your_mail_host
MAIL_USER=your_mail_user
MAIL_PASS=your_mail_password
```

## Running the App

### Run frontend and backend together

```bash
npm run dev
```

### Run only the frontend

```bash
npm start
```

### Run only the backend

```bash
npm run server
```

## Default Local URLs

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`
- API base: `http://localhost:4000/api/v1`

## Scripts

### Root scripts

- `npm start` - starts the React app
- `npm run build` - creates a production build
- `npm test` - runs tests
- `npm run server` - starts the backend in development mode
- `npm run dev` - starts frontend and backend together

### Server scripts

- `npm start` - starts the Node server
- `npm run dev` - starts the server with nodemon

## Notes

- The frontend API file currently points to `http://localhost:4000/api/v1`.
- This project uses a separate `server/` folder for backend logic.
- Make sure MongoDB, Cloudinary, and email credentials are configured before testing signup, uploads, or course workflows.

## Future Improvements

- Add deployment instructions
- Add screenshots or demo GIFs
- Add API documentation
- Add test coverage
- Add payment gateway documentation if payment flow is extended

## Author

Built as a full stack EdTech course platform project.
