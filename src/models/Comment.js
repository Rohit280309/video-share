const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.models.comments || mongoose.model("comments", CommentSchema);

export default Comment;
