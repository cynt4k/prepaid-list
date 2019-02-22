import { Path, Accept, GET, POST, Param, Security } from 'typescript-rest';
import { Tags, Response, Example } from 'typescript-rest-swagger';

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
    name: string;
    rights: AclRight[];
}

export interface IUserModel {
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

export interface IProductOrder {
    productId: string;
    price: number;
    totalPrice: number;
    quantity: number;
}

export interface IOrder {
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
    shortname: string;
}

export interface ITranslationModel {
    translations: ILanguageTranslation[];
    type: LanguageType;
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
    @Security('api_key')
    @POST
    @Tags('auth')
    @Accept('application/json')
    @Response<IResponse<IUserRefreshToken>>(200, 'Refresh the token')
    // @ts-ignore
    refreshToken(token: IUserRefreshToken): IResponse<IUserRefreshToken> { }
}

@Path('order')
export class Order {

    @Security('api_key')
    @POST
    @Tags('order')
    @Accept('application/json')
    @Response<IResponse<IOrder>>(200, 'Create an order')
    // @ts-ignore
    createOrder(newOrder: INewOrder): IResponse<IOrder> { }

    @Security('api_key')
    @Path('ordersForUser')
    @GET
    @Tags('order')
    @Response<IResponse<IOrder[]>>(200, 'Orders for the logged in user')
    // @ts-ignore
    getOrders(): IResponse<IOrder[]> { }
}

@Path('product')
export class Product {

    @Security('api_key')
    @Path('products')
    @GET
    @Tags('product')
    @Response<IResponse<IProductModel[]>>(200, 'Get all available products')
    // @ts-ignore
    getProducts(): IResponse<IProductModel[]> { }
}
