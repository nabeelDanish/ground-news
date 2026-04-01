import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
    },
    source_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Source',
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    image_url: {
      type: String,
    },
    published_at: {
      type: Date,
      required: true,
    },
    fetched_at: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: String,
    },
    cluster_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cluster',
    },
    fact_check_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FactCheck',
      },
    ],
    word_count: {
      type: Number,
    },
    raw_data: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Article', articleSchema);
