var width2 = 400;
var height2 = 600;

var svg2 = d3.select("body")
.append("svg")
.attr("width", width2)
.attr("height", height2);

var projection2 = d3.geoMercator()
      .center([ 136.0, 35.6 ])
      .translate([width2/2, height2/2])
      .scale(1000);

var path2 = d3.geoPath().projection(projection2);

d3.csv("https://takachiyo.github.io/InfoVis2022/FinalTask/アイスクリームの消費金額(2019).csv")
.then( data => {
   data.forEach( d => { d.value = +d.value; });

   var colorScale2 = d3.scaleLinear()
               .domain([d3.min(data, function(d) { return parseInt(d.value);})
                  , d3.max(data, function(d) { return parseInt(d.value);})])
               .range([100, 50]);

   d3.json("https://takachiyo.github.io/InfoVis2022/FinalTask/japan2.geojson").then(function(json) {
      for (var i = 0; i < data.length; i++) {
         var dataPref2 = data[i].area;
         var dataValue = parseFloat(data[i].value);

         for (var j = 0; j < json.features.length; j++) {
            var jsonPref2 = json.features[j].properties.pref_j;
            if (dataPref2 == jsonPref2) {
               json.features[j].properties.value = dataValue;
               break;
            }
         }
      }
   
   
   svg2.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path2)
      .style("stroke", "black")
      .style("stroke-width", 0.25)
      .style("fill", function(d){
         return "hsl(0, 100%, " + (colorScale2(d.properties.value)) + "%)";
       });


   });
});