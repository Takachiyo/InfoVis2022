d3.csv("https://takachiyo.github.io/InfoVis2022/W04/data.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:30, right:30, bottom:80, left:60}
            //margin: {top:10, right:10, bottom:20, left:30}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:30, right:30, bottom:50, left:60}
            //margin: config.margin || {top:10, right:10, bottom:10, left:10}
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
            //.attr('transform', `translate(30, 10)`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
        self.axis_inner_width = self.inner_width + 10;
        self.axis_inner_height = self.inner_height + 30;

        self.xscale = d3.scaleLinear()
            //.range( [0, self.inner_width] );
            .range( [-30, self.inner_width] );

        self.yscale = d3.scaleLinear()
            //.range( [0, self.inner_height] );
            .range( [0, self.axis_inner_height] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(6);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(6);

        self.xaxis_group = self.chart.append('g')
            //.attr('transform', `translate(0, ${self.inner_height})`);
            .attr('transform', `translate(0, ${self.axis_inner_height })`);

        self.yaxis_group = self.chart.append('g')
            //.attr('transform', `translate(0, 0)`);
            .attr('transform', `translate(-30, 0)`);
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        //self.xscale.domain( [xmin, xmax] );
        self.xscale.domain( [0, xmax] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        //self.yscale.domain( [ymax, ymin] );
        self.yscale.domain( [ymax, 0] );

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r );

        self.xaxis_group
            .call( self.xaxis )
            .append("text")
            .attr("fill", "black")
			.attr("x", 0)
			.attr("y", self.axis_inner_height+10)
            .attr("text-anchor", "middle")
            .attr("font-size", "10pt")
            .attr("font-weight", "bold")
            .text("X Label");
            

        self.yaxis_group
            .call( self.yaxis )
            .append("text")
            .text("Y Label");
    }
}