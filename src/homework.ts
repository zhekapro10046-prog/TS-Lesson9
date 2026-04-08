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

        const discountAmount = amount * (1 *this.discountPercent / 100);

        console.log (`Скидка на товар на черную пятницу: ${this.discountPercent}%`);
        return discountAmount;
    }
}

class VipClientDiscount implements IDiscountStrategy {
    private discountPercent = 20;

        applyDiscount(amount: number): number {
            
        const discountAmount = amount * (1 *this.discountPercent / 100);

        console.log (`Скидка на товар как VIP-клиенту: ${this.discountPercent}%`);
        return discountAmount;
    }
   
}

class Cart {
    constructor (private _strategy: IDiscountStrategy) {}

    public setStrategy(strategy: IDiscountStrategy) {
        this._strategy = strategy;
    }

    public discount(sale: number) {
        this._strategy.applyDiscount(sale);
        return;
    }
}

const myCart = new Cart (new VipClientDiscount);

myCart.discount(22222222);

myCart.setStrategy (new BlackFridayDiscount);

myCart.discount(22222222222);