export interface AuthCredentials {
    email: string;
    password: string;
}

export interface UserSession {
    id: string;
    email: string;
    token: string;
}
