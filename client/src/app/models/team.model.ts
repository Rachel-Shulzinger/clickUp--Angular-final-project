import e from "express";

export class Team {
    constructor(
        public id?: string,
        public name: string = '',
        public memberCount?: number,
        public members?: string[],
        public description?: string,
        public createdAt?: Date,
    ) {}
}


