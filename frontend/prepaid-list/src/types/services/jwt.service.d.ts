
export interface IJwtService {
    getToken(): string;
    getRefreshToken(): string;
    getUsername(): string;
    saveToken(token: string): void;
    saveRefreshToken(refreshToken: string): void;
    saveUsername(username: string): void;
    destoryToken(): void;
    destoryRefreshToken(): void;
}