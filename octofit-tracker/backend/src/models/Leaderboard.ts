import { Schema, model } from 'mongoose';

export interface LeaderboardEntry {
  username: string;
  rank: number;
  totalPoints: number;
  weeklyMinutes: number;
  streakDays: number;
}

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    username: { type: String, required: true, unique: true },
    rank: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
    weeklyMinutes: { type: Number, required: true },
    streakDays: { type: Number, required: true },
  },
  { timestamps: true },
);

export const LeaderboardModel = model<LeaderboardEntry>('Leaderboard', leaderboardSchema);