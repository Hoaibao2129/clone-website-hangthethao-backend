export class ResponseData {
    data: any;
    isSuccess: boolean;
    message: string;

    constructor(data: any = null, isSuccess: boolean = false, message: string = '') {
        this.data = data;
        this.isSuccess = isSuccess;
        this.message = message;
    }


    static error(message: string): ResponseData {
        return new ResponseData(null, false, message);
    }

    static success(data: any, message: string): ResponseData {
        return new ResponseData(data, true, message);
    }
}