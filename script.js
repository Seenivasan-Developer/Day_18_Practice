// final Data has to be displayed in the Bootstrap Cards
var container = document.createElement("div");
container.className="container";
var row =document.createElement("div");
row.className="row"

// Multiple api with async and await
async function get_data(){
    var res = await fetch("https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json")
    var result = await res.json();
   // console.log(result);
    for(var i =0;i<result.length;i++){
        var name = result[i].name;
        var latlng = result[i].latlng;
        var capital_data = result[i].capital
        open_data(name,...latlng,capital_data);
    }

}

async function open_data(name,lat,lon,capital_data){
try {
if(lat==undefined){
   throw new Error("Invalid Lat Long values") 
}
var open_res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3a222fe40879c5b9c7d1a45d211b0395`)
var final_res = await open_res.json();
var temp=final_res.main.temp;
//console.log(`Name:${name},Capital:${capital_data},lat:${lat},longitude:${lon}`);
var col=document.createElement("div");
col.className="col-md-4";
col.innerHTML=`<div class="card border-primary mb-3" style="max-width: 18rem;">
<div class="card-header">NAME: ${name}</div>
<div class="card-body text-primary">
<h5 class="card-title">Capital: ${capital_data}</h5>
<p class="card-text">latitude: ${lat}</p>
<p class="card-text">logitude: ${lon}</p>
<p class="card-text">temperature: ${temp}</p>
</div>
</div>`
row.append(col);
} catch (error) {
    console.log("data lost"+error.message);
}
}
get_data();
container.append(row);
document.body.append(container);
