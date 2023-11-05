//1. Write a summary with TypeScript code examples of the Singleton pattern.

//Implementation 1
class Singleton1 {
    private static instance: Singleton1;

    private constructor() { }

    public static getInstance(): Singleton1 {
        return this.instance || (this.instance = new Singleton1());
    }
}
const instance11 = Singleton1.getInstance();
const instance12 = Singleton1.getInstance();

console.log(`Are they same objects for example 1: ${instance11 === instance12}`);


//Implementation 2
class Singleton2 {
    static readonly instance: Singleton2 = new Singleton2();
}

const instance21 = Singleton2.instance;
const instance22 = Singleton2.instance;

console.log(`Are they same objects for example 2: ${instance21 === instance22}`);