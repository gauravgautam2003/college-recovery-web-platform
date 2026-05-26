export interface AuthCredentials {
    email: string;
    password: string;
    name?: string;
}

export interface UserSession {
    id: string;
    name?: string;
    email: string;
    token: string;
}
