const mongoose  = require('mongoose');
require('./models/db');
const Places = mongoose.model('Places');

const samplePlaces = [
  
];




module.exports.insert = async () => {
    const places = await Places.remove({});
    const $place = new Places();
    $place.place = samplePlaces;
    await $place.save()
    console.log('SEEDED DATABASE WITH SAMPLE PLACES')
}