

d3.csv("https://takachiyo.github.io/InfoVis2022/W10/data1.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });
        update( data );       
    
    })
    .catch( error => {
            console.log( error );
    });

    function update(data) {
        let padding = 10;
        let height = 20
        
        d3.select('#drawing_region').selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", padding)
        .attr("y", (d,i) => padding + i * ( height + padding ))
        .attr("width", d => d)
        .attr("height", height);
    }