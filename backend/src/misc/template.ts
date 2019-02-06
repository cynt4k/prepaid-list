import compile from 'string-template/compile';

export const Template = {
    ERROR_USER_NOT_FOUND: compile('User {0} not found'),
    ERROR_LOW_BALANCE: compile('User {0} has low balance')
};

export enum I18n {
    INFO_SUCCESS = 'OK',
    WARN_NO_REFRESH_TOKEN = 'W_NO_REFRESH_TOKEN',
    WARN_UID_TOKEN_EXIST = 'W_UID_TOKEN_EXIST',
    WARN_UID_TOKEN_NOT_FOUND = 'W_UID_TOKEN_NOT_FOUND',
    WARN_USER_EXIST = 'W_USER_EXIST',
    WARN_USER_NOT_FOUND = 'W_USER_NOT_FOUND',
    WARN_NO_ORDERS_FOUND = 'W_NO_ORDERS_FOUND',
    ERR_LOW_BALANCE = 'E_LOW_BALANCE',
    ERR_ACL_GROUP_NOT_FOUND = 'E_ACL_GROUP_NOT_FOUND',
    ERR_INTERNAL_SERVER = 'E_INTERNAL_SERVER'
}
