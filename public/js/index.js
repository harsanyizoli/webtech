(function(){
    console.log("sdfghjksdfghjksdfghjk");
})()

var cars = {};
var login = document.getElementById("login");

$(document).ready(function(){  
    (function() {
        var aj = $.ajax("/cars")
        .done( (data) => {
            for(car of data){
                //console.log(car);
                add_listing(car);
            }
        })
    })()
    $("#login-button").click(function(){
        $("#login").toggle();
    });
});

var listings = document.getElementById("listings");

function add_listing(car) {
    var card = document.createElement("div");
    card.className += "listing-card";
    var title = document.createElement("h3");
    title.className += "mid";
    title.textContent = car.manufacturer + " ";
    title.textContent +=  car.name;
    var img = document.createElement("img");
    img.src = "images/placeholder.png";
    var color = cp();
    color.textContent = "Color: ";
    color.textContent += car.color;
    var y = cp();
    y.textContent = "Year: "
    y.textContent += car.year;
    var avail = cp();
    avail.textContent = "Available: ";
    avail.textContent += car.available;
    var cons = cp();
    cons.textContent = "Consumption: "
    cons.textContent += car.consumption;
    var hp = cp();
    hp.textContent = "Horsepower: "
    hp.textContent += car.horsepower;
    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(color);
    card.appendChild(y);
    card.appendChild(avail);
    card.appendChild(cons);
    card.appendChild(hp);
    listings.appendChild(card);
}

function parse_json() {
    
}

function cp() {
    return document.createElement("p");
}
