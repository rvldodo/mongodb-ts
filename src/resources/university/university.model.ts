import UniversityInterface from '@/resources/university/university.interface';
import { model, Schema } from 'mongoose';

const universitySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        students: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const University = model<UniversityInterface>('University', universitySchema);

export default University;
