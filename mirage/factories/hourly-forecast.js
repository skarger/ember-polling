import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
    id(i) {
        return i;
    },

    createdAt() {
        return new Date;
    },

    startingAt(i) {
        const oneHour = 3600000;
        let now = Date.now();
        return new Date(now.valueOf() + (i * oneHour));
    },

    endingAt() {
        const oneHour = 3600000;
        return new Date(this.startingAt.valueOf() + oneHour);
    },

    temperature(i) {
        return `${65 + i}°F`;
    },

    status() {
        return 'sunny';
    },

    city() {
        return faker.address.city();
    },
});
