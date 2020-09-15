
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

function make_value_arr_for_key(data, key){

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


};
function getData(){
    Plotly.d3.json('/data', function(data)
    // data is an object with an array of dictionaries, not an actual json
    {
        key_array=make_key_array(data)
        console.log(key_array)




    }
       
    )};

getData()