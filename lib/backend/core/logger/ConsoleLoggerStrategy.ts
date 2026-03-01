import { LoggerStrategy } from "./LoggerStrategy";

export class ConsoleLoggerStrategy extends LoggerStrategy {
    info(message: string, meta?: any): void {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta ? meta : "");
    }

    warn(message: string, meta?: any): void {
        console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta ? meta : "");
    }

    error(message: string, error?: any): void {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error ? error : "");
    }

    debug(message: string, meta?: any): void {
        console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, meta ? meta : "");
    }
}
