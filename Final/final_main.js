var width = 500;
var height = 500;

var svg = d3.select("body")
.append("svg")
.attr("width", width)
.attr("height", height);

var projection = d3.geoMercator()
.center([136, 35.5])
  //.rotate([210, 0])
  //.parallels([50, 60])
  .translate([w/2, h/2])
  .scale([1500]);
var path = d3.geoPath(projection);

d3.csv("日平均気温(2019).csv", function(data) {
  d3.json("japan.json", function(json) {
    for(var i=0; i<data.length; i++) {
      for(var j=0; j<json.features.length; j++) {
        if( data[i].都道府県名 == json.features[j].properties.name_local ) {
          json.features[j].properties.日平均気温 = data[i].日平均気温;
        }
      }
    }

    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", function(feat) {
        var 日平均気温 = feat.properties.日平均気温;
        if( 日平均気温 > 4000 )
          var c = "darkred";
        else if( p日平均気温 > 3000 )
          var c = "orangered";
        else if( 日平均気温 > 2500 )
          var c = "orange";
        else if( 日平均気温 > 2250 )
          var c = "gold";
        else
          var c = "black";
        return c;
      })
      .style("stroke", "gray")
      .style("stroke-width", "0.5px");
  });
});