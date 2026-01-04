import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { User, Problem, MCQ } from './models';
import { PROBLEMS, MCQS } from '../constants';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Fix: Middleware cast to 'any' to prevent type mismatch with @types/express
app.use(cors() as any);
app.use(express.json() as any);

// API Routes
// Fix: Route handlers cast to 'any' to resolve 'No overload matches this call' errors
app.post('/api/auth/register', (async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
}) as any);

// Fix: Route handlers cast to 'any' to resolve 'No overload matches this call' errors
app.post('/api/auth/login', (async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}) as any);

// Fix: Route handlers cast to 'any' to resolve 'No overload matches this call' errors
app.get('/api/problems', (async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems.length > 0 ? problems : PROBLEMS);
  } catch (err) {
    res.json(PROBLEMS);
  }
}) as any);

// Fix: Route handlers cast to 'any' to resolve 'No overload matches this call' errors
app.get('/api/mcqs', (async (req, res) => {
  try {
    const { topicId } = req.query;
    const query = topicId ? { topicId } : {};
    const mcqs = await MCQ.find(query);
    res.json(mcqs.length > 0 ? mcqs : MCQS.filter(m => !topicId || m.topicId === topicId));
  } catch (err) {
    res.json(MCQS);
  }
}) as any);

// --- PRODUCTION SETUP ---
// Serve static files from the Vite build directory
const distPath = path.join(__dirname, '../dist');
// Fix: express.static cast to 'any' to resolve 'No overload matches this call' on app.use
app.use(express.static(distPath) as any);

// Handle SPA routing: return index.html for any unknown routes (not starting with /api)
// Fix: Catch-all handler cast to 'any' to resolve type compatibility issues
app.get('*', ((req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'));
  }
}) as any);

// Database seeding
const seedDatabase = async () => {
  try {
    const problemCount = await Problem.countDocuments();
    if (problemCount === 0) await Problem.insertMany(PROBLEMS);
    const mcqCount = await MCQ.countDocuments();
    if (mcqCount === 0) await MCQ.insertMany(MCQS);
  } catch (err) {
    console.error('Seeding error:', err);
  }
};

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prepmaster';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to Database');
    await seedDatabase();
    app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
  })
  .catch(err => console.error('Connection failed:', err));
