import UserInterface from '@/resources/user/user.interface';
import { Document } from 'mongoose';

interface UniversityInterface extends Document {
    name: string;
    students: UserInterface[];
}

export default UniversityInterface;
