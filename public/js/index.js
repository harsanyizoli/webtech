var cars = {};
var login = document.getElementById("login");
var main = document.getElementById("main");

var car_listings = document.createElement("div");
car_listings.className = "listings";

var manuf_listings = document.createElement("div");
manuf_listings.className = "manuf_list";

var target = "";

function check_login(){
    //
    let logged_in = get_cookie("user") != "" ? true : false;
    if (logged_in) {
        console.log("logged in");
        return true;
    } else {
        console.log("logged out");
        return false;
    }
}
function get_cookie(str){
    let name = str + "=";
    let d = decodeURIComponent(document.cookie).split(";");
    for(var i = 0; i <d.length; i++) {
        var c = d[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
}

function delete_cookie(str){
    document.cookie = str + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
}
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
    if(check_login()){
        $("#login-button").html("Profile");
    } else {
        $("#login-button").html("Sign up/Login");
    }
})()

$("#logo").click(() => {
    target = "landing";
    clear_search();
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

function parse_json() {Profile
    
}

function cp() {
    return document.createElement("p");
}

$("#list_cars").click(() => {
    target = "cars"
    clear_search();
    main.appendChild(car_listings);
});

$("#list_manuf").click(() => {
    target = "manufs";
    clear_search();
    main.appendChild(manuf_listings);
});


$("#search_bar").on("input", function() {
    console.log($(this).val());
    reset_classes();
    search(target, $(this).val());
});

function clear_search(){
    $("#search_bar").val("");
    main.innerHTML = "";
    reset_classes();
}

function search(t, str) {
    switch (t) {
        case "cars":
            for(a of car_listings.childNodes){
                if(!a.childNodes[0].textContent.toLowerCase().includes(str.toLowerCase())){
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

$("#close").click(() => {
    $("#login").hide();
});

$("#login_submit").click(() => {
    let login_user = $("#login_user").val();
    let login_pwd = $("#login_pwd").val();


    console.log("Username: ", login_user, " Password: ", login_pwd);
    if(login_user == "" || login_pwd == ""){
        show_error("Login failed");
    } else {
        //log in
        console.log("logging in..");
        document.cookie = "user=" + login_user;
        location.reload();
    }
});

function show_error(error_msg) {
    let perror = $("#alert");
    console.log(error_msg);
    if(error_msg == undefined){
        perror.html("Something went wrong!");
    } else {
        perror.html(error_msg);
    }
    perror.fadeIn();
    setTimeout(() => {
        perror.fadeOut();
    }, 3000);
}

var login_btn = document.getElementById("login-button");
login_btn.addEventListener("click", () => {
    if(check_login()){
        $("#profile").toggle();
    } else {
        $("#login").toggle();
    }
});

//$("#logout_btn").unbind('click').bind("click", () => {
//});


var logout_button = document.getElementById("logout_btn");

logout_button.addEventListener("click", () => {
    logout();
});

function logout() {
    console.log("logging out..");
    delete_cookie("user");
    location.reload();
}

function get_cars(man) {
    document.cookies = "name=" + man;
    console.log(document.cookies);
    $.get("/manufacturer", data => {
        console.log(data);
    });
    //delete_cookie('name');
}