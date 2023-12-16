//DISPLAY DATA
const displayDataControllers = async (req, res) => {
    try {
        res.send([global.food_items, global.food_category]);
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
}

module.exports = { displayDataControllers };