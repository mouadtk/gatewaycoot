import { BaseEntity } from './../../shared';

export class Parent implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
    ) {
    }
}
