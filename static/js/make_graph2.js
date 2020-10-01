function populate_option_selector(sid, optionsData){
  
  
  var selectTag = d3.select(sid);

    //we have select all options tags from inside select tag (which there are 0 atm)
    //and assigned data as to be the base of modelling that selection.
    var options = selectTag.selectAll('option')
      .data(optionsData);

    //d3 sees we have less elements (0) than the data (2), so we are tasked to create
    //these missing inside the `options.enter` pseudo selection.
    //if we had some elements from before, they would be reused, and we could access their
    //selection with just `options`
    options.enter()
      .append('option')
      .attr('value', function(d) {
        return d.value;
      })
      .text(function(d) {
        return d.text;
      });


}
function make_optionArray(data, key){
  var keyArray=data.map(d=>d[key]);
  
  var keyArray=new Set(keyArray)
  keyArray = [...keyArray]; 
  console.log(keyArray)

var result = keyArray.map(e=> {
  return {value: e, text: e}
})
  result.unshift({value: "All", text: "All"})
  console.log(result)

  return result
};

function make_key_array(data){
  keys=[]    
  for(let obj in data){
      if(data.hasOwnProperty(obj)){
      for(let key in data[obj]){
          if(data[obj].hasOwnProperty(key)){
              // Only adds first 31 keys starting at 0
              if (keys.length<31){
                  keys.push(key);
                                  }
          
          }
      }
      
  }
  }  
  return keys
};
function make_value_arr_for_key(data, keys, key, players, stage, seasons){
  values=[]
 
  let newArray = data.filter(function (el) {
      return players.includes(el["player"]) & el["stage"]== stage & seasons.includes(el["season"]);
    });
 
  Object.keys(newArray).forEach(k => {

      
      if(newArray[k].hasOwnProperty(key)){
          values.push(newArray[k][key])
      }
     

  
    
    });
  // Set is used to make sure there are no repeats
  return values
};


function make_traces(data){
 let t_array=[]
 let value_arrays=[]
 //var selectBox = document.getElementsById('fm_delivery_or_collection');
 //season=GetSelectValues(selectBox ));
 let key="season";
 let key2="points";
 let players=["Kevin Durant", "Kobe Bryant", "LeBron James"];
 let stage="Regular_Season";
 let seasons=["2009 - 2010", "2010 - 2011", "2011 - 2012"];
 let key_array = [
  "assists", "blocks", 
  "defensive_rebounds", "field_goal_attempts", "field_goals_made", "free_throw_attempts",
  "free_throws_made", "games_played", "offensive_rebounds", "minutes_played",  
  "personal_fouls", "rebounds", "points", "steals", "three_pointer_attempts", 
  "three_pointers_made", "turnovers"];
 
  let this_key="season";

  let valuesX=seasons;

combos = [] //or combos = new Array(2);
thisX=""
combos = [] //or combos = new Array(2);

for(var i = 0; i < seasons.length; i++)
{
     for(var j = 0; j < players.length; j++)
     {
        //you would access the element of the array as array1[i] and array2[j]
        //create and array with as many elements as the number of arrays you are to combine
        var thisX=seasons[i] + " -- " + players[j]
        //add them in
        //you could have as many dimensions as you need
        combos.push(thisX)
     }
}
console.log(combos)
  var valuesY
  for (key in key_array){

  console.log(key_array[key])
  valuesY=make_value_arr_for_key(data, keys, key_array[key], players, stage, seasons);
  // let layout = {
  // width: 1600,
  // 
  // barmode: 'group'
  // };
  // Plotly.newPlot('myDiv', trace, layout)
  var trace1 = {
    x: combos,
    y: valuesY,

    
    name: key_array[key],
    type: 'bar'
  };
  
  t_array.push(trace1)
};
  console.log(t_array);
  var data = t_array;
  
  var layout = {barmode: 'group', 
  yaxis: {
    automargin: true
  },
  xaxis: {
    automargin: true
  },
      title: players,
      height: 800,
      width: 1200,
      hovermode:'closest',};
  
  Plotly.newPlot('myDiv', data, layout);


};
function getseasons(){
  var selectedSeasons = []
  for (var seaoption of d3.select('#seasons').property("selectedOptions")){
    if (seaoption.value!="All"){
    selectedSeasons.push(seaoption.value)
    }
  }
  
  console.log(selectedSeasons);
  sessionStorage.setItem("sseasons", JSON.stringify(selectedSeasons));
  console.log(JSON.parse(sessionStorage.getItem("sseasons")));
};

function getplayers(){
  var selectedPlayers = []
  for (var poption of d3.select('#players').property("selectedOptions")){
    if (poption.value!="All"){
    selectedPlayers.push(poption.value)
    }
  }
  console.log(selectedPlayers)
  sessionStorage.setItem("splayers", JSON.stringify(selectedPlayers));
  console.log(JSON.parse(sessionStorage.getItem("splayers")));


};
function getstats(){
  var selectedStats = []
  for (var soption of d3.select('#stats').property("selectedOptions")){
    if (soption.value!="All"){
    selectedStats.push(soption.value)
    }
  }
  
  console.log(selectedStats)
  sessionStorage.setItem("sstats", JSON.stringify(selectedStats));
  console.log(JSON.parse(sessionStorage.getItem("sstats")));
};

function thisload(){
    Plotly.d3.json('/data', function(data)
      // data is an object with an array of dictionaries, not an actual json
      {
          console.log(data)
  
       
          let keys=make_key_array(data)
      
          make_traces(data)
        

    console.log(data)
    var optionsData=[
      {value: "All", text: "All"},
      {value: "assists", text: "assists"},
      {value: "blocks", text: "blocks"},
      {value: "defensive_rebounds", text: "defensive rebounds"},
      {value: "field_goal_attempts", text: "field goal attempts"},
      {value: "field_goals_made", text: "field goals made"},
      {value: "free_throw_attempts", text: "free throw attempts"},
      {value: "free_throws_made", text: "free throws made"},
      {value: "games_played", text: "games played"},
      {value: "offensive_rebounds", text: "offensive rebounds"},
      {value: "minutes_played", text: "minutes played"},
      {value: "personal_fouls", text: "personal fouls"},
      {value: "rebounds", text: "rebounds"},
      {value: "points", text: "points"},
      {value: "steals", text: "steals"},
      {value: "three_pointer_attempts", text: "three pointer attempts"},
      {value: "three_pointers_made", text: "three pointers made"},
      {value: "turnovers", text: "turnovers"}
        ];
    var sid="#stats"
    populate_option_selector(sid, optionsData)
    
    key=["player", "team", "season"]
    sid=["#players", "#teams", "#seasons"]
    //key and sid have same length
    for (var i=0; i < key.length; i++){
    optionsData=make_optionArray(data, key[i])
    populate_option_selector(sid[i], optionsData)
    
    }})};