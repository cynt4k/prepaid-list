import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { IAclModel, AclRight } from '../types/models';
import mongooseHistory from 'mongoose-history';
import mongooseTimestamp from 'mongoose-timestamp';

const aclSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    rights: [{ type: String, required: true }]
});

aclSchema.pre('save', function() {
    const newDocument = <IAclModel> this;
    const duplicate: AclRight[] = newDocument.rights.filter((item: AclRight, index: number) => newDocument.rights.indexOf(item) !== index);
    if (duplicate) {
        throw new Error(`Acl right duplicated ${duplicate}`);
    }
});

aclSchema.methods.toJSON = function(this: IAclModel) {
    let obj = this.toObject();
    obj.id = obj._id;
    delete obj.__v;
    delete obj._id;
    return obj;
};

aclSchema.plugin(mongooseHistory);
aclSchema.plugin(mongooseTimestamp);

export const Acl: Model<IAclModel> = mongoose.model<IAclModel>('Acl', aclSchema, 'acl');
