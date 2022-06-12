d3.csv("https://takachiyo.github.io/InfoVis2022/Final/日平均気温(2019).csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 400,
            height: 1000,
            margin: {top:25, right:10, bottom:50, left:100},
            xlabel: 'Tenperature',
        };

        const bar_chart = new BarChart( config, data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

