import express from 'express';
import { IUser } from './user';

export interface Request extends express.Request {
    token?: string,
    user?: IUser
}