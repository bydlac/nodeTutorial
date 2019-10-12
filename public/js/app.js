console.log("clienside javascript loaded");

const weatherForm = document.querySelector("form")
const searchData = document.querySelector("input")
let messageOne = document.querySelector("#message-1")
let messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = searchData.value;
    messageOne.textContent = "loading...";
    messageTwo.textContent = "";


    fetch("http://localhost:3000/weather?address=" + data).then((response) => {
    response.json().then((data) => {
        if (data.error){
            messageOne.textContent = data.error;
            messageTwo.textContent = "";
        }
        else{
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
})
    
})