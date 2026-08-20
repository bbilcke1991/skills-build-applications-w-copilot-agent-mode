import { Schema, model } from 'mongoose';

export interface Team {
  name: string;
  mascot: string;
  members: string[];
  weeklyGoalMinutes: number;
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    members: [{ type: String, required: true }],
    weeklyGoalMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

export const TeamModel = model<Team>('Team', teamSchema);