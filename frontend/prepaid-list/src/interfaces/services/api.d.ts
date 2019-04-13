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
    price: number;
}

export interface ITranslationModel {
    id: string;
    translations: ILanguageTranslation[];
    type: LanguageType;
}
