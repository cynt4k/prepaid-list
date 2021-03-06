import { Container } from 'inversify';
import 'reflect-metadata';
import { SERVICE_IDENTIFIER } from './models/Identifiers';
import { IApiService, IJwtService, IProductService, IUserService, IProfileService } from './types';
import { ProductService, ApiService, JwtService, UserService, OrderService } from '@/services';
import { ProfileService } from './services/profile';
import { IOrderService } from './types/services/order.service';
// import { ILogoffService } from './types/services/logoff.service';
import { LogoffService } from './services/logoff';
import { IErrorHandlingService } from './types/services/errorHandling.service';
import { ErrorHandlingService } from './services/errorHandling';

const container = new Container();
container.bind<IApiService>(SERVICE_IDENTIFIER.API).to(ApiService);
container.bind<IJwtService>(SERVICE_IDENTIFIER.JWT).to(JwtService);
// container.bind<ILogoffService>(SERVICE_IDENTIFIER.LOGOFF_SERVICE).to(LogoffService);
container.bind<IProductService>(SERVICE_IDENTIFIER.PRODUCT_SERVICE).to(ProductService);
container.bind<IUserService>(SERVICE_IDENTIFIER.USER_SERVICE).to(UserService);
container.bind<IProfileService>(SERVICE_IDENTIFIER.PROFILE_SERVICE).to(ProfileService);
container.bind<IOrderService>(SERVICE_IDENTIFIER.ORDER_SERVICE).to(OrderService);
container.bind<IErrorHandlingService>(SERVICE_IDENTIFIER.ERRORHANDLING_SERVICE).to(ErrorHandlingService);

export { container };
