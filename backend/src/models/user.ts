import mongoose, { Model, model } from 'mongoose';

export interface IUserModel extends mongoose.Document {
    username: string,
    token: number,
    email: string,
    name: {
        firstname: string,
        lastname: string
    },
    admin: boolean,
    balance: number
}

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    token: { type: Number, unique: true },
    email: { type: String, unique: true },
    name: {
        firstname: { type: String },
        lastname: { type: String }
    },
    admin: Boolean,
    balance: { type: Number, default: 0.0 }
});

userSchema.methods.toJson = function(this: IUserModel) {
    let obj = this.toObject();
    obj.id = obj._id;
    delete obj.__v;
    delete obj._id;
    return obj;
};

export const User: Model<IUserModel> = mongoose.model<IUserModel>('User', userSchema, 'user');
