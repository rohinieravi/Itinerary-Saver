const mongoose = require('mongoose');

const itinerarySchema = mongoose.Schema({
  destination: {type: String, required: true},
  poster: {
    id: Number,
    firstName: String,
    lastName: String
  },
  days: {type: Number, required: true},
  pois: {type: String, required: true},
  transportDetails: String,
  lodgeDetails: String,
  dayWisePlan: String,
  budget: Number,
  travelPartner: String,
  tpDetails: String,
  postedDate: {type: Date, default: Date.now}
});


itinerarySchema.virtual('posterName').get(function() {
  return `${this.poster.firstName} ${this.poster.lastName}`.trim();
});

itinerarySchema.methods.apiRepr = function() {
  return {
    id: this._id,
    destination: this.destination,
    poster: this.posterName,
    posterId: this.poster.id,
    days: this.days,
    pois: this.pois,
    transportDetails: this.transportDetails,
    lodgeDetails: this.lodgeDetails,
    dayWisePlan: this.dayWisePlan,
    budget: this.budget,
    travelPartner: this.travelPartner,
    tpDetails: this.tpDetails,
    postedDate: this.postedDate
  };
}

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = {Itinerary};
