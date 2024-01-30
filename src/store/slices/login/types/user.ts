export interface User {
    name: string;
    token: string;
    email: string;
}

export interface UserSchema {
    authData?: User;
    error: string | undefined;
}
