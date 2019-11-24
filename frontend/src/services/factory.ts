import { IApiService, IUserService, IJwtService, IProfileService, IProductService } from '@/types';
import { ApiService, UserService, JwtService, ProductService, OrderService } from '.';
import { ProfileService } from './profile';
import { IOrderService } from '@/types/services/order.service';
import { IErrorHandlingService } from '@/types/services/errorHandling.service';
import { ErrorHandlingService } from './errorHandling';

export default class Factory {
    private static instance: Factory | null = null;
    private apiService: IApiService | null = null;
    private userService: IUserService | null = null;
    private jwtService: IJwtService | null = null;
    private profileService: IProfileService | null = null;
    private productService: IProductService | null = null;
    private orderService: IOrderService | null = null;
    private errorHandlingService: IErrorHandlingService | null = null;
    // eslint-disable-next-line no-useless-constructor
    private constructor() { }

    public static getInstance(): Factory {
      if (!this.instance) {
        this.instance = new Factory();
      }
      return this.instance;
    }

    get ApiService(): IApiService {
      if (!this.apiService) {
        this.apiService = new ApiService();
      }
      return this.apiService;
    }

    get UserService(): IUserService {
      if (!this.userService) {
        this.userService = new UserService();
      }
      return this.userService;
    }

    get JwtService(): IJwtService {
      if (!this.jwtService) {
        this.jwtService = new JwtService();
      }
      return this.jwtService;
    }

    get ProfileService(): IProfileService {
      if (!this.profileService) {
        this.profileService = new ProfileService();
      }
      return this.profileService;
    }

    get ProductService(): IProductService {
      if (!this.productService) {
        this.productService = new ProductService();
      }
      return this.productService;
    }

    get OrderService(): IOrderService {
      if (!this.orderService) {
        this.orderService = new OrderService();
      }
      return this.orderService;
    }

    get ErrorHandlingService(): IErrorHandlingService {
      if (!this.errorHandlingService) {
        this.errorHandlingService = new ErrorHandlingService();
      }
      return this.errorHandlingService;
    }
}
