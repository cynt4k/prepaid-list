
export interface IJwtService {
    getToken(): string;
    getRefreshToken(): string;
    saveToken(token: string): void;
    saveRefreshToken(refreshToken: string): void;
    destoryToken(): void;
    destoryRefreshToken(): void;
}