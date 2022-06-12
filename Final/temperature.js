var width = 400;
var height = 600;
var margin = 50;

var svg = d3.select("body")
.append("svg")
.attr("width", width)
.attr("height", height);

var chart = svg.append('g')
    .attr('transform', `translate(0, ${margin})`);

var projection = d3.geoMercator()
      .center([ 136.0, 35.6 ])
      .translate([200, 300])
      .scale(1000)

var path = d3.geoPath().projection(projection);

d3.csv("https://takachiyo.github.io/InfoVis2022/Final/日平均気温(2019).csv")
.then( data => {
   data.forEach( d => { d.value = +d.value; });

   var colorScale = d3.scaleLinear()
               .domain([d3.min(data, function(d) { return parseInt(d.value);})
                  , d3.max(data, function(d) { return parseInt(d.value);})])
               .range([100, 50]);

   d3.json("https://takachiyo.github.io/InfoVis2022/Final/japan1.geojson").then(function(json) {
      for (var i = 0; i < data.length; i++) {
         var dataPref = data[i].area;
         var dataValue = parseFloat(data[i].value);

         for (var j = 0; j < json.features.length; j++) {
            var jsonPref = json.features[j].properties.pref_j;
            if (dataPref == jsonPref) {
               json.features[j].properties.value = dataValue;
               break;
            }
         }
      }
   
   chart.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", "black")
      .style("stroke-width", 0.25)
      .style("fill", function(d){
         return "hsl(0, 100%, " + (colorScale(d.properties.value)) + "%)";
       });
     
     svg.append("text")
     .attr("fill", "black")
     .attr("x", 200)
     .attr("y", 0)
     .attr("font-size", "10pt")
     .attr("font-weight", "bold")
     .text("都道府県別日平均気温 2019年度");

   });
});