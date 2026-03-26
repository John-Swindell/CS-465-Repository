var fs = require('fs')
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/* Get travel view */
const travel = (req, res) => {
    res.render('travel', {title: 'Travlr Getaways', trips});
};

// New GET for the trips endpoint -- accidentally added from module 5
/*
const tripsEndpoint = "http://localhost:3000/api/trips";
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    }
}
*/

module.exports = {
    travel
};
