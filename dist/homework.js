"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoDiscount {
    applyDiscount(amount) {
        console.log(`Товар без скидки`);
        return amount;
    }
}
class BlackFridayDiscount {
    discountPercent = 50;
    applyDiscount(amount) {
        const discountAmount = amount * (1 * this.discountPercent / 100);
        console.log(`Скидка на товар на черную пятницу: ${this.discountPercent}%`);
        return discountAmount;
    }
}
class VipClientDiscount {
    discountPercent = 20;
    applyDiscount(amount) {
        const discountAmount = amount * (1 * this.discountPercent / 100);
        console.log(`Скидка на товар как VIP-клиенту: ${this.discountPercent}%`);
        return discountAmount;
    }
}
class Cart {
    _strategy;
    constructor(_strategy) {
        this._strategy = _strategy;
    }
    setStrategy(strategy) {
        this._strategy = strategy;
    }
    discount(sale) {
        this._strategy.applyDiscount(sale);
        return;
    }
}
const myCart = new Cart(new VipClientDiscount);
myCart.discount(22222222);
myCart.setStrategy(new BlackFridayDiscount);
myCart.discount(22222222222);
