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

   var colorScale = d3.scaleLinear()
               .domain([d3.min(data, function(d) { return parseInt(d.value);})
                  , d3.max(data, function(d) { return parseInt(d.value);})])
               .range([100, 50]);

   d3.json("https://takachiyo.github.io/InfoVis2022/Final/japan.geojson").then(function(json) {
      for (var i = 0; i < data.length; i++) {
         var dataPref = data[i].area;            //都道府県の名前を取得
         var dataPopulation = parseFloat(data[i].value);   //人口データを数値変換

         //GeoJSONのデータの中で同じ都道府県名を検索
         for (var j = 0; j < json.features.length; j++) {

            var jsonPref = json.features[j].properties.pref_j;

            if (dataPref == jsonPref) {

               //見つけたら、JSONデータに人口データをコピー
               json.features[j].properties.value = dataPopulation;

               //ループを抜ける
               break;
            }
         }
      }
   
   
   svg.selectAll("path")   //都道府県の領域データをpathで描画
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", "gray")
      .style("stroke-width", 0.25)
      .style("fill", function(d){
         return "hsl(0, 100%, " + (colorScale(d.properties.value)) + "%)";
         //return "hsl(0, " + (colorScale(d.properties.population)) + "%, 50%)";
         //return colorScale(d.properties.value);
       });
   });
});