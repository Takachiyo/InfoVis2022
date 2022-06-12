var width = 500;
var height = 500;

var svg = d3.select("body")
.append("svg")
.attr("width", width)
.attr("height", height);

var projection = d3.geoMercator()
      .center([ 136.0, 35.6 ])
      .scale(100000)

var path = d3.geoPath(projection);

//d3.csv("日平均気温(2019).csv", function(data) {
   d3.json("https://takachiyo.github.io/InfoVis2022/Final/japan.geojson").then(function(json) {
      svg.append("g").selectAll("path")
          .data(json.features)
          .enter()
          .append("path")
          .attr("d", path)
  });
//});