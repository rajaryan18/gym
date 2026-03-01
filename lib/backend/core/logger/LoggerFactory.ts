import { LoggerStrategy } from "./LoggerStrategy";
import { ConsoleLoggerStrategy } from "./ConsoleLoggerStrategy";

export class LoggerFactory {
    private static instance: LoggerStrategy;

    static getLogger(): LoggerStrategy {
        if (!this.instance) {
            // For now, default to ConsoleLogger. 
            // In the future, this could be configured via environment variables.
            const type = process.env.LOGGER_TYPE || "console";

            switch (type) {
                case "console":
                default:
                    this.instance = new ConsoleLoggerStrategy();
                    break;
            }
        }
        return this.instance;
    }
}
