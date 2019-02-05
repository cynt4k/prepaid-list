import { Model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { IAclModel, AclRight, IAclGroupModel } from '../types/models';
import mongooseHistory from 'mongoose-history';
import mongooseTimestamp from 'mongoose-timestamp';

const aclGroupSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    childs: [{ type: Schema.Types.ObjectId, ref: 'acl-group' }],
    acls: [{ type: Schema.Types.ObjectId, ref: 'acl', required: true }]
});

aclGroupSchema.pre('save', function() {
    const newDocument = <IAclGroupModel> this;
    if (!newDocument.childs) {
        return;
    }
    const duplicate: IAclGroupModel[] = newDocument.childs.filter((item: IAclGroupModel, index: number) => {
        return newDocument.childs!.indexOf(item) !== index;
    });
    if (duplicate) {
        throw new Error(`Acl group duplicated ${duplicate}`);
    }
});

aclGroupSchema.plugin(mongooseHistory);
aclGroupSchema.plugin(mongooseTimestamp);

export const AclGroup: Model<IAclGroupModel> = mongoose.model<IAclGroupModel>('AclGroup', aclGroupSchema, 'acl-group');
