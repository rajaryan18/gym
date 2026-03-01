export abstract class LoggerStrategy {
    abstract info(message: string, meta?: any): void;
    abstract warn(message: string, meta?: any): void;
    abstract error(message: string, error?: any): void;
    abstract debug(message: string, meta?: any): void;
}
