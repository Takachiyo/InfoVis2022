d3.csv("https://takachiyo.github.io/InfoVis2022/W08/data2.csv")
.then( data => {
    data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 500,
            height: 250,
            margin: {top:60, right:10, bottom:50, left:80}
        };

        const barchart_plot = new DrawingLine( config, data );
        barchart_plot.update();
    })
    .catch( error => {
            console.log( error );
    });

    class DrawingLine {

        constructor( config, data ) {
            this.config = {
                parent: config.parent,
                width: config.width || 500,
                height: config.height || 250,
                margin: config.margin || {top:50, right:10, bottom:20, left:60}
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
                .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`)
    
            self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
            self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
    
            self.xscale = d3.scaleLinear()
            .range([0, self.inner_width]);
    
            self.yscale = d3.scaleLinear()
            .range([0, self.inner_height]);
    
            self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);
    
            self.yaxis = d3.axisLeft( self.yscale )
            .tickSizeOuter(0);
    
            self.xaxis_group = self.chart.append('g')
                .attr('transform', `translate(0, ${self.inner_height})`);
    
            self.yaxis_group = self.chart.append('g')
            //.attr('transform', `translate(0, 30)`);
            
            self.line = d3.line()
            //.x(d => d.x )
            //.y(d => d.y );
            //.x(self.data, d => d.x )
            //.y(self.data, d => d.y );
            .x(self.xscale)
            .y(self.yscale);

        }
    
        update() {
            let self = this;

            self.xscale.domain([0, d3.max(self.data, d => d.x)])

            self.yscale.domain(self.data.map(d => d.y))
    
            self.render();
        }
    
        render() {

            let self = this;

            self.svg.append("text")
            .attr("fill", "black")
			.attr("x", 200)
			.attr("y", 25)
            .attr("font-size", "20pt")
            .attr("font-weight", "bold")
            .text("W08-Example2");

            self.xaxis_group
            .call( self.xaxis )
            .append("text")
            .attr("fill", "black")
			.attr("x", 410)
			.attr("y", 40)
            .attr("font-size", "10pt")
            .attr("font-weight", "bold")
            .text("x");
            
            self.yaxis_group
            .call( self.yaxis )
            .append("text")
            .attr("fill", "black")
			.attr("x", -150)
			.attr("y", -55)
            .attr("transform", "rotate(-90)")
            .attr("font-size", "10pt")
            .attr("font-weight", "bold")
            .text("y");

            self.svg.chart.append('path')
            //.datum(self.data)
            .attr('stroke', 'black')
            .attr('fill', 'none')
            .attr('d', self.line);

        }
    }