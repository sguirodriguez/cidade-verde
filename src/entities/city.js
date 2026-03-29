export default class City {
    name;
    balance;
    incomeRate;

    constructor({ name, balance, income }) {
        this.name = name;
        this.balance = balance;
        this.incomeRate = income;
    }

    get name() {
        return this.name;
    }

    balance() {
        return this.balance
    }

    setBalance(value) {
        this.balance = value
    }

    income() {
        return this.incomeRate
    }

    setIncome(value) {
        this.incomeRate = value
    }
}

