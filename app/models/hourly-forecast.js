import DS from 'ember-data';

export default DS.Model.extend({
    city: DS.attr('string'),
    temperature: DS.attr('string'),
    description: DS.attr('string'),
    createdAt:  DS.attr('date'),
    startingAt:  DS.attr('date'),
    endingAt:  DS.attr('date'),
});
