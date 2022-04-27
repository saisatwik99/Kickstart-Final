const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  imageSrc: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content1: {
    type: String,
    required: true
  },
  content2: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  reviews: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

companySchema.index({title: 1});

module.exports = mongoose.model('Company', companySchema);