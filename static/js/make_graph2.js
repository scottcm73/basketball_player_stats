
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

// Return an array of the selected opion values
// select is an HTML select element
function GetSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}
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
"free_throws_made", 
 "games_played", "minutes_played", 
 "offensive_rebounds", "personal_fouls", 
 "points", 
 "rebounds", "steals", "three_pointer_attempts", 
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


function getData(){
  Plotly.d3.json('/data', function(data)
  // data is an object with an array of dictionaries, not an actual json
  {
      console.log(data)
      let keys=make_key_array(data)
      make_traces(data)
     

  }
     
  )};

getData()