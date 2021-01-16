export interface Schema {
    description: string;
    unique: string;
    encoder: string;
    codelen: number;
    metadata: {
        [k: string]: string
    }
}