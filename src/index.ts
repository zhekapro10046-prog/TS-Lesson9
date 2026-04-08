// interface IRouteStrategy {
//     buildRoute(start: string, end: string): void;

// }

// class DrivingStrategy implements IRouteStrategy {
//     buildRoute(start: string, end: string): void {
//         console.log(` Авто маршрут от ${start} до ${end}`); 
//     }
// }

// class WalkingStrategy implements IRouteStrategy {
//     buildRoute(start: string, end: string): void {
//         console.log(` Пешеходный маршрут от ${start} до ${end}`); 
//     }
// }

// class NavigatorApp {
//     constructor (private _strategy: IRouteStrategy) {}

//     public setStrategy(strategy: IRouteStrategy) {
//         this._strategy = strategy;
//     }

//     public route(start: string, end: string) {
//         this._strategy.buildRoute(start, end);
//     }
// }

// const myNavigator = new NavigatorApp(new DrivingStrategy());

// myNavigator.route ('Дом', 'Офис');

// myNavigator.setStrategy(new WalkingStrategy());

// myNavigator.route ('Дом', 'Кафе');














interface ISubscriber {
    update(eventName: string, data: any): void;
}

interface IPublisher {
    subscribe(observer: ISubscriber): void;
    unsubscribe(observer: ISubscriber): void;
    notify(eventName: string, data: any): void;

}

class UserAuthService implements IPublisher {
    private _subscribers: ISubscriber[] = [];

    public subscribe(observer: ISubscriber): void {
        this._subscribers.push(observer);
    }

    public unsubscribe(observer: ISubscriber): void {
        this._subscribers = this._subscribers.filter((sub) => sub !== observer);
    }

    public notify(eventName: string, data: any): void {
        for (const sub of this._subscribers) {
            sub.update(eventName, data);
        }
    }

    public registerUser(username: string) {
        console.log(`Регистрирую пользователя: ${username}`);

        // сохранение в бд
        
        this.notify('USER_REGISTERED', {username});
    }

}


class EmailService implements ISubscriber {
    update(eventName: string, data: any): void {
        if (eventName === 'USER_REGISTERED'){ 
            console.log (`Отправляю письмо для: ${data.username}`);
        }
    }
}

class BonusService implements ISubscriber {
    update(eventName: string, data: any): void {
        if (eventName === 'USER_REGISTERED'){ 
            console.log (`Начисляю бонусы для: ${data.username}`);
        }
    }
}


class LoggerService implements ISubscriber {
    update(eventName: string, data: any): void {
        if (eventName === 'USER_REGISTERED'){ 
            console.log (`Событие ${eventName} с данным:`, data);
        }
    }
}

const authService = new UserAuthService();

const emailService = new EmailService();
const bonusService = new BonusService();
const logger = new LoggerService();


for (const service of [emailService, bonusService, logger]) {
    authService.subscribe(service)
}


authService.registerUser ('Alexa');

import { EventEmitter } from "events";

const eventBus = new EventEmitter();

eventBus.on('NEW_ORDER', (orderData) => {
    console.log('Получен новый заказ!', orderData);
});


eventBus.emit("NEW_ORDER", {id: 1, amount: 500}); 