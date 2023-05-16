import { Schema } from 'mongoose';

interface Token extends Object {
    id: Schema.Types.ObjectId;
    expires: number;
}

export default Token;
