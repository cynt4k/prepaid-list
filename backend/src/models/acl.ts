import mongoose, { Model, model } from 'mongoose';
import { IAclModel, AclRight } from '../types/models';
import mongooseHistory from 'mongoose-history';
import mongooseTimestamp from 'mongoose-timestamp';

const aclSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rights: [{ type: AclRight, required: true }]
});

aclSchema.pre('save', function() {
    const newDocument = <IAclModel> this;
    const duplicate: AclRight[] = newDocument.rights.filter((item: AclRight, index: number) => newDocument.rights.indexOf(item) !== index);
    if (duplicate) {
        throw new Error(`Acl right duplicated ${duplicate}`);
    }
});

aclSchema.plugin(mongooseHistory);
aclSchema.plugin(mongooseTimestamp);

export const Acl: Model<IAclModel> = mongoose.model<IAclModel>('Acl', aclSchema, 'acl');\
