import { Path, Accept, GET, POST, Param, Security, PathParam, PUT } from 'typescript-rest';
import { Tags, Response, Example, IsLong } from 'typescript-rest-swagger';

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
    PROFILE_MOD_TOKENUID = 'profile_mod_tokenuid',
    MANAGE_LOGIN = 'manage_login'
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
    username: string;
    name: {
        firstname: string;
        lastname: string;
    };
}

export interface ICategoryModel {
    id: string;
    name: ITranslationModel;
    products: IProductModel[];
    icon: string;
}

export interface IProductOrder {
    productId: string;
    price: number;
    totalPrice: number;
    quantity: number;
    extras?: IProductExtraOrder[];
}

export interface IProductExtraOrder {
    productId: string;
    price: number;
    totalPrice: number;
    quantity: number;
}

export interface IOrder {
    id: string;
    user: IUserModel;
    totalPrice: number;
    products: IProductOrder[];
}

export interface INewProductOrder {
    productId: string;
    quantity: number;
    extras?: INewProductExtraOrder[];
}

export interface INewProductExtraOrder {
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
    id: string;
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
    shortname: string;
}

export interface ITranslationModel {
    id: string;
    translations: ILanguageTranslation[];
    type: LanguageType;
}

export interface IBalanceUpdateModel {
    amount: number;
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



@Path('auth')
export class Auth {

    @Path('login/token')
    @POST
    @Tags('auth')
    @Accept('application/json')
    @Response<IResponse<IResponseToken>>( 200, 'Return the token for the user')
    // @ts-ignore
    loginToken(login: IUserLoginToken): IResponse<IResponseToken> { }

    @Path('login/user')
    @POST
    @Tags('auth')
    @Accept('application/json')
    @Response<IResponse<IResponseToken>>(200, 'Return the token for the user')
    // @ts-ignore
    loginUser(login: IUserLogin): IResponse<IResponseToken> { }

    @Path('register')
    @POST
    @Tags('auth')
    @Accept('application/json')
    @Response<IResponse<IResponseToken>>(200, 'Register an new user')
    // @ts-ignore
    registerUser(register: IUserRegister): IResponse<IResponseToken> { }

    @Path('refresh')
    @Security('token')
    @POST
    @Tags('auth')
    @Accept('application/json')
    @Response<IResponse<IUserRefreshToken>>(200, 'Refresh the token')
    // @ts-ignore
    refreshToken(token: IUserRefreshToken): IResponse<IUserRefreshToken> { }
}

@Path('order')
export class Order {

    @Security('token')
    @POST
    @Tags('order')
    @Accept('application/json')
    @Response<IResponse<IOrder>>(200, 'Create an order')
    // @ts-ignore
    createOrder(newOrder: INewOrder): IResponse<IOrder> { }

    @Security('token')
    @Path('ordersForUser')
    @GET
    @Tags('order')
    @Response<IResponse<IOrder[]>>(200, 'Orders for the logged in user')
    // @ts-ignore
    getOrders(): IResponse<IOrder[]> { }
}

@Path('info')
export class Info {

    @Security('token')
    @Path('products')
    @GET
    @Tags('product')
    @Response<IResponse<IProductModel[]>>(200, 'Get all available products')
    // @ts-ignore
    getProducts(): IResponse<IProductModel[]> { }

    @Path('product/:id')
    @GET
    @Tags('product')
    @Response<IResponse<IProductModel>>(200, 'Get the product by the barcode')
    // @ts-ignore
    getProductByBarcode(@PathParam('id') @IsLong id: number) { }

    @Security('token')
    @Path('categories')
    @GET
    @Tags('product')
    @Response<IResponse<ICategoryModel[]>>(200, 'Get all categories')
    // @ts-ignore
    getCategories() { }

    @Security('token')
    @Path('categories/all')
    @GET
    @Tags('product')
    @Response<IResponse<ICategoryModel[]>>(200, 'Get all categories with all products')
    // @ts-ignore
    getAllCategories() { }

    @Security('token')
    @Path('categories/:id')
    @GET
    @Tags('product')
    @Response<IResponse<ICategoryModel>>(200, 'Get all products for an category')
    // @ts-ignore
    getCategory(@PathParam('id') id: string) { }
}

@Path('user')
export class User {

    @GET
    @Tags('user')
    @Response<IResponse<IUser[]>>(200, 'Get all available users')
    // @ts-ignore
    getUsers() { }
}

@Path('profile')
export class Profile {

    @Security('token')
    @GET
    @Tags('profile')
    @Response<IResponse<IUserModel>>(200, 'Get data for the current user')
    // @ts-ignore
    getProfile() { }

    @Security('token')
    @PUT
    @Tags('profile')
    // @Response<IResponse<IUserModel>>(200, 'Update the data for the current user')
    // @ts-ignore
    updateProfile(updateUser: IUserModel): IResponse<IUserModel> { }

    @Security('token')
    @Path('balance')
    @PUT
    @Tags('profile')
    // @ts-ignore
    updateBalance(newBalance: IBalanceUpdateModel): IResponse<IUserModel> { }
}
