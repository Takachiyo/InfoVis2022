var width3 = 400;
var height3 = 400;
var margin3 = {top:10, right:10, bottom:20, left:60};

var svg3 = d3.select('#drawing_region')
    .attr('width', width3)
    .attr('height', height3);

var chart3 = svg3.append('g')
    .attr('transform', `translate(${margin3.left}, ${margin3.top})`);

const inner_width3 = width3 - margin3.left - margin3.right;
const inner_height3 = height3 - margin3.top - margin3.bottom;

d3.csv("https://takachiyo.github.io/InfoVis2022/Final/日平均気温(2019).csv")
.then( data => {
   data.forEach( d => { d.temperature = +d.temperature; });
// Initialize axis scales
const xscale3 = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.temperature)])
      .range([0, inner_width3]);

const yscale3 = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, inner_height3])
      .paddingInner(0.1);

// Initialize axes
const xaxis3 = d3.axisBottom( xscale3 )
      .ticks(5)
      .tickSizeOuter(0);

const yaxis3 = d3.axisLeft( yscale3 )
      .tickSizeOuter(0);

// Draw the axis
const xaxis_group3 = chart3.append('g')
      .attr('transform', `translate(0, ${inner_height3})`)
      .call( xaxis3 );

const yaxis_group3 = chart3.append('g')
      .call( yaxis3 );

// Draw bars
chart3.selectAll("rect").data(data).enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", d => yscale3(d.label))
    .attr("width", d => xscale3(d.temperature))
    .attr("height", yscale3.bandwidth());

});