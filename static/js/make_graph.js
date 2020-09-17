function make_key_array(data){
  keys=[]    
  for(var obj in data){
      if(data.hasOwnProperty(obj)){
      for(var key in data[obj]){
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
function make_value_arr_for_key(data, keys, key, player, stage){
  values=[]
  var newArray = data.filter(function (el) {
      return el["player"] == player & el["stage"]== stage;
    });
  console.log(newArray)
  console.log("X")
  Object.keys(newArray).forEach(k => {
      // it should only go for 9 seasons in this data.
      
      if(newArray[k].hasOwnProperty(key)){
          values.push(newArray[k][key])
      }
     

    });
  // Set is used to make sure there are no repeats
  return values
};

function getData(){
  Plotly.d3.json('/data', function(data)
  // data is an object with an array of dictionaries, not an actual json
  {
      var keys=make_key_array(data)
      console.log(keys)
      var key="season"
      var key2="points"
      var player="Kevin Durant"
      var stage="Regular_Season"
      var value_arrayX=make_value_arr_for_key(data, keys, key, player, stage);
      var value_arrayY=make_value_arr_for_key(data, keys, key2, player, stage);
      console.log(value_arrayX)
      console.log(value_arrayY);
      make_graphs(data, value_arrayX, value_arrayY)
  }
     
  )};

getData()
function make_graphs(data, value_arrayX, value_arrayY ){
trace1 = {
  type: 'bar',
  x: value_arrayX,
  y: value_arrayY,
  mode: 'lines',
  name: 'Red',
  line: {
    color: 'rgb(219, 64, 82)',
    width: 3
  }
};


var layout = {
  width: 500,
  height: 500
};

var data2 = [trace1];

Plotly.newPlot('myDiv', data2, layout)
};