
declare interface RequestParam {
    hostname: string,
    port: string,
    stubHostname: string,
    stubPort: string
}
declare abstract class REQUEST {
    constructor(param: RequestParam, protocol: string) 
    get(url: string, raw?: boolean): Promise<any>
    getStub(url: string): Promise<any>
    post(url: string, content: any, options?: any, raw?: boolean): Promise<any>
    postStub(url: string, content: any): Promise<any>
    setParam(key: string, value: any): void
}