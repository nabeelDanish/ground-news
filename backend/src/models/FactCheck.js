import mongoose from 'mongoose';

const factCheckSchema = new mongoose.Schema(
  {
    article_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
      required: true,
    },
    claim: {
      type: String,
      required: true,
    },
    verdict: {
      type: String,
      enum: ['True', 'Mostly True', 'False', 'Mostly False', 'Unproven', 'Not Rated'],
      required: true,
    },
    source: {
      type: String,
      enum: ['Snopes', 'FactCheck.org', 'PolitiFact', 'Full Fact', 'Other'],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    fact_check_date: {
      type: Date,
    },
    rating_score: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

export default mongoose.model('FactCheck', factCheckSchema);
