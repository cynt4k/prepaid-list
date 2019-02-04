import { Document, Types } from 'mongoose';
import { AclRight } from './acl-right';

export interface IAclModel extends Document {
    name: string;
    rights: [AclRight];
}
