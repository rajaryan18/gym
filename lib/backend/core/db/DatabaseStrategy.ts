export abstract class DatabaseStrategy {
    abstract connect(): Promise<void>;
    abstract disconnect(): Promise<void>;
}
