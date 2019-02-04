import compile from 'string-template/compile';

export const Template = {
    USER_NOT_FOUND: compile('User {0} not found'),
    LOW_BALANCE: compile('User {0} has low balance')
};
