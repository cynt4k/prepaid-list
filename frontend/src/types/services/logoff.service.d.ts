export interface ILogoffService {
    getMaxTimeLeftInSeconds(): number;
    getCurrTimeLeftInSeconds(): number;
    refreshToken(): void;
}
