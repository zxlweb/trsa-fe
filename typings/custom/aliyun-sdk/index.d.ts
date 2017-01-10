// Type definitions for aliyun-sdk v1.9.1
// by Max

declare namespace ALY {
    interface callback {
        (err: any, data: any): void
    }
    class OSS {
        constructor(options: any);
        putObject(options: any, callback: callback): void
        deleteObject(options: any, callback: callback): void
    }
}

declare module "aliyun-sdk" {
    export = ALY;
}
