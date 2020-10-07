// Data is retrieved using MySQL and Flask, and 
// This app uses a combination of plotly.js and D3 to make graphs.
// Each time a graph is made the page reloads and the user selections are erased to
// allow new selections for making another graph.
// A graph is produced after the user clicks on the Make Graph button. You will have to scroll
// down to see the graph. 

function populate_option_selector(sid, optionsData) {
    var selectTag = d3.select(sid);
    var options = selectTag.selectAll('option')
        .data(optionsData);
    options.enter()
        .append('option')
        .attr('value', function(d) {
            return d.value;
        })
        .text(function(d) {
            return d.text;
        });
  
  }
  
  function make_optionArray(data, key) {
    var keyArray = data.map(d => d[key]);
    var keyArray = new Set(keyArray)
    keyArray = [...keyArray];
    var result = keyArray.map(e => {
        return {
            value: e,
            text: e
        }
    })
    if (key != "player" & key != "stage") {
  
        result.unshift({
            value: "All",
            text: "All"
        })
    }
    return result
  };
  
  
  function make_key_array(data) {
    keys = []
    for (let obj in data) {
        if (data.hasOwnProperty(obj)) {
            for (let key in data[obj]) {
                if (data[obj].hasOwnProperty(key)) {
                    // Only adds first 31 keys starting at 0
                    if (keys.length < 31) {
                        keys.push(key);
                    }
  
                }
            }
  
        }
    }
    return keys
  };
  
  function make_value_arr_for_key(data, keys, key, players, stages, seasons) {
    values = []
  
    let newArray = data.filter(function(el) {
        return players.includes(el["player"]) & stages.includes(el["stage"]) & seasons.includes(el["season"]);
    });
  
    Object.keys(newArray).forEach(k => {
  
        if (newArray[k].hasOwnProperty(key)) {
            values.push(newArray[k][key])
        }
  
    });
    // Set is used to make sure there are no repeats
    return values
  };
  
  
  function make_traces(data) {
      document.getElementById("stats").value = null;
      document.getElementById("seasons").value = null;
      document.getElementById("players").value = null;
      document.getElementById("stages").value = null;
    if (sessionStorage.getItem("splayers") !== null &&
        sessionStorage.getItem("sseasons") !== null &&
        sessionStorage.getItem("sstats") !== null &&
        sessionStorage.getItem("sstages") !== null
  
    ) {
  
        var t_array = []
        var value_arrays = []
        //var selectBox = document.getElementsById('fm_delivery_or_collection');
        //season=GetSelectValues(selectBox ));
        let key = "season";
        let key2 = "points";
        var players = JSON.parse(sessionStorage.getItem("splayers"));
        var stages = JSON.parse(sessionStorage.getItem("sstages"));
  
        var seasons = JSON.parse(sessionStorage.getItem("sseasons"));
  
        var key_array = JSON.parse(sessionStorage.getItem("sstats"));
  
        let this_key = "season";
  
        let valuesX = seasons;
  
    } else {
  
        var t_array = []
        var value_arrays = []
        //var selectBox = document.getElementsById('fm_delivery_or_collection');
        //season=GetSelectValues(selectBox ));
        var key = "season";
        var key2 = "points";
        var players = ["Kevin Durant", "Kobe Bryant", "LeBron James"];
        var stages = ["Regular_Season", "Playoffs"];
        var seasons = ["2009 - 2010", "2010 - 2011", "2011 - 2012"];
        var key_array = [
            "assists", "blocks",
            "defensive_rebounds", "field_goal_attempts", "field_goals_made", "free_throw_attempts",
            "free_throws_made", "games_played", "offensive_rebounds", "minutes_played",
            "personal_fouls", "rebounds", "points", "steals", "three_pointer_attempts",
            "three_pointers_made", "turnovers"
        ];
  
        let this_key = "season";
  
        let valuesX = seasons;
    };
    combos = [] //or combos = new Array(2);
    thisX = ""
    combos = [] //or combos = new Array(2);
    // It makes all traces for one stage at a time, Regular Season or Playoffs.
    for (var k = 0; k < stages.length; k++) {
  
        for (var i = 0; i < seasons.length; i++) {
  
            for (var j = 0; j < players.length; j++) {
                //you would access the element of the array as array1[i] and array2[j]
                //create and array with as many elements as the number of arrays you are to combine
                var thisX = seasons[i] + " -- " + stages[k] + " -- " + players[j]
                //add them in
                //you could have as many dimensions as you need
                combos.push(thisX)
            }
  
        }
    }
  
    var valuesY
    for (key in key_array) {
  
  
        valuesY = make_value_arr_for_key(data, keys, key_array[key], players, stages, seasons);
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
  
    var data = t_array;
  
    var layout = {
        barmode: 'group',
        yaxis: {
            automargin: true
        },
        xaxis: {
            automargin: true
        },
        title: players,
        height: 800,
        width: 1200,
        hovermode: 'closest',
    };
  
    Plotly.newPlot('myDiv', data, layout);
    sessionStorage.removeItem('sstats');
    sessionStorage.removeItem('splayers');
    sessionStorage.removeItem('sseasons');
    sessionStorage.removeItem('sstages');
  
  };
  
  function getseasons() {
    var sel = document.getElementById('seasons');
    if (sel.options[sel.selectedIndex].value === "All") {
        var selectedSeasons = []
        var i;
        for (i = 0; i < sel.length; i++) {
            selectedSeasons.push(sel.options[i].value)
        }
        selectedSeasons.shift();
  
    } else {
        var selectedSeasons = []
        for (var soption of d3.select('#seasons').property("selectedOptions")) {
            if (soption.value != "All") {
                selectedSeasons.push(soption.value)
            }
        };
    }
  
    sessionStorage.setItem("sseasons", JSON.stringify(selectedSeasons));
  };
  
  function getplayers() {
  
    var selectedPlayers = []
    for (var poption of d3.select('#players').property("selectedOptions")) {
        if (poption.value != "All") {
            selectedPlayers.push(poption.value)
        }
    };
  
  
    sessionStorage.setItem("splayers", JSON.stringify(selectedPlayers))
  };
  
  function getstats() {
    var sel = document.getElementById('stats');
    var selectedStats = []
    if (sel.options[sel.selectedIndex].value === "All") {
        var i;
        for (i = 0; i < sel.length; i++) {
            selectedStats.push(sel.options[i].value)
        }
        selectedStats.shift();
  
    } else {
  
        for (var soption of d3.select('#stats').property("selectedOptions")) {
            if (soption.value != "All") {
                selectedStats.push(soption.value)
            }
        };
    }
  
    sessionStorage.setItem("sstats", JSON.stringify(selectedStats));
  };
  
  function getstages() {
    var selectedStages = []
    var sel = document.getElementById('stages');
  
    if (sel.options[sel.selectedIndex].value === "Both") {
        var i;
        for (i = 0; i < sel.length; i++) {
            selectedStages.push(sel.options[i].value)
        }
        //Removes first option value from list of selected options values. So, "Both" is not in the list.
        selectedStages.shift();
    } else {
        for (var stoption of d3.select('#stages').property("selectedOptions")) {
            if (stoption.value != "Both") {
                selectedStages.push(stoption.value)
            }
        };
    }
  
    sessionStorage.setItem("sstages", JSON.stringify(selectedStages));
  
  };
  
  function doreload() {
    if (sessionStorage.getItem("splayers") !== null &&
        sessionStorage.getItem("sseasons") !== null &&
        sessionStorage.getItem("sstats") !== null &&
        sessionStorage.getItem("sstages") !== null
  
    ) {
        make_traces(window.data)
    } else {
        alert("You must select at least one player, one season, one stat, and one stages before clicking on the Make Graph button.")
    }
  };
  
  
  function thisload() {
    Plotly.d3.json('/data', function(data)
        // data is an object with an array of dictionaries, not an actual json
        {
            window.data=data
            let keys = make_key_array(data)
            make_traces(data)
  
            var optionsData = [{
                    value: "All",
                    text: "All"
                },
                {
                    value: "assists",
                    text: "assists"
                },
                {
                    value: "blocks",
                    text: "blocks"
                },
                {
                    value: "defensive_rebounds",
                    text: "defensive rebounds"
                },
                {
                    value: "field_goal_attempts",
                    text: "field goal attempts"
                },
                {
                    value: "field_goals_made",
                    text: "field goals made"
                },
                {
                    value: "free_throw_attempts",
                    text: "free throw attempts"
                },
                {
                    value: "free_throws_made",
                    text: "free throws made"
                },
                {
                    value: "games_played",
                    text: "games played"
                },
                {
                    value: "offensive_rebounds",
                    text: "offensive rebounds"
                },
                {
                    value: "minutes_played",
                    text: "minutes played"
                },
                {
                    value: "personal_fouls",
                    text: "personal fouls"
                },
                {
                    value: "rebounds",
                    text: "rebounds"
                },
                {
                    value: "points",
                    text: "points"
                },
                {
                    value: "steals",
                    text: "steals"
                },
                {
                    value: "three_pointer_attempts",
                    text: "three pointer attempts"
                },
                {
                    value: "three_pointers_made",
                    text: "three pointers made"
                },
                {
                    value: "turnovers",
                    text: "turnovers"
                }
            ];
            var sid = "#stats"
  
            populate_option_selector(sid, optionsData)
  
            optionsData = [{
                    value: ["Both"],
                    text: "Both Regular Season & Playoffs"
                },
                {
                    value: "Regular_Season",
                    text: "Regular Season"
                },
                {
                    value: "Playoffs",
                    text: "Playoffs"
                }
            ]
            sid = "#stages"
            populate_option_selector(sid, optionsData)
  
            key = ["player", "team", "season"]
            sid = ["#players", "#teams", "#seasons"]
            //key and sid have same length
            for (var i = 0; i < key.length; i++) {
                optionsData = make_optionArray(data, key[i])
                populate_option_selector(sid[i], optionsData)
  
            }
        })
  };