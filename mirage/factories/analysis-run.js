import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
    id(i) {
        return i;
    },

    createdAt() {
        return new Date;
    },

    status() {
        return 'finalized';
    },    
});
