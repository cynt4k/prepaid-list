import { Model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { IUserModel } from '../types/models';
import bcrypt from 'bcrypt';
import { AclGroup } from './acl-group';
import { PrepaidListError } from '../errors';
import mongooseHistory from 'mongoose-history';
import mongooseTimestamp from 'mongoose-timestamp';
import { Template, I18n } from '../misc';
import { ErrorCode } from '../types/error';

export const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    tokenUid: { type: String, unique: true, select: false },
    password: { type: String },
    email: { type: String, unique: true },
    name: {
        firstname: { type: String },
        lastname: { type: String }
    },
    balance: { type: Number, default: 0.0 },
    active: { type: Boolean, required: true, default: true },
    role: { type: Schema.Types.ObjectId, ref: 'AclGroup', required: true }
}, { toJSON: { transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.tokenUid;
    return ret;
}}});

userSchema.methods.compareToken = function(checkingToken: string, cb: (e: any, isMatch: any) => {}) {
    bcrypt.compare(checkingToken, this.token, (e: mongoose.Error, isMatch: boolean) => {
        cb(e, isMatch);
    });
};

userSchema.methods.updateToken = function(newToken: string) {
    this.token = bcrypt.hashSync(newToken, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function(checkingPassword: string, cb: (e: any, isMatch: any) => {}) {
    if (!this.password) {
        cb(new Error('No password set'), undefined);
    }

    bcrypt.compare(checkingPassword, this.password, (e: mongoose.Error, isMatch: boolean) => {
        if (!this.password) {
            cb(new Error('No password set'), undefined);
        }
        cb(e, isMatch);
    });
};

userSchema.methods.updatePassword = function(newPassword: string) {
    this.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
};

userSchema.pre('validate', async function (): Promise<void> {
    const newDocument: IUserModel = <IUserModel> this;

    if (newDocument.role) {
        return;
    }

    try {
        const aclGroup = await AclGroup.findOne({ name: process.env.DEFAULT_ACL_GROUP as string | 'User'}).exec();
        if (!aclGroup) {
            throw new PrepaidListError(I18n.ERR_ACL_GROUP_NOT_FOUND, ErrorCode.ACL_GROUP_NOT_FOUND);
        }
        newDocument.role = aclGroup;
    } catch (e) {
        throw e;
    }
});

userSchema.plugin(mongooseHistory);
userSchema.plugin(mongooseTimestamp);


export const User: Model<IUserModel> = mongoose.model<IUserModel>('User', userSchema, 'user');
