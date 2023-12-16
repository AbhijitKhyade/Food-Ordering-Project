const mongoose = require('mongoose');
const {Schema} = mongoose;

// Define the schema for the collection
const foodItemsSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    CategoryName: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    options: [{
      size: {
        type: String,
        required: true
      }
    }],
    description: {
      type: String
    }
  });

  const foodCategorySchema = new mongoose.Schema({
    CategoryName: {
      type: String,
      required: true
    }
  });

  module.exports = mongoose.model('food_items', foodItemsSchema);
  module.exports = mongoose.model('food_categories', foodCategorySchema);
