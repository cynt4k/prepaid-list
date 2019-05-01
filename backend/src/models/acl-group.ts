import { Model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { IAclModel, AclRight, IAclGroupModel } from '../types/models';
import mongooseHistory from 'mongoose-history';
import mongooseTimestamp from 'mongoose-timestamp';
import mongooseAutopopulate from 'mongoose-autopopulate';

const aclGroupSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    childs: [{ type: Schema.Types.ObjectId, ref: 'AclGroup' }],
    acls: [{ type: Schema.Types.ObjectId, ref: 'Acl', required: true }]
}, { toJSON: { transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
}}});

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

aclGroupSchema.methods.toJSON = function(this: IAclGroupModel) {
    let obj = this.toObject();
    obj.id = obj._id;
    delete obj.__v;
    delete obj._id;
    return obj;
};

aclGroupSchema.plugin(mongooseHistory);
aclGroupSchema.plugin(mongooseTimestamp);
aclGroupSchema.plugin(mongooseAutopopulate);

export const AclGroup: Model<IAclGroupModel> = mongoose.model<IAclGroupModel>('AclGroup', aclGroupSchema, 'acl-group');
