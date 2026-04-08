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
        const discountFactor = 1 - (this.discountPercent / 100);
        const finalAmount = amount * discountFactor;
        console.log(`Скидка на товар на черную пятницу: ${this.discountPercent}%`);
        return finalAmount;
    }
}
class VipClientDiscount {
    discountPercent = 20;
    applyDiscount(amount) {
        const discountFactor = 1 - (this.discountPercent / 100);
        const finalAmount = amount * discountFactor;
        console.log(`Скидка на товар как VIP-клиенту: ${this.discountPercent}%`);
        return finalAmount;
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
        return this._strategy.applyDiscount(sale);
    }
}
const myCart = new Cart(new VipClientDiscount());
console.log(myCart.discount(20));
myCart.setStrategy(new BlackFridayDiscount());
console.log(myCart.discount(100));
