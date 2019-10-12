const request = require("request");

forecast = (longi, lati, callback) => {
    url = "https://api.darksky.net/forecast/a5f9be60e5b87645c879b7e1a695ffcb/" + longi + "," + lati;
    request({url, json: true}, (e, r) =>{
        if(e){
            callback("can't connect to weather service");
        }
        else if(r.body.error) {
            callback("error you have have made some kind of typo");
        }
        else {
            callback(undefined, r.body.daily.data[0].summary + "also there is " + r.body.currently.temperature  + " °F");
        }
    })
}

module.exports = forecast;