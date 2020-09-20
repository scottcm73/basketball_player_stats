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
function make_value_arr_for_key(data, keys, key, player, stage, season){
  values=[]
  let newArray = data.filter(function (el) {
      return el["player"] == player & el["stage"]== stage & el["season"]==season;
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
 let key="season";
 let key2="points";
 let player="Kobe Bryant";
 let stage="Regular_Season";
 let season="2009 - 2010";
 let key_array = ["assists", "blocks", 
 "defensive_rebounds", "field_goal_attempts", "field_goals_made", "free_throw_attempts", 
 "free_throws_made", "games_played", "height_cm", "minutes_played", "offensive_rebounds", 
 "personal_fouls", "points", "rebounds", "steals", "three_pointer_attempts", 
 "three_pointers_made", "turnovers"];
 
  let this_key="season";

  let valuesX=make_value_arr_for_key(data, keys, this_key, player, stage, season);
  var valuesY
  for (key in key_array){
  console.log(key_array[key])
  valuesY=make_value_arr_for_key(data, keys, key_array[key], player, stage, season);
  // let layout = {
  // width: 1600,
  // 
  // barmode: 'group'
  // };
  // Plotly.newPlot('myDiv', trace, layout)
  var trace1 = {
    x: valuesX,
    y: valuesY,

    
    name: key_array[key],
    type: 'bar'
  };
  
  t_array.push(trace1)
};
  console.log(t_array);
  var data = t_array;
  
  var layout = {barmode: 'group', 
      title: player,
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
