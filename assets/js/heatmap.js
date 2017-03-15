var url = "https://raw.githubusercontent.com/richardsa/json-project-files/master/global-temperature.json";

d3.json(url, function(data) {
var legendElementWidth = cellSize * 2;
var dataset = data.monthlyVariance;
var baseTemperature = data.baseTemperature;

// color scale modeled after heatmap example from http://bl.ocks.org/tjdecke/5558084
// colors picked using color picker tool from freecodecamp example
var colors = ["#5E4FA2", "#3288BD", "#66C2A5", "#ABDDA4", "#E6F598", "#FEE08B", "#FDAE61", "#eda52a", "#F46D43", "#D53E4F", "#9E0142"]; // alternatively colorbrewer.YlGnBu[9]

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var returnMonth = function(number) {
  var monthNumber = number - 1;
  return months[monthNumber];
};

var returnVariance = function(number) {
  var temp = baseTemperature + number;
  return temp.toFixed(3);
};
var minVariance = d3.min(dataset, function(d) {
  return d.variance;
});

var maxVariance = d3.max(dataset, function(d) {
  return d.variance;
});
var colorScale = d3.scale.quantile()
  .domain([minVariance, maxVariance])
  .range(colors);
var margin = {
    top: 20,
    right: 20,
    bottom: 70,
    left: 60
  },
  w = 1200 - margin.left - margin.right,
  h = 425;
var cellSize = 30;

var padding = 1;
var xAxisPadding = 50;
var yAxisPadding = 20;

var xScale = d3.scale.linear()
  .domain([1753, 2015])
  .range([0, w]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient('bottom')
  .ticks(10)
  .tickFormat(d3.format("d"));
// draw svg to canvas
var svg = d3.select("body")
  .append("svg")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// add data to canvas
svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")

.attr('x', function(d) {
    return xScale(d.year);
  })
  .attr("y", function(d) {
    return (d.month * 30);
  })
  .attr("width", cellSize)
  .attr("height", cellSize)
  .style("fill", function(d) {
    return colorScale(d.variance);
  })

.on("mouseover", function(d) {
    //Get this bar's x/y values, then augment for the tooltip
    // mouseover tooltip modeled from http://chimera.labs.oreilly.com/books/1230000000345/ch10.html#_html_div_tooltips
    var xPosition = parseFloat(d3.select(this).attr("x"))+ 80;
    var yPosition = parseFloat(d3.select(this).attr("y")) + 80;
    //Update the tooltip position and value
    d3.select("#tooltip")
      .style("left", xPosition + "px")
      .style("top", yPosition + "px")
      .select("#mouseoverData")
      .html(returnMonth(d.month) + " " + d.year + "<br />" + returnVariance(d.variance) + "&#8451;" + "<br />" + d.variance + "&#8451;");
      //Show the tooltip
    d3.select("#tooltip").classed("hidden", false);
  })
  .on("mouseout", function() {
    //Hide the tooltip
    d3.select("#tooltip").classed("hidden", true);
  });

svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + 390 + ")")
  .call(xAxis);

// title and x-axis label from http://jsfiddle.net/u63T9/
//Create Title
svg.append("text")
  .attr("x", w / 2)
  .attr("y", 0)
  .attr("class", "title")
  .style("text-anchor", "middle")
  .text("Monthly Global Land-Surface Temperature (1753 - 2015)");
// legend and monthlabels are variation of example from http://bl.ocks.org/tjdecke/5558084
var monthLabels = svg.selectAll(".monthLabel")
  .data(months)
  .enter().append("text")
  .text(function(d) {
    return d;
  })
  .attr("x", -5)
  .attr("y", function(d, i) {
    return (i * cellSize) + 45;
  })
  .style("text-anchor", "end");

var legend = svg.selectAll(".legend")
  .data(colors);

legend.enter().append("g")
  .attr("class", "legend");

legend.append("rect")
  .attr("x", function(d, i) {
    return 500 + (30 * i);
  })
  .attr("y", h)
  .attr("width", cellSize)
  .attr("height", cellSize)
  .style("fill", function(d, i) {
    return colors[i];
  });
//min variance legend
legend.append("text")
  .attr("class", "mono")
  .html(minVariance + "&#8451;")
  .attr("x", 440)
  .attr("y", (h + cellSize) - 10);
//max variance legend
legend.append("text")
  .attr("class", "mono")

  .html(maxVariance + "&#8451;")
  .attr("x", 840)
  .attr("y", (h + cellSize) - 10);

//temp variance legend
legend.append("text")
  .attr("class", "mono")
  .html("Temperature variance from baseline (" + baseTemperature +"&#8451;)")
  .attr("x", 530)
  .attr("y", (h + cellSize + 20));

legend.exit().remove();

});
