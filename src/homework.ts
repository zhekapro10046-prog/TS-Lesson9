// 1st task
interface IDiscountStrategy {
    applyDiscount(amount: number): number;
}

class NoDiscount implements IDiscountStrategy {
    applyDiscount(amount: number): number {
        console.log (`Товар без скидки`);
        return amount;
    }
}

class BlackFridayDiscount implements IDiscountStrategy {
    private discountPercent = 50;

        applyDiscount(amount: number): number {

        const discountFactor = 1 - (this.discountPercent / 100);
        const finalAmount = amount * discountFactor;

        console.log (`Скидка на товар на черную пятницу: ${this.discountPercent}%`);
        return finalAmount;
    }
}

class VipClientDiscount implements IDiscountStrategy {
    private discountPercent = 20;

        applyDiscount(amount: number): number {
            
        const discountFactor = 1 - (this.discountPercent / 100);
        const finalAmount = amount * discountFactor;

        console.log (`Скидка на товар как VIP-клиенту: ${this.discountPercent}%`);
        return finalAmount;
    }
   
}

class Cart {
    constructor (private _strategy: IDiscountStrategy) {}

    public setStrategy(strategy: IDiscountStrategy) {
        this._strategy = strategy;
    }

    public discount(sale: number):number {
        return this._strategy.applyDiscount(sale);
        
    }
}

const myCart = new Cart (new VipClientDiscount());

console.log (myCart.discount(20));

myCart.setStrategy (new BlackFridayDiscount());

console.log (myCart.discount(100));





