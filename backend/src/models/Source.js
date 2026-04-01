import mongoose from 'mongoose';

const sourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
    },
    logo_url: {
      type: String,
    },
    bias_score: {
      type: Number,
      min: -1,
      max: 1,
      required: true,
      description: '-1 (far left) to 1 (far right), 0 = center',
    },
    bias_category: {
      type: String,
      enum: ['Far Left', 'Left', 'Left-Center', 'Center', 'Right-Center', 'Right', 'Far Right'],
      required: true,
    },
    credibility_score: {
      type: Number,
      min: 0,
      max: 100,
    },
    country: {
      type: String,
      default: 'USA',
    },
    category: [String],
    ownership: {
      parent_company: String,
      owner: String,
      founded_year: Number,
      description: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Source', sourceSchema);
