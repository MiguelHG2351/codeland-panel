import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
})

export const user = mongoose.models.users || mongoose.model('users', userSchema)
