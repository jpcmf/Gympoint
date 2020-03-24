import mongoose from 'mongoose';

const CheckinSchema = new mongoose.Schema(
  {
    student_id: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Checkin', CheckinSchema);
