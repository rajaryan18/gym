import { DatabaseStrategy } from "./DatabaseStrategy";
import { MongoDBStrategy } from "./MongoDBStrategy";
import { LoggerFactory } from "../logger/LoggerFactory";

const logger = LoggerFactory.getLogger();

export class DatabaseFactory {
    private static instance: DatabaseStrategy;

    static getDatabase(): DatabaseStrategy {
        if (!this.instance) {
            // Future-proofing: allowing different DB types based on ENV
            const dbType = process.env.DB_TYPE || "mongodb";

            switch (dbType) {
                case "mongodb":
                default:
                    logger.info("Initializing MongoDB Strategy through Factory.");
                    this.instance = new MongoDBStrategy();
                    break;
            }
        }
        return this.instance;
    }
}
