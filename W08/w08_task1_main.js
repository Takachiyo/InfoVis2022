/*
d3.csv("https://takachiyo.github.io/InfoVis2022/W04/csv_pop_estimate_2045.csv", function(data){
    console.log(data)
});
*/

d3.csv("https://takachiyo.github.io/InfoVis2022/W04/csv_pop_estimate_2045.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });
    });