import { Container } from 'inversify';
import 'reflect-metadata';
import { SERVICE_IDENTIFIER } from './models/Identifiers';
import { ApiService } from './services/api';
import { IApiService, IJwtService, IProductService } from './types';
import { JwtService } from './services';
import { ProductService } from './interfaces/services';

const container = new Container();
container.bind<IApiService>(SERVICE_IDENTIFIER.API).to(ApiService);
container.bind<IJwtService>(SERVICE_IDENTIFIER.JWT).to(JwtService);
container.bind<IProductService>(SERVICE_IDENTIFIER.PRODUCT_SERVICE).to(ProductService);

export { container };
