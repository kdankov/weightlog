$(function(){

	//var data = [ 96.4, 96.6, 96.3, 96.1, 96.3, 95.8, 96.0, 95.7, 95.8, 95.5, 95.7, 95.2, 94.9, 95.0, 94.7, 94.3, 94.5, 94.0, 93.8, 93.7, 93.9, 93.4, 93.7, 93.4, 93.0, 93.2, 93.1, 92.8, 92.3, 91.8, 92.0, 92.2, 93.1, 92.1, 91.9, 91.8, 91.8, 92.2, 92.0, 91.2, 91.4, 91.6, 91.0, 91.1, 91.2, 91.9, 91.0, 90.6, 90.9, 90.6, 90.1, 90.4, 89.8, 90.0, 89.6, 89.4, 89.2, 89.0, 88.8, 88.5, 88.0, 87.4, 87.8, 87.7, 87.6, 87.7, 88.2, 87.4, 87.0, 87.4, 88.0, 87.6, 87.4, 88.0, 87.0, 87.5, 86.5, 86.9, 87.0, 86.1, 87.2, 86.2, 87.0, 86.7, 86.2, 86.8, 87.0, 86.2, 85.8, 85.7, 85.6, 85.2, 86.3, 85.5, 85.8, 85.4, 85.5, 84.6, 85.7, 85.9, 85.1, 85.1, 84.8, 85.2, 85.0, 87.1, 85.8, 84.4, 83.8, 84.2, 85.6, 84.0, 83.6, 83.0, 83.3, 83.2, 83.1, 83.2, 82.6, 82.8, 83.0, 84.2, 84.5, 84.0, 83.5, 83.0, 82.5, 82.0, 82.2, 81.7, 82.1, 81.8, 81.4, 81.0, 80.4, 81.2, 81.0, 80.6, 81.2, 82.0, 81.6, 81.3, 80.9, 81.2, 81.7, 81.4, 81.6, 81.2, 81.0, 80.8, 80.6, 80.2, 79.9, 80.6, 80.4, 81.0, 80.7, 80.9, 79.4, 79.6, 80.7, 81.0, 80.2, 80.4, 79.8, 79.4, 79.6, 79.0 ]

	var padding = {
		top: 20,
		right: 20,
		bottom: 20,
		left: 20
	};
   
	var margin = {
		top: 30,
		right: 40,
		bottom: 40,
		left: 50
	};

	var width = window.innerWidth - (padding.right + padding.left);
	var height = window.innerHeight - (padding.top + padding.bottom);

	var parseDate = d3.time.format("%Y-%m-%d").parse;

	var x = d3.time.scale().range([0, width - (margin.left + margin.right)]);
	var y = d3.scale.linear().range([height - (margin.top + margin.bottom), 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var line = d3.svg.line()
		.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.kilograms); });

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//var data = d3.csv("/data/weightlog.csv")
		//.row(function(d) { return {key: d.key, value: +d.value}; })
		//.get(function(error, rows) { console.log(rows); });

	d3.csv("data/weightlog.csv", function(data){

		data.forEach(function(d) {
			d.date = parseDate(d.date);
			d.kilograms = +d.kilograms;
		});

		x.domain(d3.extent(data, function(d) { return d.date; }));
		y.domain(d3.extent(data, function(d) { return d.kilograms; }));

		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + (height - (margin.bottom + margin.top)) + ")")
			.call(xAxis);

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("y", -18)
			.attr("dy", ".71em")
			.attr("transform", "translate(" + ((width/2) - 40) + ",0)")
			.style("text-anchor", "end")
			.text("Weight (kg)");
			

		var path = svg.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", line);

		var totalLength = path.node().getTotalLength();

		path
			.attr("stroke-dasharray", totalLength + " " + totalLength)
			.attr("stroke-dashoffset", totalLength)
			.transition()
				.duration(1000)
				.ease("linear")
				.attr("stroke-dashoffset", 0);

		svg.on("click", function(){
			path      
				.transition()
				.duration(1000)
				.ease("linear")
				.attr("stroke-dashoffset", totalLength);
		})
		
	});

});
