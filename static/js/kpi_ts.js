var initial_kpi = 'Annual Visitors';
var initial_museums = ["British Museum", "Geffrye Museum"];

$('#kpi-dropdown')
    .dropdown({
        onChange: function () {
            var kpi = $('#kpi-dropdown').dropdown("get value");
            var museums = $('#kpi-museums-dropdown').dropdown("get value");
            make_kpi_chart(kpi, museums);
        }
    })
    ;

$('#kpi-museums-dropdown')
    .dropdown({
        onChange: function () {
            var kpi = $('#kpi-dropdown').dropdown("get value");
            var museums = $('#kpi-museums-dropdown').dropdown("get value");
            make_kpi_chart(kpi, museums);
        }
    }
    );
$('#kpi-dropdown').dropdown('set selected', initial_kpi);
$('#kpi-museums-dropdown').dropdown('set selected', initial_museums);

// console.log(kpi_data);
function make_kpi_chart(kpi, museums) {
    console.log(kpi);
    var grid_annotation = {};
    if (kpi=='Number of instances where visitors under 18 years old participated in on-site activites') {
        if (museums.includes('Horniman Museum')) {
            grid_annotation = {
                lines: [
                    {value: '2015/15', text: 'Change in Horniman Museum methodology - see note.'},
                ]
            };            
        }
        if (museums.includes('National Portrait Gallery')) {
            grid_annotation = {
                lines: [
                    {value: '2014/15', text: 'Change in National Portrait Gallery methodology - see note.'},
                ]
            };            
        }
        if (museums.includes('Royal Armouries')) {
            grid_annotation = {
                lines: [
                    {value: '2016/17', text: 'Change in Royal Armouries methodology - see note.'},
                ]
            };            
        }
        if (museums.includes("Sir John Soane's Museum")) {
            grid_annotation = {
                lines: [
                    {value: '2013/14', text: "Change in Sir John Soane's Museum methodology - see note."},
                ]
            };            
        }
    }
    if (kpi=='UK loan venues') {
        if (museums.includes('Science Museum Group')) {
            grid_annotation = {
                lines: [
                    {value: '2016/17', text: 'Change in Science Museum Group methodology - see note.'},
                ]
            };            
        }
    }

    console.log(grid_annotation);
    kpi_chart_data = kpi_data[kpi].filter(function (item) {
        // museums = 'IMPERIAL WAR MUSEUM (TOTAL)';
        return museums.includes(item[0]);
    })
    // kpi_chart_data.push(kpi_data[kpi][0]);
    // console.log(kpi_chart_data);
    var categories = kpi_data[kpi][0].slice();
    categories.splice(0,1);
    // console.log(categories);

    var chart = c3.generate({
        bindto: '#ts-kpi',
        data: {
            // x: 'Year',
            columns: kpi_chart_data,
        },
        axis: {
            x: {
                type: 'category',
                categories: categories,
                tick: {
                    outer: false,
                    // format: '%b'
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
        },
        grid: {
            x: grid_annotation,
            y: {
                show: true
            }
        },

    });

}

make_kpi_chart(initial_kpi, initial_museums);