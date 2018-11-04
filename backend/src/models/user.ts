import mongoose, { Model, model } from 'mongoose';
import { IUserModel } from '../types/models';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    token: { type: String, unique: true, select: false },
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

userSchema.methods.compareToken = function(checkingToken: string, cb:(e: any, isMatch: any) => {}) {
    bcrypt.compare(checkingToken, this.token, (e: mongoose.Error, isMatch: boolean) => {
        cb(e, isMatch);
    });
};

userSchema.methods.updateToken = function(newToken: string) {
    this.token = bcrypt.hashSync(newToken, bcrypt.genSaltSync(10));
};

export const User: Model<IUserModel> = mongoose.model<IUserModel>('User', userSchema, 'user');
