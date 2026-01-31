export class Project {
    constructor(
        public id?: string,
        public name: string = '',
        public description?: string,
        public teamId: string = '',
        public owner?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}
}