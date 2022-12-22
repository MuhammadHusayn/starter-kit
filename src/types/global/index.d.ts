export {};

declare global {
    type KeyValueObjectType = { [key: string]: any };
    type ClassType = new () => any;
}
