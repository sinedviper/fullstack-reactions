export interface User {
    username: string;
    displayName: string;
    toke: string;
    image?: string;
}

export interface  UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}