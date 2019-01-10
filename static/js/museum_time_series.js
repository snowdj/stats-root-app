$('#ts-museums')
    .dropdown({
        onChange: function () {
            // console.log($('.label.ui.dropdown').dropdown("get value"));
            var museums_list = $('#ts-museums').dropdown("get value")
            var actual_val = document.getElementById('actual-bt');
            if (actual_val.value == 'off') {
                actual_val = false;
            } else if (actual_val.value == 'on') {
                actual_val = true;
            }

            var ma_val = document.getElementById('ma-bt');
            if (ma_val.value == 'off') {
                ma_val = false;
            } else if (ma_val.value == 'on') {
                ma_val = true;
            }
            make_chart(museums_list, actual_val, ma_val);

        }
    }
    );

$('#ts-museums').dropdown('set selected', ['BRITISH MUSEUM', 'IMPERIAL WAR MUSEUM (TOTAL)']);

function make_chart(museums_list, actual, ma) {

    // create colors for series
    var mus_colours = {}
    var colors = d3.scaleOrdinal(d3.schemeCategory10);
    for (var i = 0; i < museums_list.length; i++) {
        mus_colours[museums_list[i]] = colors(i);
        mus_colours[museums_list[i] + "_MA"] = colors(i);
    }

    var museums_list_ma = museums_list.slice();
    for (var i = 0; i < museums_list_ma.length; i++) {
        museums_list_ma[i] = museums_list_ma[i] + "_MA";
    }

    // series to display on chart
    if (actual && ma === false) {
        console.log('actual works');
        var museums_list_ma_hide = museums_list_ma.slice();

    } else if (actual === false && ma) {
        console.log('ma works');
        // specify series to include
        var len = museums_list.length;
        for (var i = 0; i < len; i++) {
            museums_list[i] = museums_list[i] + "_MA";
            var museums_list_ma_hide = [];
        }

    } else if (actual && ma) {
        console.log('actual and ma works');
        // specify series to include
        var len = museums_list.length;
        for (var i = 0; i < len; i++) {
            museums_list.push(museums_list[i] + "_MA");
        }
        // list of MA series to hide from legend
        var museums_list_ma_hide = museums_list_ma.slice();

    } else if (actual === false && ma === false) {
        museums_list = [];
        museums_list_ma = [];
        console.log('both false works');

    } else {
        console.log('bad actual and ma values in time series chart')
    }


    chart_data = ts_data.filter(function (item) {
        return museums_list.includes(item[0]);
    })
    chart_data.push(ts_data[0]);
    
    var chart = c3.generate({
        bindto: '#ts',
        data: {
            x: 'date',
            //        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
            columns: chart_data,
            //         columns: [
            //             ['date', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
            // //            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
            //             ['data1', 30, 200, 100, 400, 150, 250],
            //             ['data2', 130, 340, 200, 500, 250, 350]
            //         ]
            // json: [
            //     {'x': '2013-01-01', 'data1': 30, 'data2': 130},
            //     {'x': '2013-01-02', 'data1': 40, 'data2': 133},
            //     {'x': '2013-01-03', 'data1': 60, 'data2': 134},
            //     {'x': '2013-01-04', 'data1': 70, 'data2': 136},
            //     {'x': '2013-01-05', 'data1': 80, 'data2': 137},
            // ]
            colors: mus_colours
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    outer: false,
                    format: '%Y'
                }
            },
            y: {
                tick: {
                    outer: false,
                    format: function (d) {
                        if (d >= 999000)
                            return (d / 1000000).toFixed(1) + 'M';
                        else if (d >= 1000)
                            return (d / 1000).toFixed(0) + 'k'
                        else
                            return d.toFixed(0);
                    }
                },
                // min: 0,
            }
        },
        legend: {
            // amount of padding to put between each legend element
            padding: 5,
            position: 'right',
            // define custom height and width for the legend item tile
            item: {
                tile: {
                    width: 15,
                    height: 2
                }
            },
            hide: museums_list_ma_hide,
        },
        grid: {
            x: {
            },
            y: {
                show: true
            }
        },
        tooltip: {
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
                
                // remove data in hide arrary from tooltip
                var tempd = d.slice();
                var tooltip_data = museums_list_ma_hide;
                // var tempd = d.filter(obj => obj['id'] == "BRITISH MUSEUM");
                var tempd = d.filter(function(item){
                    return tooltip_data.indexOf(item['id']) === -1;
                  });
                var d = tempd.slice();

                // specify title format for tooltip
                var titleFormat = d3.timeFormat("%B %Y");

                var $$ = this, config = $$.config,
                    // titleFormat = config.tooltip_format_title || defaultTitleFormat,
                    nameFormat = config.tooltip_format_name || function (name) { return name; },
                    valueFormat = config.tooltip_format_value || defaultValueFormat,
                    text, i, title, value, name, bgcolor;
                for (i = 0; i < d.length; i++) {
                    if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }
      
                    if (! text) {
                        title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                        text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                    }
      
                    name = nameFormat(d[i].name);
                    value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                    bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);
      
                    text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
                    text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
                    text += "<td class='value'>" + value + "</td>";
                    text += "</tr>";
                }
                return text + "</table>";
            }
        },
    });

    // hide points for moving average series
    for (var i = 0; i < museums_list_ma.length; i++) {
        var new_mus_name = museums_list_ma[i].replace(/ /g, '-');
        var ma_classname = 'c3-circles-' + new_mus_name;
        var element = document.getElementsByClassName(ma_classname);
        element[0].setAttribute("style", "display: none");
    }
}

function onoff(element) {
    if (element.value == 'off') {
        element.value = 'on';
    } else {
        element.value = 'off';
    }
    element.classList.toggle('on');
    element.classList.toggle('off');
    console.log(element.id + "'s class is " + element.classList + " and value is " + element.value);

    var actual_val = document.getElementById('actual-bt');
    if (actual_val.value == 'off') {
        actual_val = false;
    } else if (actual_val.value == 'on') {
        actual_val = true;
    }
    console.log(actual_val);

    var ma_val = document.getElementById('ma-bt');
    if (ma_val.value == 'off') {
        ma_val = false;
    } else if (ma_val.value == 'on') {
        ma_val = true;
    }
    console.log(ma_val);

    var museums_list = $('#ts-museums').dropdown("get value")
    make_chart(museums_list, actual_val, ma_val);
}
