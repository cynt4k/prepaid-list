import { Document, Types } from 'mongoose';
import { AclRight } from './acl-right';
import { ITimestamp } from './timestamp';

export interface IAclModel extends Document, ITimestamp {
    name: string;
    rights: [AclRight];
}
