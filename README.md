# Resume Screening & Candidate Ranking System

## Overview

The Resume Screening & Candidate Ranking System is a full-stack web application designed to automate the initial resume screening process.

The application enables recruiters and hiring teams to upload multiple resumes and a Job Description (JD), automatically analyze candidate profiles, calculate matching scores, rank candidates based on suitability, and visualize results through an interactive dashboard.

The goal of the project is to reduce manual screening effort and improve the efficiency of candidate shortlisting.

---

## Live Application

### Frontend

https://resume-screening-system-sage.vercel.app/

### Backend API

https://resume-screening-system-xkxq.onrender.com/

---

## Key Features

* Multiple Resume Upload Support
* PDF and DOCX Resume Processing
* Job Description PDF Upload
* Manual Job Description Input
* Automatic Skill Matching
* Candidate Ranking System
* Search and Sort Functionality
* Resume Viewing Support
* CSV Export Functionality
* Fully Deployed Cloud-Based Application

---

## Technology Stack

### Frontend

* React.js
* Bootstrap
* Axios

### Backend

* Node.js
* Express.js
* Multer
* pdf-parse
* Mammoth

### Database

* MySQL

### Cloud Services

* Vercel
* Render
* Aiven MySQL

---

## Installation & Setup

### Prerequisites

Before running the project locally, ensure the following software is installed:

* Node.js
* npm
* MySQL
* Git

---

### Clone Repository

```bash
git clone https://github.com/Shambhavi004/resume-screening-system-public.git
```

---

### Backend Setup

Navigate to the Backend directory:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure the following variables:

```env
DB_HOST=<your_host>
DB_USER=<your_user>
DB_PASSWORD=<your_password>
DB_NAME=<your_database>
DB_PORT=<your_database_port>
PORT=<your_port>
```

Start the backend server:

```bash
npm start
```

---

### Frontend Setup

Navigate to the Frontend directory:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

---

## Project Structure

```text
Resume-Screening-System
│
├── Backend
│   ├── config
│   ├── controllers
│   ├── routes
│   ├── utils
│   ├── uploads
│   └── server.js
│
├── Frontend
│   ├── src
│   ├── public
│   ├── services
│   └── components
│
└── README.md
```

## Author

**Shambhavi Goswami**

Full Stack Developer
