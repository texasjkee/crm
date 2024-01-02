export interface User {
    id: number | null;
    accessToken: string;
    email: string;
}

export interface UserSchema {
    authData?: User;
    error: string;
    isSignUp: boolean;
}
