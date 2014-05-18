$(function(){

  var data = [8, 48, 14, 34, 2, 12, 25, 44, 50, 33, 48, 14, 34, 2, 12, 25, 44, 50, 33];

  var wWidth = window.innerWidth - 40;
  var wHeight = window.innerHeight - 40;

  var barWidth = (wWidth - data.length) / data.length;

  var heightScale = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, wHeight])

  svg = d3.select("body").append("svg").attr({
    width: wWidth,
    height: wHeight
  });

  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr({
      width: barWidth,
      height: heightScale,
      x: function(d, i) { return i * (barWidth + 1); },
      y: function(d, i) { return wHeight - heightScale(d)  },
      fill: "green"
    });
});
