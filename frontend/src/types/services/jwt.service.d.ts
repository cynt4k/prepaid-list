export interface IJwtService {
    getToken(): string;
    getRefreshToken(): string;
    saveToken(token: string): void;
    saveRefreshToken(refreshToken: string): void;
    destroyToken(): void;
    destroyRefreshToken(): void;
    decodeToken(token: string | undefined): any;
}
