var width = 600;
var height = 600;

var svg = d3.select("body")
.append("svg")
.attr("width", width)
.attr("height", height);

var projection = d3.geoMercator()
      .center([ 136.0, 35.6 ])
      .translate([width/2, height/2])
      .scale(1200)

var path = d3.geoPath().projection(projection);

d3.csv("https://takachiyo.github.io/InfoVis2022/Final/日平均気温(2019).csv")
.then( data => {
   data.forEach( d => { d.value = +d.value; });
   
   d3.json("https://takachiyo.github.io/InfoVis2022/Final/japan.geojson").then(function(json) {
      svg.append("g").selectAll("path")
          .data(json.features)
          .enter()
          .append("path")
          .attr("d", path)
  });
});