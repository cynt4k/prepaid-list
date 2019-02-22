import { Path, Accept, GET, POST, Param } from 'typescript-rest';
import { Tags, Response, Example } from 'typescript-rest-swagger';
import { IResponse, IResponseToken, IUser } from '../types/express';
import { IUserModel } from '../types';

interface IUserLoginToken {
    token: string;
}

interface IUserLogin {
    username: string;
}

interface IUserRegister {
    username: string;
    email: string;
    token?: string;
    name: {
        firstname: string;
        lastname: string;
    };
}

@Path('auth')
export class Auth {

    // @Example<Array<IResponse<IResponseToken>>>([{
    //     code: 200,
    //     message: 'OK',
    //     status: 'success',
    //     data: { user: 'testUser', token: 'asdfasdf', refreshToken: 'asfdasdf' }
    // }])

    @Example<IResponse<IResponseToken>>({
        code: 200,
        message: 'OK',
        status: 'success',
        data: { user: 'testUser', token: 'asdfasdf', refreshToken: 'asfdasdf' }
    })

    @Path('login/token')
    @POST
    @Tags('auth')
    @Accept('application/json')
    @Response<IResponse<IResponseToken>>( 204, 'Return the token for the user')
    loginToken(login: IUserLoginToken) { }

    @Path('login/user')
    @POST
    @Tags('auth')
    @Accept('application/json')
    @Response<IResponse<IResponseToken>>(204, 'Return the token for the user')
    loginUser(login: IUserLogin) { }

    @Path('register')
    @POST
    @Tags('auth')
    @Accept('application/json')
    @Response<IResponse<IResponseToken>>(204, 'Register an new user')
    registerUser(register: IUserRegister) { }
}
