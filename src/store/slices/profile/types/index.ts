export interface ProfileSchema {
    profileData?: ProfileUser;
    email?: string;
    error?: string;
    isLoading: boolean;
}

export interface ProfileUser {
    name: string;
    surname: string;
    role?: string;
}
