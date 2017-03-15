//Width and height
var margin = {
    top: 60,
    right: 20,
    bottom: 80,
    left: 40
  },
  w = 800 - margin.left - margin.right,
  h = 600 - margin.top - margin.bottom;
var padding = 30;
d3.json("https://raw.githubusercontent.com/richardsa/json-project-files/master/cyclist-data.json", function(dataset) {
// functions to grab firsplace and lastplace numbers for possible unsorted data loads
var firstPlace = Math.min.apply(Math, dataset.map(function(o) {
  return o.Place;
}));
var lastPlace = Math.max.apply(Math, dataset.map(function(o) {
  return o.Place;
}));
// functions to grab first and last place times for possible unsorted data loads
var firstTime = Math.min.apply(Math, dataset.map(function(o) {
  return o.Seconds;
}));
var lastTime = Math.max.apply(Math, dataset.map(function(o) {
  return o.Seconds;
}));
// below function to convert seconds into minutes, from: http://stackoverflow.com/a/24544067
// modified to match freecodecamp axis
formatMinutes = function(d) {
  var time = d - firstTime;
  var hours = Math.floor(time / 3600),
    minutes = Math.floor((time - (hours * 3600)) / 60),
    seconds = time - (minutes * 60);
  var output = seconds + 's';
  if (minutes) {
    output = minutes + 'm ' + output;
  } else {
    output = "0m " + output;
  }
  if (hours) {
    output = hours + 'h ' + output;
  }
  return output;
};

//Create scale functions
var xScale = d3.scale.linear()
  .domain([lastTime + 10, firstTime])
  .range([padding, w - padding * 2]);

var yScale = d3.scale.linear()
  .domain([firstPlace, lastPlace])
  .rangeRound([0, h]);

//Define X axis
var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  .tickFormat(formatMinutes)
  .ticks(10);

//Define Y axis
var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(5);

//Create SVG element
var svg = d3.select("body")
  .append("svg")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

//Create circles
svg.selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", function(d) {
    return xScale(d.Seconds);
  })
  .attr("cy", function(d) {
    return yScale(d.Place);
  })
  .attr("r", 4)
  .attr("class", function(d) {
    if (d.Doping.length > 1) {
      return "caught";
    } else {
      return "notCaught";
    }

  })
  .on("mouseover", function(d) {
   // mouseover tooltip modeled from http://chimera.labs.oreilly.com/books/1230000000345/ch10.html#_html_div_tooltips
    //Update the tooltip position and value
    d3.select("#tooltip")
      .select("#mouseoverData")
      .html(d.Name + " : " + d.Nationality + "<br />" + d.Year + " : " + d.Time + "<br /> <br />" + d.Doping);
      //Show the tooltip
    d3.select("#tooltip").classed("hidden", false);
  })
  .on("mouseout", function() {

    //Hide the tooltip
    d3.select("#tooltip").classed("hidden", true);

  });

//Create labels
svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function(d) {
    return d.Name;
  })
  .attr("x", function(d) {
    var x = xScale(d.Seconds);
    return xScale(d.Seconds) + 4;
  })
  .attr("y", function(d) {
    return yScale(d.Place);
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "black");

//Create X axis
svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + h + ")")
  .call(xAxis);

//Create Y axis
svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);
// title and x-axis label from http://jsfiddle.net/u63T9/
//Create Title
svg.append("text")
  .attr("x", w / 2)
  .attr("y", -20)
  .attr("class", "title")
  .style("text-anchor", "middle")
  .text("Doping in professional Bicycle Racing");

//Create X axis label
svg.append("text")
  .attr("x", w / 2)
  .attr("y", h + 35)
  .style("text-anchor", "middle")
  .text("Minutes behind fastest time");

//Create extra info below x axis label
svg.append("text")
  .attr("x", w / 2)
  .attr("y", h + 70)
  .attr("class", "bottomTitle")
  .style("text-anchor", "middle")
  .text("35 Fasted Times up Alpe d'Huez (Normalized to 13.8km distance)");

// create y axis label
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (h / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Ranking");

//no doping legend text
svg.append("text")
  .attr("y", h / 2)
  .attr("x", w - 80)
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("No Doping Allegation");
//no doping legend circle
svg.append("circle")
  .attr("y", h / 2)
  .attr("x", w - 85)
  .attr("cx", w - 170)
  .attr("cy", (h / 2) + 10)
  .attr("r", 4)
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .attr("class", "noDopingLegend");

//doping legend text
svg.append("text")
  .attr("y", (h / 2) + 20)
  .attr("x", w - 90)
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Doping Allegation");

// doping legend circle
svg.append("circle")
  .attr("y", h / 2)
  .attr("x", w - 85)
  .attr("cx", w - 170)
  .attr("cy", (h / 2) + 30)
  .attr("r", 4)
  .attr("dy", "1em")
  .attr("class", "dopingLegend");
});
