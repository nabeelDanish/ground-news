import mongoose from 'mongoose';

const clusterSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    article_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
      },
    ],
    bias_distribution: {
      left: {
        type: Number,
        default: 0,
      },
      center: {
        type: Number,
        default: 0,
      },
      right: {
        type: Number,
        default: 0,
      },
    },
    coverage_gap: {
      type: Boolean,
      default: false,
    },
    gap_type: {
      type: String,
      enum: ['left-only', 'right-only', null],
      default: null,
    },
    story_date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Cluster', clusterSchema);
