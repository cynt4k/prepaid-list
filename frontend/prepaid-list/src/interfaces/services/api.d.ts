export interface IResponse<T> {
    status: string;
    code: number;
    message: string;
    data: T;
}

export interface IUserLoginToken {
    token: string;
}

export interface IUserLogin {
    username: string;
}

export interface IUserRegister {
    username: string;
    email: string;
    token?: string;
    name: {
        firstname: string;
        lastname: string;
    };
}

export interface IResponseToken {
    user: string;
    token: string;
    refreshToken: string;
}

export interface IUserRefreshToken {
    refreshToken: string;
}

export interface IAclGroupModel {
    name: string;
    childs?: IAclGroupModel[];
    acls: IAclModel[];
}

export enum AclRight {
    USER_GET = 'user_get',
    USER_ADD = 'user_add',
    USER_DEL = 'user_delete',
    USER_MOD = 'user_mod',
    USER_ENABLE = 'user_enable',
    USER_DISABLE = 'user_disable',
    PREPAID_ALLOW = 'prepaid_allow',
    ORDER_GET = 'order_get',
    ORDER_ADD = 'order_add',
    ORDER_DEL = 'order_del',
    ORDER_MOD = 'order_mod',
    PRODUCT_GET = 'product_get',
    PRODUCT_ADD = 'product_add',
    PRODUCT_DEL = 'product_del',
    PRODUCT_MOD = 'product_mod',
    CATEGORY_GET = 'category_get',
    CATEGORY_ADD = 'category_add',
    CATEGORY_DEL = 'category_del',
    CATEGORY_MOD = 'category_mod',
    PROFILE_GET = 'profile_get',
    PROFILE_MOD = 'profile_mod',
    PROFILE_DISABLE = 'profile_disable',
    PROFILE_MOD_BALANCE = 'profile_mod_balance',
    PROFILE_MOD_TOKENUID = 'profile_mod_tokenuid'
}


export interface IAclModel {
    id: string;
    name: string;
    rights: AclRight[];
}

export interface IUserModel {
    id: string;
    username: string;
    tokenUid: string;
    email: string;
    name: {
        firstname: string,
        lastname: string
    };
    balance: number;
    role: IAclGroupModel;
    active: boolean;
}

export interface IUser {
    id: string;
    nickname: string;
    name?: string;
}

export interface ICategoryModel {
    id: string;
    name: ITranslationModel;
    products: IProductModel[];
    icon: string;
}

export interface IProductOrder {
    id: string;
    productId: string;
    price: number;
    totalPrice: number;
    quantity: number;
}

export interface IOrder {
    id: string;
    user: string;
    totalPrice: number;
    products: IProductOrder[];
}

export interface INewProductOrder {
    productId: string;
    quantity: number;
}

export interface INewOrder {
    products: INewProductOrder[];
}

export interface IProductModel {
    id: string;
    name: ITranslationModel;
    barcode: string;
    icon: string;
    price: number;
    extras: IProductExtra[];
}

export interface IProductExtra {
    name: ITranslationModel;
    icon: string;
    price: number;
}

export enum LanguageCode {
    DE = 'DE',
    FR = 'FR',
    EN = 'EN'
}

export enum LanguageType {
    CATEGORY = 'category',
    PRODUCT = 'product'
}


export interface ILanguageTranslation {
    languageCode: LanguageCode;
    name: string;
    shortname?: string;
}

export interface ITranslationModel {
    id: string;
    translations: ILanguageTranslation[];
    type: LanguageType;
}

export enum II18nError {
    INFO_SUCCESS = 'OK',
    WARN_NO_REFRESH_TOKEN = 'W_NO_REFRESH_TOKEN',
    WARN_UID_TOKEN_EXIST = 'W_UID_TOKEN_EXIST',
    WARN_UID_TOKEN_NOT_FOUND = 'W_UID_TOKEN_NOT_FOUND',
    WARN_USER_EXIST = 'W_USER_EXIST',
    WARN_USER_NOT_FOUND = 'W_USER_NOT_FOUND',
    WARN_USERS_NOT_FOUND = 'W_USERS_NOT_FOUND',
    WARN_USER_NOT_PROVIDED = 'W_USER_NOT_PROVIDED',
    WARN_USER_NOT_ALLOWED = 'W_USER_NOT_ALLOWED',
    WARN_PRODUCTS_NOT_PROVIDED = 'W_PRODUCTS_NOT_PROVIDED',
    WARN_TOTALPRICE_NOT_PROVIDED = 'W_TOTALPRICE_NOT_PROVIDED',
    WARN_NO_ORDERS_FOUND = 'W_NO_ORDERS_FOUND',
    WARN_NO_PRODUCTS_FOUND = 'W_NO_PRODUCTS_FOUND',
    WARN_PRODUCT_NOT_FOUND = 'W_PRODUCT_NOT_FOUND',
    WARN_NO_CATEGORIES_FOUND = 'W_NO_CATEGORIES_FOUND',
    WARN_INVALID_PARAMS = 'W_INVALID_PARAMS',
    ERR_LOW_BALANCE = 'E_LOW_BALANCE',
    ERR_ACL_GROUP_NOT_FOUND = 'E_ACL_GROUP_NOT_FOUND',
    ERR_INTERNAL_SERVER = 'E_INTERNAL_SERVER',
    ERR_LANGUAGE_CODE_DUPLICATED = 'E_LANGUAGE_CODE_DUPLICATED',
    ERR_TRANSLATION_NOT_FOUND = 'E_TRANSLATION_NOT_FOUND',
    ERR_ICON_NOT_VALID = 'E_ICON_NOT_VALID',
    ERR_ICON_NOT_FOUND = 'E_ICON_NOT_FOUND',
    VAL_USER_BALANCE_EXIST = 'V_BALANCE_EXIST',
    VAL_USER_ACTIVE_EXIST = 'V_USER_ACTIVE_EXIST',
    VAL_USER_ROLE_EXIST = 'V_USER_ROLE_EXIST',
    VAL_REGISTER_USERNAME_NOT_PROVIDED = 'V_REGISTER_USERNAME_NOT_PROVIDED',
    VAL_REGISTER_EMAIL_NOT_VALID = 'V_REGISTER_EMAIL_NOT_VALID',
    VAL_REGISTER_TOKEN_NOT_VALID = 'V_REGISTER_TOKEN_NOT_VALID',
    VAL_REGISTER_FIRSTNAME_NOT_PROVIDED = 'V_REGISTER_FIRSTNAME_NOT_PROVIDED',
    VAL_REGISTER_LASTNAME_NOT_PROVIDED = 'V_REGISTER_LASTNAME_NOT_PROVIDED',
    VAL_USER_USERNAME_EXIST = 'V_USER_USERNAME_EXIST',
    VAL_USER_BALANCE_NOT_PROVIDED = 'V_USER_BALANCE_NOT_PROVIDED',
    VAL_ORDER_TOTALPRICE_PROVIDED = 'V_ORDER_TOTALPRICE_PROVIDED',
    VAL_ORDER_PRODUCTS_NOT_PROVIDED = 'V_ORDER_PRODUCTS_NOT_PROVIDED',
    VAL_ORDER_USER_EXIST = 'V_ORDER_USER_EXIST',
    VAL_TRANSLATION_MISSING = 'V_TRANSLATION_MISSING',
    VAL_TRANSLATION_TYPE_MISSING = 'V_TRANSLATION_TYPE_MISSING',
    VAL_CATEGORY_ICON_NOT_VALID = 'V_CATEGORY_ICON_NOT_VALID',
    VAL_CATEGORY_NAME_NOT_VALID = 'V_CATEGORY_NAME_NOT_VALID',
    VAL_PRODUCT_ICON_NOT_VALID = 'V_PRODUCT_ICON_NOT_VALID',
    VAL_PRODUCT_NAME_NOT_VALID = 'V_PRODUCT_NAME_NOT_VALID',
    VAL_PRODUCT_BARCODE_NOT_VALID = 'V_PRODUCT_BARCODE_NOT_VALID',
    VAL_PRODUCT_PRICE_NOT_VALID = 'V_PRODUCT_PRICE_NOT_VALID',
    VAL_PRODUCT_EXTRAS_NOT_VALID = 'V_PRODUCT_EXTRAS_NOT_VALID'
}

export interface IBalanceUpdateModel {
    amount: number;
}
