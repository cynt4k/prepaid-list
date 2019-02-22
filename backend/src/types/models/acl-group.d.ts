import { Document, Types } from 'mongoose';
import { IAclModel } from './acl';
import { ITimestamp } from './timestamp';

export interface IAclGroupModel extends Document, ITimestamp {
    name: string;
    childs?: IAclGroupModel[];
    acls: IAclModel[];
}
