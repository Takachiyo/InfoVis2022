//画面の幅と高さ
var w = 600;
var h = 600;
var scale = 1200; //地図のスケール
 
var projection = d3.geoMercator()
   .center([ 136.0, 35.6 ])
   .translate([w/2, h/2])
   .scale(scale);

var path = d3.geoPath().projection(projection);

var svg = d3.select("body")
         .append("svg")
         .attr("width", w)
         .attr("height", h);

d3.json("japan.json").then(function(json) {

    svg.selectAll("path")   //都道府県の領域データをpathで描画
       .data(json.features)
       .enter()
       .append("path")
       .attr("d", path)
       .style("stroke", "gray")
       .style("stroke-width", 0.25)
       .style("fill", "blue");
 });
