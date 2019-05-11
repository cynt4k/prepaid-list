import { Container } from 'inversify';
import 'reflect-metadata';
import { SERVICE_IDENTIFIER } from './models/Identifiers';
import { IApiService, IJwtService, IProductService, IUserService, IProfileService } from './types';
import { ProductService, ApiService, JwtService, UserService } from '@/services';
import { ProfileService } from './services/profile';

const container = new Container();
container.bind<IApiService>(SERVICE_IDENTIFIER.API).to(ApiService);
container.bind<IJwtService>(SERVICE_IDENTIFIER.JWT).to(JwtService);
container.bind<IProductService>(SERVICE_IDENTIFIER.PRODUCT_SERVICE).to(ProductService);
container.bind<IUserService>(SERVICE_IDENTIFIER.USER_SERVICE).to(UserService);
container.bind<IProfileService>(SERVICE_IDENTIFIER.PROFILE_SERVICE).to(ProfileService);

export { container };
