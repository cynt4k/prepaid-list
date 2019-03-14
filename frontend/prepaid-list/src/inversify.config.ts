import { Container } from 'inversify';
import 'reflect-metadata';
import { SERVICE_IDENTIFIER } from './models/Identifiers';
import { ApiService } from './services/api';
import { IApiService } from './types';

const container = new Container();
container.bind<IApiService>(SERVICE_IDENTIFIER.API).to(ApiService);

export { container };
