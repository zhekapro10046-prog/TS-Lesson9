"use strict";
// interface IRouteStrategy {
//     buildRoute(start: string, end: string): void;
Object.defineProperty(exports, "__esModule", { value: true });
class UserAuthService {
    _subscribers = [];
    subscribe(observer) {
        this._subscribers.push(observer);
    }
    unsubscribe(observer) {
        this._subscribers = this._subscribers.filter((sub) => sub !== observer);
    }
    notify(eventName, data) {
        for (const sub of this._subscribers) {
            sub.update(eventName, data);
        }
    }
    registerUser(username) {
        console.log(`Регистрирую пользователя: ${username}`);
        // сохранение в бд
        this.notify('USER_REGISTERED', { username });
    }
}
class EmailService {
    update(eventName, data) {
        if (eventName === 'USER_REGISTERED') {
            console.log(`Отправляю письмо для: ${data.username}`);
        }
    }
}
class BonusService {
    update(eventName, data) {
        if (eventName === 'USER_REGISTERED') {
            console.log(`Начисляю бонусы для: ${data.username}`);
        }
    }
}
class LoggerService {
    update(eventName, data) {
        if (eventName === 'USER_REGISTERED') {
            console.log(`Событие ${eventName} с данным:`, data);
        }
    }
}
const authService = new UserAuthService();
const emailService = new EmailService();
const bonusService = new BonusService();
const logger = new LoggerService();
for (const service of [emailService, bonusService, logger]) {
    authService.subscribe(service);
}
authService.registerUser('Alexa');
const events_1 = require("events");
const eventBus = new events_1.EventEmitter();
eventBus.on('NEW_ORDER', (orderData) => {
    console.log('Получен новый заказ!', orderData);
});
eventBus.emit("NEW_ORDER", { id: 1, amount: 500 });
