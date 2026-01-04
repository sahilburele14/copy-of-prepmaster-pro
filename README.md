# PrepMaster Pro

🚀 **PrepMaster Pro** is a modern web application designed to help students and professionals prepare for interviews, exams, and skill assessments. It combines AI‑powered question generation with a clean, responsive UI for a seamless learning experience.

---

## 🌐 Live Demo
👉 [View the deployed app](https://copy-of-prepmaster-pro.vercel.app)

---

## ✨ Features
- 🔑 Secure authentication (JWT‑based login/signup)
- 📚 AI‑powered MCQ generation using Gemini API
- 🗄️ MongoDB Atlas integration for persistent storage
- ⚡ Built with **React + Vite + TypeScript** for fast performance
- 🎨 Responsive UI with modern design
- ☁️ Deployed on **Vercel** with environment variable management

---

## 🛠️ Tech Stack
- **Frontend:** React 19, Vite, TypeScript, Lucide Icons
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas
- **AI Integration:** Gemini API
- **Deployment:** Vercel

---

## 📂 Project Structure
copy-of-prepmaster-pro/
├── components/       # Reusable UI components
├── pages/            # Application pages (Login, Dashboard, etc.)
├── server/           # Backend logic & DB connection
├── services/         # API service handlers
├── App.tsx                      # Root React component
├── vite.config.ts        # Vite configuration
├── package.json            # Dependencies & scripts
└── .env.local        # Environment variables (not committed)

Code

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas cluster
- Gemini API key

### Steps
1. **Clone the repo**
   ```bash
   git clone https://github.com/sahilburele14/copy-of-prepmaster-pro.git
   cd copy-of-prepmaster-pro
Install dependencies

bash
npm install
Configure environment variables
Create a .env.local file in the root:

env
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/prepmaster?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
VITE_API_BASE_URL=https://your-api.com
Run locally

bash
npm run dev
Build for production

bash
npm run build

📸 Screenshots
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0c069e24-5ef3-42b2-9dbe-5de1b250307d" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/770fde20-5318-4d0b-ac23-83030539029f" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/80445004-cf72-4a24-9c02-52f2e73d2bac" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/32d21f7f-28b9-4a3f-9758-df898afc0f98" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/80118625-4b28-4496-b93e-db3f55b561d9" />


🚀 Deployment
Hosted on Vercel

Auto‑deploys on push to main branch

Environment variables managed securely via Vercel dashboard

👨‍💻 Author
Sahil Burele  
Final‑year B.Tech student | Fullstack Developer | Data Enthusiast
📍 Nagpur, Maharashtra, India

📜 License
This project is licensed under the MIT License.
