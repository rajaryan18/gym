import mongoose from "mongoose";
import { DatabaseStrategy } from "./DatabaseStrategy";
import { LoggerFactory } from "../logger/LoggerFactory";

const logger = LoggerFactory.getLogger();

export class MongoDBStrategy extends DatabaseStrategy {
    private uri: string;
    private isConnected: boolean = false;

    constructor() {
        super();

        const user = process.env.MONGODB_USER;
        const pass = process.env.MONGODB_PASSWORD;
        const uri = process.env.MONGODB_URI;

        if (user && pass) {
            this.uri = `mongodb+srv://${user}:${pass}@cluster0.qwsgf0v.mongodb.net/?appName=Cluster0`;
            return;
        }

        // Fallback for local development or straight URI
        this.uri = uri || "mongodb://127.0.0.1:27017/gym-tracker";
    }

    private connectionPromise: Promise<void> | null = null;

    async connect(): Promise<void> {
        if (this.isConnected) {
            return;
        }

        if (this.connectionPromise) {
            return this.connectionPromise;
        }

        this.connectionPromise = (async () => {
            try {
                await mongoose.connect(this.uri);
                this.isConnected = true;
                logger.info("Successfully connected to MongoDB.");
            } catch (error) {
                logger.error("Error connecting to MongoDB", error);
                this.connectionPromise = null; // Allow retry on next call
                throw error;
            } finally {
                this.connectionPromise = null;
            }
        })();

        return this.connectionPromise;
    }

    async disconnect(): Promise<void> {
        if (!this.isConnected) {
            return;
        }

        try {
            await mongoose.disconnect();
            this.isConnected = false;
            logger.info("Successfully disconnected from MongoDB.");
        } catch (error) {
            logger.error("Error disconnecting from MongoDB", error);
            throw error;
        }
    }
}
