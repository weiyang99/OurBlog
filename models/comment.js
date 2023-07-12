import { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
    comment: {
        type: String,
    }
},
    { timestamps: true }
);

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;