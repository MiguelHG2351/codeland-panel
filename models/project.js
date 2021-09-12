import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    users_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true
    },
    path: {
        type: String,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    files: {
        type: Array,
        required: true,
    },
    github: {
        type: String,
    },
    mode: {
        type: String,
    },
})

export default mongoose.models.projects || mongoose.model('projects', projectSchema)
