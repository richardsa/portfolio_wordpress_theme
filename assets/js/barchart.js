var url = "https://raw.githubusercontent.com/richardsa/json-project-files/master/GDP-data.json";

d3.json(url, function(data) {
  var dataset = data.data;
  // used this guide to get axis to display correctly http://bl.ocks.org/d3noob/8952219
  var margin = {
      top: 20,
      right: 20,
      bottom: 70,
      left: 40
    },
    w = 1000 - margin.left - margin.right,
    h = 400 - margin.top - margin.bottom;


  var padding = 1;
  var xAxisPadding = 50;
  var yAxisPadding = 20;

  // get dates
  var dates = dataset.map(function(d) {
    return new Date(d[0]);
  });
  // find min and max using http://stackoverflow.com/a/7143601
  var maxDate = new Date(Math.max.apply(null, dates));
  var minDate = new Date(Math.min.apply(null, dates));

  var xScale = d3.time.scale().domain([minDate, maxDate]).range([0, w]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .ticks(10);
  // separate scale to get correct formatting in yaxis
  var yScaleAxis = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) {
      return d[1];
    })])
    .range([h - padding, padding]);

  var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) {
      return d[1];
    })])
    .rangeRound([0, h]);

  var yAxis = d3.svg.axis()
    .scale(yScaleAxis)
    .orient("left")
    .ticks(5);

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
      return xScale(new Date(d[0]));
    })
    .attr("y", function(d) {
      return h - yScale(d[1]);
     })
    .attr("width", w / dataset.length - padding)
    .attr("height", function(d) {
      return yScale(d[1]);

    })
    .attr("fill", "blue")

  .on("mouseover", function(d) {
      //Get this bar's x/y values, then augment for the tooltip
      // mouseover tooltip modeled from http://chimera.labs.oreilly.com/books/1230000000345/ch10.html#_html_div_tooltips
      var xPosition = parseFloat(d3.select(this).attr("x"));
      var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;
      //Update the tooltip position and value
      d3.select("#tooltip")
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")
        .select("#mouseoverData")
        .html("$" + d[1] + " billion <br>" + d[0])
        .select("#date")
        .text(d[0]);

      //Show the tooltip
      d3.select("#tooltip").classed("hidden", false);
    })
    .on("mouseout", function() {

      //Hide the tooltip
      d3.select("#tooltip").classed("hidden", true);

    });

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis);

  // title and x-axis label from http://jsfiddle.net/u63T9/
  //Create Title
  svg.append("text")
    .attr("x", w / 2)
    .attr("y", 0)
    .attr("class", "title")
    .style("text-anchor", "middle")
    .text("Gross Domestic Product");

  //Create X axis label
  svg.append("text")
    .attr("x", w / 2)
    .attr("y", h + 50)
    .style("text-anchor", "middle")
    .text("Units: Billions of Dollars - Seasonal Adjustment: Seasonally Adjusted Annual Rate");

});
