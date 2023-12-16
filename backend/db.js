const mongoose = require('mongoose');

const URL = process.env.MONGO_URL;
const mongoDB = () => {
  mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    //Connection of database
    console.log("Database connected");

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

    const FoodItems = mongoose.model('food_items', foodItemsSchema);
    const FoodCategory = mongoose.model('food_categories', foodCategorySchema);

    //Fetch data from the 'food_items' collection
    FoodItems.find({})
      .then(data => {
        // Fetch data from the 'food_category' collection using .find() or other methods
        FoodCategory.find({})
          .then(categoryData => {
            global.food_items = data;
            global.food_category = categoryData;

          })
          .catch(err => {
            console.error(err);
          })
      })
      .catch(err => {
        console.error(err);
      });
  })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err);
    });
}

module.exports = mongoDB;
