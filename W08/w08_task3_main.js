d3.csv("https://takachiyo.github.io/InfoVis2022/W08/data3.csv")
.then( data => {
    data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 400,
            height: 400,
            margin: {top:60, right:10, bottom:50, left:10}
        };

        const piechart_plot = new PieChart( config, data );
        piechart_plot.update();
    })
    .catch( error => {
            console.log( error );
    });

    class PieChart {

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

            self.radius = Math.min( self.config.width, self.config.height ) / 2;

            self.color = d3.scaleOrdinal()
            .domain(self.data)
            .range(d3.schemeSet2);
    
            self.svg = d3.select( self.config.parent )
                .attr('width', self.config.width)
                .attr('height', self.config.height);

            self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
            self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
    
            self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);

        }
    
        update() {
            let self = this;

            self.pie = d3.pie()
            .value( d => d.value );
            
            self.arc = d3.arc()
            .innerRadius(0)
            .outerRadius(self.radius);

            self.text = d3.arc()
            .outerRadius(self.radius - 60)
            .innerRadius(self.radius - 60);
    
            self.render();
        }
    
        render() {

            let self = this;
/*
            self.svg.append("text")
            .attr("fill", "black")
			.attr("x", 100)
			.attr("y", 25)
            .attr("font-size", "20pt")
            .attr("font-weight", "bold")
            .text("2015年度 近畿地方の人口");
            */

            self.chart.selectAll('pie')
            .data( self.pie(self.data) )
            .enter()
            .append('path')
            .attr('d', self.arc)
            .attr('fill', function(d){ return(self.color(d.label)) })
            .attr('stroke', 'white')
            .style('stroke-width', '2px');

            /*
            self.chart.append("text")
            .attr("fill", "white")
            .attr("transform", function(d) { return "translate(" + self.text.centroid(d.value) + ")"; })
            //.attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("dy", "5px")
            .attr("font", "10px")
            .attr("text-anchor", "middle")
            .text(function(d) { return d.label; });
            //.text("2015年度 近畿地方の人口");
            */
            self.chart.selectAll('mySlices')
            .data(self.data)
            .enter()
            .append('text')
            .text(function(d){ return d.label})
            .attr("fill", "white")
            .attr("transform", function(d) { return "translate(" + self.arc.centroid(d) + ")";  })
            .style("text-anchor", "middle")
            .style("font-size", 17)

        }
    }