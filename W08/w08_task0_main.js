var data = [
    {x:0, y:100},
    {x:40, y:5},
    {x:120, y:80},
    {x:150, y:30},
    {x:200, y:50}
];

var width = 256;
var height = 128;
var margin = {top:10, right:10, bottom:20, left:60};

var svg = d3.select('#drawing_region')
    .attr('width', width)
    .attr('height', height);

var chart = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

const inner_width = width - margin.left - margin.right;
const inner_height = height - margin.top - margin.bottom;

// Initialize axis scales
const xscale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x)])
      .range([0, inner_width]);

const yscale = d3.scaleLinear()
      .domain(data.map(d => d.y))
      .range([0, inner_height])

// Initialize axes
const xaxis = d3.axisBottom( xscale )
      .ticks(5)
      .tickSizeOuter(0);

const yaxis = d3.axisLeft( yscale )
      .tickSizeOuter(0);

// Draw the axis
const xaxis_group = chart.append('g')
      .attr('transform', `translate(0, ${inner_height})`)
      .call( xaxis );

const yaxis_group = chart.append('g')
      .call( yaxis );

const line = d3.line()
      .x( d => d.x )
      .y( d => d.y );

svg.append('path')
    .attr('d', line(data))
    .attr('stroke', 'black')
    .attr('fill', 'none');