import { User } from '../../interfaces/User';

export interface UserState {
    user: User | undefined;
    token: string | undefined;
}
