
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

function make_value_arr_for_key(data, keys, key){
    var result=data.map(item=> 
        { 
            values = data.map(({season}) => season);
        }
    )
return values
};
function getData(){
    Plotly.d3.json('/data', function(data)
    // data is an object with an array of dictionaries, not an actual json
    {
        var keys=make_key_array(data)
        console.log(keys)
        var key="season"
        var value_array=make_value_arr_for_key(data, keys, key)

        console.log(window.value_array)
    }
       
    )};

getData()

trace1 = {
    type: 'bar',
    x: [ "2009 - 2010", "2010 - 2011", "2011 - 2012", "2012 - 2013"],
    y: [10, 15, 13, 17],
    mode: 'lines',
    name: 'Red',
    line: {
      color: 'rgb(219, 64, 82)',
      width: 3
    }
  };
  
  trace2 = {
    type: 'bar',
    x: [ "2009 - 2010", "2010 - 2011", "2011 - 2012", "2012 - 2013"],
    y: [12, 9, 15, 12],
    mode: 'lines',
    name: 'Blue',
    line: {
      color: 'rgb(55, 128, 191)',
      width: 1
    }
  };
  
  var layout = {
    width: 500,
    height: 500
  };
  
  var data2 = [trace1, trace2];
  
  Plotly.newPlot('myDiv', data2, layout);