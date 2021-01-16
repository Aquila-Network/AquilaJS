import axios, { AxiosInstance } from 'axios';

export class Request {
    private aquilaApi: AxiosInstance;

    constructor(url: string, port: number) {
        this.aquilaApi = axios.create({baseURL: `${url}:${port}`});
    }
    public async checkConnection(): Promise<void> {
        try {
            await this.aquilaApi.get('/');
        }catch(e) {
            throw new Error('Connection failed');
        }
    }

    public async get<T, K>(endPoint: string, params: K): Promise<T> {
        let response;
        if(params){
            response = await this.aquilaApi.get(endPoint, {data: params});
        }else {
            response = await this.aquilaApi.get(endPoint);
        }
        const responseData = response.data as Promise<T>;
        return responseData;
    }

    public async post<T, K>(endPoint: string, data: K): Promise<T> {
        const response = await this.aquilaApi.post(endPoint, data);
        const responseData = response.data as Promise<T>;
        return responseData;
    }
}