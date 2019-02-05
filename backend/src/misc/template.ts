import compile from 'string-template/compile';

export const Template = {
    ERROR_USER_NOT_FOUND: compile('User {0} not found'),
    ERROR_LOW_BALANCE: compile('User {0} has low balance'),
    ERROR_INTERNAL_SERVER: 'Internal server error',
    I18N_INFO_SUCCESS: 'OK',
    I18N_NO_ORDERS_FOUND: 'No orders found for user %s',
    I18N_WARN_UID_TOKEN_NOT_FOUND: 'Token %s not found',
    I18N_WARN_UID_TOKEN_EXIST: 'Token %s already exist',
    I18N_WARN_USER_NOT_FOUND: 'User %s not found',
    I18N_WARN_USER_EXIST: 'User %s alrealdy exist'
};
