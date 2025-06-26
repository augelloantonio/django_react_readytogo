export class UserDataModel {
    public id: number | null;
    public username: string;
    public email: string;

    constructor() {
        this.id = 0;
        this.username = "";
        this.email = "";
    }
}