var chart = c3.generate({
    bindto: '#leaderboard',
    data: {
        x: 'museum',
        columns: [leaderboard_data[0], leaderboard_data[3]],
        type: 'bar',
        labels: {
            format: function (v, id, i, j) {
    if (v >= 999000)
        return (v / 1000000).toFixed(1) + 'M';
    else if (v >= 1000)
    return (v / 1000).toFixed(1) + 'k'
    else
        return v.toFixed(1);
            }
        }
    },
    axis: {
        rotated: true,
        x: {
            type: 'category', // this needed to load string x value
            tick: {
                multiline: false
              }

        },
        y: {
            show: false
        },
    },
    legend: {
        show: false
    },
    interaction: {
        enabled: false
      },
      padding: {
        left: 540
      },
});