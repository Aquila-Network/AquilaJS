type AdditionalData<T> = {
    [key: string]: AdditionalData<T>;
} | string | number | string[] | number[] | T;

export interface Document<T> {
    metadata: T;
    code: number[];
    [key:string]: AdditionalData<T>;
} 