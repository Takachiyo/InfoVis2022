var width = 500;
var height = 500;

var svg = d3.select("body")
.append("svg")
.attr("width", width)
.attr("height", height);

var projection = d3.geoMercator()
      .center([131.00,32.26])
      .scale(100000)

var path = d3.geoPath(projection);

d3.csv("日平均気温(2019).csv", function(data) {
   d3.json("japan.geojson").then(function(json) {
      svg.append("g").selectAll("path")
          .data(json.features)
          .enter()
          .append("path")
          .attr("d", path)
          //.style("fill","red") //styleの記述を追加し単色で地図を塗りつぶす
  });
});