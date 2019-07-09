export interface ILogoffService {
	performAutoLogoff(): void;
	getMaxTimeLeftInSeconds(): number;
	getCurrTimeLeftInSeconds(): number;
}
