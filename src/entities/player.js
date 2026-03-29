export default class Player {
    name;
    avatar;

    constructor({ name, avatar }) {
        this.name = name;
        this.avatar = avatar
    }

    get info() {
        return {
            name: this.name,
            avatar: this.avatar
        }
    }
}

