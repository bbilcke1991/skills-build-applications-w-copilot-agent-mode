import express from 'express';
import db from './config/database.js';
import { ActivityModel } from './models/Activity.js';
import { LeaderboardModel } from './models/Leaderboard.js';
import { TeamModel } from './models/Team.js';
import { UserModel } from './models/User.js';
import { WorkoutModel } from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl, databaseState: db.readyState });
});

app.get('/api/users/', async (_request, response) => {
  const users = await UserModel.find().sort({ username: 1 }).lean();
  response.json(users);
});

app.get('/api/teams/', async (_request, response) => {
  const teams = await TeamModel.find().sort({ name: 1 }).lean();
  response.json(teams);
});

app.get('/api/activities/', async (_request, response) => {
  const activities = await ActivityModel.find().sort({ activityDate: -1 }).lean();
  response.json(activities);
});

app.get('/api/leaderboard/', async (_request, response) => {
  const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).lean();
  response.json(leaderboard);
});

app.get('/api/workouts/', async (_request, response) => {
  const workouts = await WorkoutModel.find().sort({ difficulty: 1, name: 1 }).lean();
  response.json(workouts);
});

app.listen(port, () => {
  console.log(`OctoFit API listening at ${baseUrl}`);
});
