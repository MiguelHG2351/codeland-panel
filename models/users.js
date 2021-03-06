import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    cover: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    projects_count: {
        type: Number,
    },
    blogs_count: {
        type: Number,
    },
    fragments_count: {
        type: Number,
    },
}, {
    timestamps: false
})

export default mongoose.models.users || mongoose.model('users', userSchema)
