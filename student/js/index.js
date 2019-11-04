var cars = {};
var login = document.getElementById("login");
var main = document.getElementById("main");

var car_listings = document.createElement("div");
car_listings.className = "listings";

var manuf_listings = document.createElement("div");
manuf_listings.className = "manuf_list";

var target = "";

function check_login(){
    let logged_in = get_cookie("user") != "" ? true : false;
    if (logged_in) {
        //console.log("logged in");
        return true;
    } else {
        //console.log("logged out");
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
    //$("#landing").css("background", "url('../images/ad.png')");
    load_landing();
    if(check_login()){
        $("#login-button").html("Profile");
    } else {
        $("#login-button").html("Sign up/Login");
    }
})()

function load_cars(){
    $.ajax("/cars")
        .done( data => {
            add_car_listing(data);
        });
}

$("#logo").click(() => {
    target = "landing";
    clear_search();
    load_landing();
});

function load_landing(){
    main.innerHTML = `
        <div id="landing">
                <h2 >Car dealership</h2>
                <h4>Contact: +05678288</h4>
                <h4>Address: 267811 asd street 2</h4>
        </div>`
}

function load_manufs(){
    $.ajax("/manufacturers")
        .done( data => {
            add_manuf_listing(data);
        })
}

function add_car_listing(cars) {
    car_listings.innerHTML = "";
    for(car of cars){
        let card = document.createElement("div");
        card.className += "listing-card";
        let title = document.createElement("h3");
        title.className += "mid";
        title.textContent = car.manufacturer + " ";
        title.textContent +=  car.name;
        let img = document.createElement("img");
        img.src = "images/placeholder.png";
        let color = cp();
        color.textContent = "Color: ";
        color.textContent += car.color;
        let y = cp();
        y.textContent = "Year: "
        y.textContent += car.year;
        let avail = cp();
        avail.textContent = "Available: ";
        avail.textContent += car.available;
        let cons = cp();
        cons.textContent = "Consumption: "
        cons.textContent += car.consumption;
        let hp = cp();
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
    main.appendChild(car_listings);
}

function add_manuf_listing(manufs) {
    //console.log(manufs);
    manuf_listings.innerHTML = "";
    let list = document.createElement("ul");
    list.className = "outer-list";
    for(m of manufs){
        let outer_li = document.createElement("li");
        outer_li.className = "outer-li";
        let inner_ul = document.createElement("ul");
        inner_ul.className = "inner-list";
        let inner_li_n = document.createElement("li");
        inner_li_n.className = "li-name";
        let inner_li_c = document.createElement("li");
        inner_li_c.className = "li-country";
        let inner_li_f = document.createElement("li");
        inner_li_f.className = "li-founded";
        inner_li_n.textContent = m.name;
        inner_li_c.textContent = m.country;
        inner_li_f.textContent = m.founded;
        inner_ul.appendChild(inner_li_n);
        inner_ul.appendChild(inner_li_c);
        inner_ul.appendChild(inner_li_f);
        outer_li.appendChild(inner_ul);
        list.appendChild(outer_li);
    }
    manuf_listings.appendChild(list);
}

function parse_json() {
    
}

function cp() {
    return document.createElement("p");
}

$("#list_cars").click(() => {
    list_cars();
});

function list_cars(){
    target = "cars"
    clear_search();
    add_car_options();
    load_cars();
    $("#submit_car_select").on("click", () => {
        let sel = document.getElementById("car_select");
        //console.log(sel.value);
        if(sel.value == "all-cars"){
            load_cars();
            return;
        }
        document.cookie = "name=" + sel.value;
        $.ajax("/manufacturer")
            .done(data => {
                //console.log(data);
                add_car_listing(data);
            });
    });
}

$("#list_manuf").click(() => {  
    list_manuf();
});

function list_manuf(){
    target = "manufs";
    clear_search();
    //$("#car_search").on("input", () => {
    //    let str = $("#car_search").val();
    //    ls_cars_by_mf(str);
    //});
    load_manufs();
    main.appendChild(manuf_listings);
}


$("#search_bar").on("input", function() {
    //console.log($(this).val());
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
            break;
        case "manufs":
            break;
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
        show_msg("Login failed");
    } else {
        //log in
        console.log("logging in..");
        document.cookie = "user=" + login_user;
        location.reload();
    }
});

function show_msg(error_msg) {
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

//logout
var logout_button = document.getElementById("logout_btn");
logout_button.addEventListener("click", () => {
    logout();
});
function logout() {
    console.log("logging out..");
    delete_cookie("user");
    location.reload();
}
//addcar
var add_car_button = document.getElementById("add_car_btn");
add_car_button.addEventListener("click", () => {
    add_car_form();
});
var add_mf_button = document.getElementById("add_mf_btn");
add_mf_button.addEventListener("click", () => {
    add_mf_form();
})
function add_car_form() {
    $("#car_modal").show();
    console.log("ad");
    $("#car_modal_submit").on("click", () => {
        //$.post("/addCar", {
        //    "name": $("#car_modal input")[0] 
        //})
        let cname = $("#car_modal input")[0].value;
        let ccons = $("#car_modal input")[1].value;
        let ccolor = $("#car_modal input")[2].value;
        let cmf = $("#car_modal input")[3].value;
        let cavail = $("#car_modal input")[4].value;
        let cyear = $("#car_modal input")[5].value;
        let chp = $("#car_modal input")[6].value;
        
        let car = {
            "name" : cname, 
            "consumption" :ccons,
            "color" : ccolor,
            "manufacturer" : cmf, 
            "available" : cavail, 
            "year" : cyear,
            "horsepower" : chp
        }
        $.post("/addCar", car,(data) => {
            console.log(data); 
        }).fail( textStatus => {
            show_msg("Failed to add car!" + textStatus);
        })
        $("#car_modal").hide();
        list_cars();
    });
}

var months = ["January", "February", "March", 
              "April", "May", "June", "July", 
              "August", "September", "October", 
              "November", "December"];

function add_mf_form(){
    $("#mf_modal").show();
    $("#mf_modal_submit").on("click", () => {
        
        let mname = $("#mf_modal input")[0].value;
        let mcountry = $("#mf_modal input")[1].value;
        let mdate = $("#mf_modal input")[2].value;
        //console.log(mdate);
        mdates = mdate.split("-");

        let y = mdates[0];
        let m = mdates[1];
        m = months[m - 1];
        let d = mdates[2];
        mdate = m + " " + d + ", " + y;
        //console.log(mdate);

        let mf = {
            "name" : mname,
            "country" : mcountry,
            "founded" : mdate
        }

        $.post("/addManufacturers", mf ,(data) => {
            //console.log(data); 
        }).fail( (jqXHR, textStatus, error) => {
            show_msg("Failed to add manufacturer! " + error)
        })

        $("#mf_modal").hide();
        list_manuf();
    });
}
var car_modal = document.getElementById('car_modal');
window.onclick = function(event) {
  if (event.target == car_modal) {
    car_modal.style.display = "none";
  }
}
var mf_modal = document.getElementById("mf_modal");
window.onclick = function(event) {
    if (event.target == mf_modal) {
      mf_modal.style.display = "none";
    }
}
var close_modal1 = document.getElementById("close_modal1");
close_modal1.addEventListener("click", () => {
    document.getElementById('car_modal').style.display='none';
});
var close_modal2 = document.getElementById("close_modal2");
close_modal2.addEventListener("click", () => {
    document.getElementById('mf_modal').style.display='none';
});

//
function get_cars(man) {
    document.cookie = "name=" + man;
    //console.log(document.cookie);
    $.get("/manufacturer").done(data => {
        console.log(data);
    });
    //delete_cookie('name');
}

var search_form = `
<div class="car_search">
    <select id="car_select">
        <option value="all-cars">Select a car manufacturer</option>
    </select>
    <input type="button" value="Submit" id="submit_car_select">
</div>
`
function add_car_options(){
    main.innerHTML += search_form;
    let sel = document.getElementById("car_select");
    $.ajax("/manufacturerNames")
        .done(data => {
            for(car of data){
                console.log(car);
                let opt = document.createElement("option");
                opt.textContent = car;
                sel.appendChild(opt);
            }
        });
}
/*
function ls_cars_by_mf(str){
    console.log(str);
    document.getElementById("suggest-list").innerHTML = "";
    $.ajax("/manufacturerNames")
        .done(data => {
            for(car of data){
                if(str != ""){
                    if(car.toLowerCase().includes(str.toLowerCase())){
                        document.getElementById("suggest-list").appendChild(mk_search_item(car));
                    }
                }
            }
        });
}

function mk_search_item(name){
    var li = document.createElement("li");
    li.className = "suggest-item";
    li.textContent = name;
    console.log(li);
    return li;
}
*/
