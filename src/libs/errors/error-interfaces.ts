export interface SerializedErrors {
    field?: string;
    message?: string;
    source?: string;
}

export abstract class CustomError extends Error {
    abstract code: number;
    abstract serialize(): SerializedErrors[];
    protected constructor(message: string) {
        super(message);

        // Only because we are extending a build-in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
