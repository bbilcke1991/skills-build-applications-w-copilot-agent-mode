import { Schema, model } from 'mongoose';

export interface Activity {
  username: string;
  activityType: string;
  durationMinutes: number;
  distanceMiles?: number;
  caloriesBurned: number;
  activityDate: Date;
}

const activitySchema = new Schema<Activity>(
  {
    username: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceMiles: Number,
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true },
);

export const ActivityModel = model<Activity>('Activity', activitySchema);