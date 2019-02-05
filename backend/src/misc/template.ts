import compile from 'string-template/compile';

export const Template = {
    ERROR_USER_NOT_FOUND: compile('User {0} not found'),
    ERROR_LOW_BALANCE: compile('User {0} has low balance'),
    ERROR_INTERNAL_SERVER: 'Internal server error',
    INFO_SUCCESS: 'OK',
    I18N_NO_ORDERS_FOUND: 'No orders found for user %s'
};
