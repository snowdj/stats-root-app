var initial_museum = 'BRITISH MUSEUM';
var initial_years = ['2017', '2018'];

$('#seasonal-museums-dropdown')
    .dropdown({
        onChange: function () {
            var museum = $('#seasonal-museums-dropdown').dropdown("get value");
            var years = $('#ts-years').dropdown("get value");
            make_seasonal_chart(museum, years);
        }
    })
    ;

$('#ts-years')
    .dropdown({
        onChange: function () {
            var museum = $('#seasonal-museums-dropdown').dropdown("get value");
            var years = $('#ts-years').dropdown("get value");
            make_seasonal_chart(museum, years);
        }
    }
    );
$('#ts-years').dropdown('set selected', initial_years);
$('#seasonal-museums-dropdown').dropdown('set selected', initial_museum);




function make_seasonal_chart(museum, my_years) {

    seasonal_chart_data = seasonal_data[museum].filter(function (item) {
        return my_years.includes(item[0]);
    })
    seasonal_chart_data.push(seasonal_data[museum][0]);

    var chart = c3.generate({
        bindto: '#ts-seasonal',
        data: {
            x: 'month',
            columns: seasonal_chart_data,
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    outer: false,
                    format: '%b'
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
            x: {
            },
            y: {
                show: true
            }
        },

    });

}

make_seasonal_chart(initial_museum, initial_years);