import mongoose from 'mongoose';
import { ActivityModel } from '../models/Activity.js';
import { LeaderboardModel } from '../models/Leaderboard.js';
import { TeamModel } from '../models/Team.js';
import { UserModel } from '../models/User.js';
import { WorkoutModel } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Seed the octofit_db database with test data');
    console.log('Connected to octofit_db');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    await UserModel.insertMany([
      {
        username: 'alex.runner',
        email: 'alex.runner@example.com',
        firstName: 'Alex',
        lastName: 'Rivera',
        fitnessLevel: 'advanced',
        teamName: 'Trail Blazers',
      },
      {
        username: 'maya.moves',
        email: 'maya.moves@example.com',
        firstName: 'Maya',
        lastName: 'Chen',
        fitnessLevel: 'intermediate',
        teamName: 'Core Crew',
      },
      {
        username: 'sam.strides',
        email: 'sam.strides@example.com',
        firstName: 'Sam',
        lastName: 'Patel',
        fitnessLevel: 'beginner',
        teamName: 'Trail Blazers',
      },
      {
        username: 'jordan.lifts',
        email: 'jordan.lifts@example.com',
        firstName: 'Jordan',
        lastName: 'Morgan',
        fitnessLevel: 'advanced',
        teamName: 'Core Crew',
      },
    ]);

    await TeamModel.insertMany([
      {
        name: 'Trail Blazers',
        mascot: 'Comet',
        members: ['alex.runner', 'sam.strides'],
        weeklyGoalMinutes: 540,
      },
      {
        name: 'Core Crew',
        mascot: 'Pulse',
        members: ['maya.moves', 'jordan.lifts'],
        weeklyGoalMinutes: 600,
      },
    ]);

    await ActivityModel.insertMany([
      {
        username: 'alex.runner',
        activityType: 'Trail run',
        durationMinutes: 52,
        distanceMiles: 6.4,
        caloriesBurned: 620,
        activityDate: new Date('2026-08-18T13:30:00.000Z'),
      },
      {
        username: 'maya.moves',
        activityType: 'Cycling',
        durationMinutes: 45,
        distanceMiles: 12.1,
        caloriesBurned: 430,
        activityDate: new Date('2026-08-19T16:00:00.000Z'),
      },
      {
        username: 'sam.strides',
        activityType: 'Brisk walk',
        durationMinutes: 34,
        distanceMiles: 2.1,
        caloriesBurned: 190,
        activityDate: new Date('2026-08-19T11:15:00.000Z'),
      },
      {
        username: 'jordan.lifts',
        activityType: 'Strength training',
        durationMinutes: 60,
        caloriesBurned: 510,
        activityDate: new Date('2026-08-20T12:00:00.000Z'),
      },
    ]);

    await LeaderboardModel.insertMany([
      {
        username: 'jordan.lifts',
        rank: 1,
        totalPoints: 1420,
        weeklyMinutes: 315,
        streakDays: 12,
      },
      {
        username: 'alex.runner',
        rank: 2,
        totalPoints: 1365,
        weeklyMinutes: 288,
        streakDays: 9,
      },
      {
        username: 'maya.moves',
        rank: 3,
        totalPoints: 1180,
        weeklyMinutes: 240,
        streakDays: 7,
      },
      {
        username: 'sam.strides',
        rank: 4,
        totalPoints: 760,
        weeklyMinutes: 152,
        streakDays: 4,
      },
    ]);

    await WorkoutModel.insertMany([
      {
        name: 'Foundation Full Body',
        focusArea: 'Mobility and strength',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: ['Bodyweight squats', 'Incline pushups', 'Glute bridges', 'Dead bugs'],
        recommendedFor: ['sam.strides'],
      },
      {
        name: 'Tempo Builder Ride',
        focusArea: 'Cardio endurance',
        difficulty: 'intermediate',
        durationMinutes: 45,
        exercises: ['Warmup spin', 'Tempo intervals', 'Cadence drills', 'Cooldown'],
        recommendedFor: ['maya.moves'],
      },
      {
        name: 'Summit Strength Circuit',
        focusArea: 'Power and conditioning',
        difficulty: 'advanced',
        durationMinutes: 50,
        exercises: ['Kettlebell swings', 'Walking lunges', 'Pullups', 'Burpees'],
        recommendedFor: ['alex.runner', 'jordan.lifts'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
