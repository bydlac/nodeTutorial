const request = require("request");

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiZ3J6bW9ydCIsImEiOiJjazFpNXBua2kwazhvM3BqeXV0bHgwdDFqIn0.B4Y92EutCIMHi1ABkPA5fg&limit=1";
    
    request({url, json: true}, (e, r) => {
        if (e){
            callback("error can't connect");
        }
        else if (r.body.features.length === 0){
            callback("error can't find the location");
        }
        else {
            callback(undefined, {
                latitude: r.body.features[0].center[1],
                longitude: r.body.features[0].center[0],
                location: r.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;