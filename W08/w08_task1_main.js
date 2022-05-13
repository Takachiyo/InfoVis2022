/*
d3.csv("https://takachiyo.github.io/InfoVis2022/W04/csv_pop_estimate_2045.csv", function(data){
    console.log(data)
});
*/

d3.csv("https://takachiyo.github.io/InfoVis2022/W04/csv_pop_estimate_2045.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 1500,
            height: 1500,
            margin: {top:10, right:10, bottom:20, left:60}
        };

        const barchart_plot = new BarChart( config, data );
        barchart_plot.update();
    })
    .catch( error => {
            console.log( error );
    });

    class BarChart {

        constructor( config, data ) {
            this.config = {
                parent: config.parent,
                width: config.width || 1500,
                height: config.height || 1500,
                margin: config.margin || {top:10, right:10, bottom:20, left:60}
            }
            this.data = data;
            this.init();
        }
    
        init() {
            let self = this;
    
            self.svg = d3.select( self.config.parent )
                .attr('width', self.config.width)
                .attr('height', self.config.height);
    
            self.chart = self.svg.append('g')
                .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);
    
            self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
            self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
    
            self.xscale = d3.scaleLinear()
            .range([0, self.inner_width]);
    
            self.yscale = d3.scaleLinear()
            .range([0, self.inner_height])
            .paddingInner(0.1);
    
            self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);
    
            self.yaxis = d3.axisLeft( self.yscale )
            .tickSizeOuter(0);
    
            self.xaxis_group = self.chart.append('g')
                .attr('transform', `translate(0, ${self.inner_height })`);
    
            self.yaxis_group = self.chart.append('g')
        }
    
        update() {
            let self = this;

            self.xscale.domain([0, d3.max(self.data, d => d.value)])

            self.yscale.domain(self.data.map(d => d.label))
    
            self.render();
        }
    
        render() {

            let self = this;

            self.chart.selectAll("rect")
            .data(self.data)
            .enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", d => yscale(d.label))
            .attr("width", d => xscale(d.value))
            .attr("height", yscale.bandwidth());

            self.xaxis_group
            .call( self.xaxis );
            
            self.yaxis_group
            .call( self.yaxis );

        }
    }
