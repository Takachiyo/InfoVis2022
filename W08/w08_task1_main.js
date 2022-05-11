d3.csv("https://takachiyo.github.io/InfoVis2022/W04/csv_pop_estimate_2045.csv",function(error, data){
    console.log(data.value);
    })
    .catch( error => {
        console.log( error );
    });

