export class User {
    constructor(
        public id?: string,
        public name: string = '',
        public email: string = '',
        public password?: string,
        public createdAt?: Date
    ) {}
}

export interface AuthResponse {
    token: string;
    user: User;
}