var cars = {};
var login = document.getElementById("login");
var main = document.getElementById("main");

var car_listings = document.createElement("div");
car_listings.className = "listings";

var manuf_listings = document.createElement("div");
manuf_listings.className = "manuf_list";

var target = "";

(function() {
    $.ajax("/cars")
        .done( data => {
            for(car of data){
                //console.log(car);
                add_car_listing(car);
            }
        });
    $.ajax("/manufacturers")
        .done( data => {
            add_manuf_listing(data);
        })
})()

$("#login-button").click(function(){
    login.toggle();
});
$("#logo").click(() => {
    target = "landing";
   clear();
});


function add_car_listing(car) {
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
    car_listings.appendChild(card);
}

function add_manuf_listing(manufs) {
    //console.log(manufs);
    var list = document.createElement("ul");
    for(m of manufs){
        var li = document.createElement("li");
        li.textContent = m.name + " " + m.country + " " + m.founded;
        list.appendChild(li);
    }
    manuf_listings.appendChild(list);
}

function parse_json() {
    
}

function cp() {
    return document.createElement("p");
}

$("#list_cars").click(() => {
    target = "cars"
    clear();
    main.appendChild(car_listings);
});

$("#list_manuf").click(() => {
    target = "manufs";
    clear();
    main.appendChild(manuf_listings);
});


$("#search_bar").on("input", function() {
    console.log($(this).val());
    reset_classes();
    search(target, $(this).val());
});

function clear(){
    $("#search_bar").val("");
    main.innerHTML = "";
}

function search(t, str) {
    switch (t) {
        case "cars":
            for(a of car_listings.childNodes){
                if(!a.childNodes[0].textContent.toLowerCase().includes(str)){
                    console.log(a.childNodes[0].textContent);
                    a.className += " hidden";
                }
            }
        default:
            break;
    }
    console.log("\n");
}

function reset_classes() {

    for(a of car_listings.childNodes){
        a.className = "listing-card";
    }
    //manufs
}