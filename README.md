# Job Application Tracker (Mini ATS)

A lightweight, full-stack Applicant Tracking System (ATS) for individual use. Track job applications, manage application status, and visualize your job search progress with analytics.

## 🎯 Project Overview

This mini-ATS demonstrates modern full-stack development practices with a clean REST API, proper SQL data modeling, and a responsive UI. Perfect for showcasing technical skills in web development, API design, and data visualization.

## 🌐 Live Demo

- **Frontend (Vercel):** [https://job-application-tracker-nine-zeta.vercel.app](https://job-application-tracker-nine-zeta.vercel.app)
- **Backend API (Render):** [https://job-application-tracker-fvir.onrender.com](https://job-application-tracker-fvir.onrender.com)
- **API Documentation:** [https://job-application-tracker-fvir.onrender.com/docs](https://job-application-tracker-fvir.onrender.com/docs)

> **Note:** The backend is hosted on Render's free tier and may take 30-60 seconds to wake up on first request.

## 🚀 Tech Stack

### Backend
- **Python 3.11** - Core programming language
- **FastAPI** - Modern, high-performance web framework
- **SQLAlchemy 2.0** - SQL ORM for database operations
- **SQLite** - Lightweight database (easily swappable with PostgreSQL)
- **Uvicorn** - ASGI server for development
- **Pydantic** - Data validation and serialization

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Recharts** - Modern charting library

## ✨ Features

- ✅ **Full CRUD Operations** - Create, read, update, and delete job applications
- 📊 **Analytics Dashboard** - Visual insights with charts and statistics
- 🎨 **Modern UI/UX** - Glassmorphism effects, gradient designs, smooth animations
- 🔍 **Status Tracking** - Applied, Interview, Offer, Rejected
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Real-time Updates** - Instant feedback on all operations
- 🎯 **Input Validation** - Both frontend and backend validation
- 🌐 **Production Ready** - Environment variables, deployment configuration included

## 🎨 UI/UX Improvements

### Impressive Header Design
- **Glassmorphism Effect**: Sticky header with backdrop blur and translucent glass effect
- **Animated Gradient Logo**: Eye-catching gradient icon with hover animations
- **Smooth Scroll Transitions**: Header style changes elegantly when scrolling
- **Mobile Hamburger Menu**: Responsive navigation with slide-down animation

### Mobile-First Responsive Design
- **Adaptive Layouts**: Tables transform into beautiful cards on mobile devices
- **Touch-Optimized**: Large tap targets and smooth interactions for mobile
- **Responsive Charts**: Analytics dashboard adapts perfectly to all screen sizes
- **Breakpoint Optimization**: Tested on 375px (mobile), 768px (tablet), 1024px+ (desktop)

### Modern Design Elements
- **Gradient Backgrounds**: Subtle blue-to-purple gradient for visual depth
- **Micro-Animations**: Fade-in, slide-down, and scale animations for enhanced UX
- **Premium Color Scheme**: Carefully selected color palette with proper contrast
- **Consistent Spacing**: Professional typography and spacing throughout

## 📁 Project Structure

```
job-application-tracker/
│
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── main.py           # FastAPI app initialization
│   │   ├── database.py       # Database connection and session
│   │   ├── models.py         # SQLAlchemy models
│   │   ├── schemas.py        # Pydantic schemas
│   │   ├── routes.py         # API endpoints
│   │   └── utils.py          # Helper functions
│   ├── requirements.txt      # Python dependencies
│   └── .env.example          # Environment variables template
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   │   ├── ApplicationList.jsx
│   │   │   ├── ApplicationForm.jsx
│   │   │   └── StatusBadge.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Applications.jsx
│   │   │   └── Analytics.jsx
│   │   ├── services/         # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global styles
│   ├── index.html
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── vite.config.js        # Vite configuration
│   └── package.json          # Node dependencies
│
├── database/
│   └── schema.sql            # Database schema with indexes
│
└── README.md                  # This file
```

## 🗄️ Database Schema

### Applications Table

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY | Auto-incrementing ID |
| company_name | VARCHAR(255) | NOT NULL, INDEXED | Company name |
| job_role | VARCHAR(255) | NOT NULL | Job title/role |
| location | VARCHAR(255) | NOT NULL | Job location |
| application_date | DATE | NOT NULL, INDEXED | Date applied |
| status | VARCHAR(50) | NOT NULL, CHECK, INDEXED | Application status |
| notes | TEXT | NULLABLE | Additional notes |
| created_at | DATETIME | DEFAULT NOW | Record creation time |
| updated_at | DATETIME | DEFAULT NOW | Last update time |

**Indexes:**
- `idx_applications_status` - Fast status filtering
- `idx_applications_date` - Date-based sorting
- `idx_applications_company` - Company analytics
- `idx_applications_status_date` - Combined queries

## 🔌 API Endpoints

All endpoints return JSON responses with appropriate HTTP status codes.

### Applications

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| GET | `/applications` | Get all applications | 200 |
| GET | `/applications/{id}` | Get single application | 200, 404 |
| POST | `/applications` | Create new application | 201, 422 |
| PUT | `/applications/{id}` | Update application | 200, 404, 422 |
| DELETE | `/applications/{id}` | Delete application | 204, 404 |

### Analytics

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| GET | `/applications/stats` | Get analytics data | 200 |

### Example Request/Response

**POST `/applications`**
```json
{
  "company_name": "Google",
  "job_role": "Software Engineer",
  "location": "Mountain View, CA",
  "application_date": "2024-01-15",
  "status": "Applied",
  "notes": "Applied through careers page"
}
```

**Response (201 Created)**
```json
{
  "id": 1,
  "company_name": "Google",
  "job_role": "Software Engineer",
  "location": "Mountain View, CA",
  "application_date": "2024-01-15",
  "status": "Applied",
  "notes": "Applied through careers page",
  "created_at": "2024-01-15T10:30:00",
  "updated_at": "2024-01-15T10:30:00"
}
```

## 🛠️ Setup Instructions

### Prerequisites
- Python 3.11 or higher
- Node.js 18+ and npm
- Git (optional)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create `.env` file (optional - uses defaults if not present):
```bash
cp .env.example .env
```

6. Start the backend server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`  
API documentation at `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Running the Complete Application

1. Open two terminal windows
2. In terminal 1, start the backend (as shown above)
3. In terminal 2, start the frontend (as shown above)
4. Open your browser to `http://localhost:5173`

## 📊 Analytics Features

The analytics dashboard provides:

- **Total Applications** - Overall count
- **Status Breakdown** - Count by status with color-coded cards
- **Pie Chart** - Visual distribution of application statuses
- **Timeline Chart** - Applications submitted over time (monthly)
- **Top Companies** - Companies you've applied to most

## 🎓 Resume Bullet Points

Use these professionally-crafted bullet points for your resume:

- Built a full-stack Job Application Tracker using **FastAPI**, **React**, and **SQLite**, implementing RESTful APIs with CRUD operations and real-time analytics dashboard
- Designed and implemented a normalized database schema with indexed queries, achieving optimized performance for application tracking and statistical analysis
- Developed a responsive, modern UI with **Tailwind CSS** and **Recharts**, featuring interactive data visualizations and form validation for enhanced user experience

## 🚀 Future Improvements

Potential enhancements for v2.0:

- **Authentication** - User login and multi-user support
- **Email Integration** - Track emails with companies
- **Document Upload** - Store resumes and cover letters
- **Reminders** - Notifications for follow-ups
- **Export Feature** - Export data to CSV/PDF
- **Advanced Filters** - Search and filter applications
- **Interview Scheduler** - Calendar integration
- **PostgreSQL Support** - Production-ready database
- **Docker** - Containerization for easy deployment
- **CI/CD** - Automated testing and deployment

## 📝 Development Notes

- The database is automatically created when you start the backend
- CORS is configured to allow frontend (ports 5173, 3000)
- Hot reload is enabled for both frontend and backend
- All API endpoints include proper error handling
- Frontend includes loading states and error messages
- **Important**: FastAPI routes are ordered with specific paths (`/stats`) before parameterized paths (`/{id}`) to prevent route matching conflicts

## 🌐 Deployment & Hosting

### Recommended Hosting Options

#### Backend (FastAPI)

**Best Options:**

1. **Render** ⭐ (Recommended)
   - Free tier available with 750 hours/month
   - Auto-deployment from GitHub
   - Built-in PostgreSQL database option
   - Easy environment variable management
   - HTTPS included
   - Setup: Create Web Service → Connect GitHub → Deploy

2. **Railway**
   - $5 free credit monthly
   - Simple deployment from GitHub
   - PostgreSQL, Redis support
   - Great developer experience

3. **Heroku**
   - Well-established platform
   - Easy scaling options
   - Add-on marketplace (PostgreSQL, etc.)
   - $5/month for basic dyno

4. **DigitalOcean App Platform**
   - $5/month starter tier
   - Automatic deployments
   - Built-in monitoring
   - Database options available

#### Frontend (React/Vite)

**Best Options:**

1. **Vercel** ⭐ (Recommended)
   - Unlimited free deployments
   - Automatic deployments from GitHub
   - Edge network (fast globally)
   - Perfect for React/Vite apps
   - Custom domains included
   - Setup: `npm run build` → Deploy dist folder

2. **Netlify**
   - Free tier with 100GB bandwidth
   - GitHub integration
   - Form handling, serverless functions
   - Great for static sites

3. **Cloudflare Pages**
   - Unlimited bandwidth on free tier
   - Fast global CDN
   - GitHub/GitLab integration
   - Custom domains

4. **GitHub Pages**
   - Free for public repositories
   - Simple setup with GitHub Actions
   - Best for static sites

### Recommended Stack for Production

**Option 1: Full Stack on Render**
- Backend: Render Web Service (FastAPI)
- Database: Render PostgreSQL (free tier)
- Frontend: Vercel (React)
- Cost: **FREE** (within free tier limits)

**Option 2: Separated Services**
- Backend: Railway ($5/month free credit)
- Database: Railway PostgreSQL (included)
- Frontend: Vercel (free)
- Cost: **FREE** initially, ~$5/month after credit

### Deployment Steps

#### Deploying Backend to Render

1. Push your code to GitHub
2. Create account on [Render](https://render.com)
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Environment**: Python 3
6. Add environment variables if needed
7. Deploy!

#### Deploying Frontend to Vercel

1. Build the production version:
   ```bash
   cd frontend
   npm run build
   ```

2. Install Vercel CLI (optional):
   ```bash
   npm install -g vercel
   vercel
   ```

3. Or deploy via Vercel Dashboard:
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Deploy!

4. Update API base URL in `frontend/src/services/api.js`:
   ```javascript
   const API_BASE_URL = process.env.VITE_API_URL || 'https://your-backend.onrender.com';
   ```

### Production Checklist

- [ ] Switch from SQLite to PostgreSQL for backend
- [ ] Set up environment variables for API URLs
- [ ] Configure CORS for production domains
- [ ] Enable HTTPS (automatic on Vercel/Render)
- [ ] Add error logging/monitoring (e.g., Sentry)
- [ ] Set up CI/CD pipelines (GitHub Actions)
- [ ] Add rate limiting to API endpoints
- [ ] Optimize frontend build (already done with Vite)

## 📄 License

This project is open source and available for personal and educational use.

## 👨‍💻 Author

Built as a portfolio project to demonstrate full-stack development skills.

---

**Happy Job Hunting! 🎯**
