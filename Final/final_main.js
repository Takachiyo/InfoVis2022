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
