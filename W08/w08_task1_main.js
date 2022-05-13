d3.csv("https://takachiyo.github.io/InfoVis2022/W08/data.csv", function(error, data) {

});

const allData = data.map(data=> {
    return data
    });
    console.table(allData);