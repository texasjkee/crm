export interface User {
    id: string | null;
    accessToken: string;
    email: string;
}

export interface UserSchema {
    authData?: User;
    error: string;
}
