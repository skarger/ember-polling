import DS from 'ember-data';

export default DS.Model.extend({
    city: DS.attr('string'),
    temperature: DS.attr('string'),
    status: DS.attr('string'),
    startingAt:  DS.attr('date'),
    endingAt:  DS.attr('date'),
});
