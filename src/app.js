const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express();

//express settings
app.set("view engine","hbs");
app.set("views", path.join(__dirname, "../templates/views"));

app.use(express.static(path.join(__dirname, "../public")));

//hbs settings
hbs.registerPartials(path.join(__dirname, "../templates/partials"));


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather"
    });
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help"
    });
})

app.get("/about", (req, res) => {
    res.render("about",{
        title: "About"
    });
})

app.get("/weather", (req, res) => {
    if (!req.query.address){
        return res.send({
            response: "you must provide address for me to work properly"
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(longitude, latitude, (erroforecast, dataforecast) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: dataforecast,
                location: location
            });
        })
    })
//
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        error: "couldn't find such help article"
    });
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        error: "this site does not exist, probably ^^"
    });
})

app.listen(3000, () => {
    console.log("server started")
})