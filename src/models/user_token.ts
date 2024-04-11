export class UserToken{
    constructor(
        public name:string,
        public username:string,
        public type:string,
        public bearer_token:string,
    ){

    }
}