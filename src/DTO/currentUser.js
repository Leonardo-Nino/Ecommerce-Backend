export default class currentUser {
    constructor(user) {
        this.id = user._id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.age = user.age;
        this.role = user.role
        this.cart = user.cart;
        this.last_connections = user.last_connections
    }
}