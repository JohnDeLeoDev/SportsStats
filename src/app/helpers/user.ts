export default class User {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public hashedPassword: string,
        public salt: string
    ) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.hashedPassword = hashedPassword
        this.salt = salt
    }
}
